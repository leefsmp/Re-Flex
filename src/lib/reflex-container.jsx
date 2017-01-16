///////////////////////////////////////////////////////////
// ReflexContainer
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexSplitter from './reflex-splitter'
import ReflexElement from './reflex-element'
import ReflexEvents from './reflex-events'
import ReactDOM from 'react-dom'
import React from 'react'

class ReflexContainer
  extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    orientation: React.PropTypes.string,
    className: React.PropTypes.string
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
    orientation: 'horizontal',
    className: ''
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)

    this.state = {
      flexData: this.getInitialFlexData()
    }

    this.events = new ReflexEvents()

    this.onSplitterStartResize =
      this.onSplitterStartResize.bind(this)

    this.onSplitterStopResize =
      this.onSplitterStopResize.bind(this)

    this.onSplitterResize =
      this.onSplitterResize.bind(this)

    this.onElementSize =
      this.onElementSize.bind(this)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount () {

    this.events.on(
      'splitter.startResize',
      this.onSplitterStartResize)

    this.events.on(
      'splitter.stopResize',
      this.onSplitterStopResize)

    this.events.on(
      'splitter.resize',
      this.onSplitterResize)

    this.events.on(
      'element.size',
      this.onElementSize)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillUnmount () {

    this.events.off()
  }

  /////////////////////////////////////////////////////////
  // Returns size of a ReflexElement
  //
  /////////////////////////////////////////////////////////
  getSize (element) {

    const ref = this.refs[element.ref]

    const domElement = ReactDOM.findDOMNode(ref)

    switch (this.props.orientation) {

      case 'horizontal':
        return domElement.offsetHeight

      case 'vertical':
        return domElement.offsetWidth

      default:
        return 0
    }
  }

  /////////////////////////////////////////////////////////
  // Computes offset from pointer position
  //
  /////////////////////////////////////////////////////////
  getOffset (event) {

    const pos = event.changedTouches ?
      event.changedTouches[0] :
      event

    switch (this.props.orientation) {

      case 'horizontal':
        return pos.pageY - this.previousPos

      case 'vertical':
        return pos.pageX - this.previousPos
    }
  }

  /////////////////////////////////////////////////////////
  // Handles splitter startResize event
  //
  /////////////////////////////////////////////////////////
  onSplitterStartResize (data) {

    const pos = data.event.changedTouches ?
      data.event.changedTouches[0] :
      data.event

    switch (this.props.orientation) {

      case 'horizontal':
        document.body.style.cursor = 'row-resize'
        this.previousPos = pos.pageY
        break

      case 'vertical':
        document.body.style.cursor = 'col-resize'
        this.previousPos = pos.pageX
        break
    }

    const idx = data.splitter.props.index

    this.elements = [
      this.children[idx - 1],
      this.children[idx + 1]
    ]

    this.emitElementsEvent(
      this.elements, 'onStartResize')

    this.emitEvent('onStartResize')
  }

  /////////////////////////////////////////////////////////
  // Handles splitter resize event
  //
  /////////////////////////////////////////////////////////
  onSplitterResize (data) {

    const idx = data.splitter.props.index

    const offset = this.getOffset(data.event)

    const availableOffset =
      this.computeAvailableOffset(
        idx, offset)

    if (availableOffset) {

      const pos = data.event.changedTouches ?
        data.event.changedTouches[0] :
        data.event

      switch (this.props.orientation) {

        case 'horizontal':
          this.previousPos = pos.pageY
          break

        case 'vertical':
          this.previousPos = pos.pageX
          break
      }

      this.elements = this.dispatchOffset(
        idx, availableOffset)

      this.adjustFlex(this.elements)

      this.setState(this.state, () => {

        this.emitElementsEvent(
          this.elements, 'onResize')

        this.emitEvent('onResize')

        //this.elements.forEach((element)=>{
        //
        //  const ref = this.refs[element.ref]
        //
        //  ref.forceUpdate()
        //})
      })
    }
  }

  /////////////////////////////////////////////////////////
  // Handles splitter stopResize event
  //
  /////////////////////////////////////////////////////////
  onSplitterStopResize (data) {

    document.body.style.cursor = 'auto'

    this.emitElementsEvent(
      this.children, 'onStopResize')

    this.emitEvent('onStopResize')
  }

  /////////////////////////////////////////////////////////
  // Handles element size modified event
  //
  /////////////////////////////////////////////////////////
  onElementSize (data) {

    return new Promise((resolve) => {

      const idx = data.element.props.index

      const size = this.getSize(this.children[idx])

      const offset = data.size - size

      const dir = data.direction

      const splitterIdx = idx + dir

      const availableOffset =
        this.computeAvailableOffset(
          splitterIdx, dir * offset)

      this.elements = null

      if (availableOffset) {

        this.elements = this.dispatchOffset(
          splitterIdx, availableOffset)

        this.adjustFlex(this.elements)
      }

      this.setState(this.state, () => {

        this.emitElementsEvent(
          this.elements, 'onResize')

        this.emitEvent('onResize')

        resolve()
      })
    })
  }

  /////////////////////////////////////////////////////////
  // Adjusts flex after a dispatch to make sure
  // total flex of modified elements remains the same
  //
  /////////////////////////////////////////////////////////
  adjustFlex (elements) {

    const diffFlex = elements.reduce((sum, element) => {

        const idx = element.props.index

        const previousFlex = element.props.flex

        const nextFlex = this.state.flexData[idx].flex

        return sum +
          (previousFlex - nextFlex) / elements.length

      }, 0)

    elements.forEach((element) => {
      this.state.flexData[element.props.index].flex
        += diffFlex
    })
  }

  /////////////////////////////////////////////////////////
  // Returns available offset for a given raw offset value
  // This checks how much the panes can be stretched and
  // shrink, then returns the min
  //
  /////////////////////////////////////////////////////////
  computeAvailableOffset (idx, offset) {

    const stretch = this.computeAvailableStretch(
      idx, offset)

    const shrink = this.computeAvailableShrink(
      idx, offset)

    const availableOffset =
      Math.min(stretch, shrink) *
      Math.sign(offset)

    return availableOffset
  }

  /////////////////////////////////////////////////////////
  // Returns true if the next splitter than the one at idx
  // can propagate the drag. This can happen if that
  // next element is actually a splitter and it has
  // propagate=true property set
  //
  /////////////////////////////////////////////////////////
  checkPropagate (idx, direction) {

    if (direction > 0) {

      if (idx < this.children.length - 2) {

        const child = this.children[idx + 2]

        const typeCheck = (child.type === ReflexSplitter)

        return typeCheck && child.props.propagate
      }

    } else {

      if (idx > 2) {

        const child = this.children[idx - 2]

        const typeCheck = (child.type === ReflexSplitter)

        return typeCheck && child.props.propagate
      }
    }

    return false
  }

  /////////////////////////////////////////////////////////
  // Recursively computes available stretch at splitter
  // idx for given raw offset
  //
  /////////////////////////////////////////////////////////
  computeAvailableStretch (idx, offset) {

    const childIdx = offset < 0 ? idx + 1 : idx - 1

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const maxSize = child.props.maxSize

    const availableStretch = maxSize - size

    if (availableStretch < Math.abs(offset)) {

      if (this.checkPropagate(idx, -1 * offset)) {

        const nextOffset = Math.sign(offset) *
          (Math.abs(offset) - availableStretch)

        return availableStretch +
          this.computeAvailableStretch(
            offset < 0 ? idx + 2 : idx - 2,
            nextOffset)
      }
    }

    return Math.min(availableStretch, Math.abs(offset))
  }

  /////////////////////////////////////////////////////////
  // Recursively computes available shrink at splitter
  // idx for given raw offset
  //
  /////////////////////////////////////////////////////////
  computeAvailableShrink (idx, offset) {

    const childIdx = offset > 0 ? idx + 1 : idx -1

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const minSize = child.props.minSize

    const availableShrink = size - minSize

    if (availableShrink < Math.abs(offset)) {

      if (this.checkPropagate(idx, offset)) {

        const nextOffset = Math.sign(offset) *
          (Math.abs(offset) - availableShrink)

        return availableShrink +
          this.computeAvailableShrink(
            offset > 0 ? idx + 2 : idx - 2,
            nextOffset)
      }
    }

    return Math.min(availableShrink, Math.abs(offset))
  }

  /////////////////////////////////////////////////////////
  // Currently not used, causes a wacky behavior ...
  //
  /////////////////////////////////////////////////////////
  computePixelFlex () {

    const domElement = ReactDOM.findDOMNode(this)

    const parent = domElement.parentNode

    switch (this.props.orientation) {

      case 'horizontal':

        return 1.0 / parent.offsetHeight

      case 'vertical':

        return 1.0 / parent.offsetWidth

      default :

        return 0
    }
  }

  /////////////////////////////////////////////////////////
  // Adds offset to a given ReflexElement
  //
  /////////////////////////////////////////////////////////
  addOffset (element, offset) {

    const size = this.getSize(element)

    if (size) {

      const idx = element.props.index

      const newSize = size + offset

      this.state.flexData[idx].flex *= newSize / size
    }
  }

  /////////////////////////////////////////////////////////
  // Recursively dispatches stretch offset across
  // children elements starting at splitter idx
  //
  /////////////////////////////////////////////////////////
  dispatchStretch (idx, offset) {

    const childIdx = offset < 0 ? idx + 1 : idx - 1

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const newSize = Math.min(
      child.props.maxSize,
      size + Math.abs(offset))

    const dispatchedStretch = newSize - size

    this.addOffset(child, dispatchedStretch)

    if (dispatchedStretch < Math.abs(offset)) {

      const nextIdx = idx - Math.sign(offset) * 2

      const nextOffset = Math.sign(offset) *
        (Math.abs(offset) - dispatchedStretch)

      return [
        child,
        ...this.dispatchStretch(nextIdx, nextOffset)
      ]
    }

    return [child]
  }

  /////////////////////////////////////////////////////////
  // Recursively dispatches shrink offset across
  // children elements starting at splitter idx
  //
  /////////////////////////////////////////////////////////
  dispatchShrink (idx, offset) {

    const childIdx = offset > 0 ? idx + 1 : idx - 1

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const newSize = Math.max(
      child.props.minSize,
      size - Math.abs(offset))

    const dispatchedShrink = newSize - size

    this.addOffset(child, dispatchedShrink)

    if (Math.abs(dispatchedShrink) < Math.abs(offset)) {

      const nextIdx = idx + Math.sign(offset) * 2

      const nextOffset = Math.sign(offset) *
        (Math.abs(offset) + dispatchedShrink)

      return [
        child,
        ...this.dispatchShrink(nextIdx, nextOffset)
      ]
    }

    return [child]
  }

  /////////////////////////////////////////////////////////
  // Dispatch offset at splitter idx
  //
  /////////////////////////////////////////////////////////
  dispatchOffset (idx, offset) {

    return [
      ...this.dispatchStretch(idx, offset),
      ...this.dispatchShrink(idx, offset)
    ]
  }

  /////////////////////////////////////////////////////////
  // Emits given if event if present in the component props
  //
  /////////////////////////////////////////////////////////
  emitEvent (event) {

    if (this.props[event]) {

      this.props[event]({
        domElement: ReactDOM.findDOMNode(this),
        component: this
      })
    }
  }

  /////////////////////////////////////////////////////////
  // Emits given if event for each given element
  // if present in the component props
  //
  /////////////////////////////////////////////////////////
  emitElementsEvent (elements, event) {

    this.toArray(elements).forEach((element) => {

      if (element.props[event]) {

        const ref = this.refs[element.ref]

        element.props[event]({
          domElement: ReactDOM.findDOMNode(ref),
          component: element
        })
      }
    })
  }

  /////////////////////////////////////////////////////////
  // Computes initial flex data based on provided flex
  // properties. By default each ReflexElement gets
  // evenly arranged within its container
  //
  /////////////////////////////////////////////////////////
  getInitialFlexData () {

    let nbElements = 0

    if (!this.props.children) {

      return []
    }

    const children = this.toArray(this.props.children)

    const flexValues = children.map((child) => {

      if (child.type !== ReflexSplitter &&
         !child.props.flex) {

        ++nbElements
      }

      return child.props ? (child.props.flex || 0) : 0
    })

    let remainingFlex = 1

    flexValues.forEach((flex) => {

      remainingFlex -= flex
    })

    return children.map((child, idx) => {

      if (child.type !== ReflexSplitter) {

        return {
          guid: child.props.ref || this.guid(),
          flex: flexValues[idx] ||
            remainingFlex / nbElements
        }
      }

      return { flex : 0 }
    })
  }

  /////////////////////////////////////////////////////////
  // Utility method that generates a new unique GUID
  //
  /////////////////////////////////////////////////////////
  guid (format = 'xxxxxxxxxxxx') {

    let d = new Date().getTime()

    return format.replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
      })
  }

  /////////////////////////////////////////////////////////
  // Utility method to ensure given argument is
  // returned as an array
  //
  /////////////////////////////////////////////////////////
  toArray (obj) {

    return obj ? (Array.isArray(obj) ? obj : [obj]) : []
  }

  /////////////////////////////////////////////////////////
  // Render container. This will clone all original child
  // components in order to pass some internal properties
  // used to handle resizing logic
  //
  /////////////////////////////////////////////////////////
  render () {

    const classNames = [
      'reflex-layout',
      'reflex-container',
      this.props.orientation,
      ...this.props.className.split(' '),
    ]

    this.children = React.Children.map(
      this.props.children, (child, idx) => {

        const flexData = this.state.flexData[idx]

        const newProps = Object.assign({}, child.props, {
          maxSize: child.props.maxSize || Number.MAX_VALUE,
          orientation: this.props.orientation,
          minSize: child.props.minSize || 1,
          events: this.events,
          flex: flexData.flex,
          ref: flexData.guid,
          index: idx
        })

        return React.cloneElement(child, newProps)
      })

    return (
      <div className={classNames.join(' ')}>
        { this.children }
      </div>
    )
  }
}

export default ReflexContainer
