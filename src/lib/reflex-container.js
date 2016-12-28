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

export default class ReflexContainer
  extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    updateOnWindowResize: React.PropTypes.bool,
    orientation: React.PropTypes.string,
    className: React.PropTypes.string
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
    updateOnWindowResize: false,
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
      flexData: this.getInitialFlexData(),
      id: this.guid()
    }

    this.onResize = this.onResize.bind(this)

    this.onSplitterStartResize =
      this.onSplitterStartResize.bind(this)

    this.onSplitterStopResize =
      this.onSplitterStopResize.bind(this)

    this.onSplitterResize =
      this.onSplitterResize.bind(this)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount () {

    window.addEventListener(
      'resize', this.onResize)

    ReflexEvents.on('splitter.startResize',
      this.onSplitterStartResize)

    ReflexEvents.on('splitter.stopResize',
      this.onSplitterStopResize)

    ReflexEvents.on('splitter.resize',
      this.onSplitterResize)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillUnmount () {

    window.removeEventListener(
      'resize', this.onResize)

    ReflexEvents.off(
      'splitter.startResize',
      this.onSplitterStartResize)

    ReflexEvents.off(
      'splitter.stopResize',
      this.onSplitterStopResize)

    ReflexEvents.off(
      'splitter.resize',
      this.onSplitterResize)
  }

  /////////////////////////////////////////////////////////
  //
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
  //
  //
  /////////////////////////////////////////////////////////
  onResize () {

    if (this.props.updateOnWindowResize) {
      this.forceUpdate()
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onSplitterStartResize (data) {

    const containerId = data.splitter.props.containerId

    if (containerId === this.state.id) {

      switch (this.props.orientation) {

        case 'horizontal':
          document.body.style.cursor = 'row-resize'
          this.previousPos = data.event.pageY
          break

        case 'vertical':
          document.body.style.cursor = 'col-resize'
          this.previousPos = data.event.pageX
          break
      }

      const idx = data.splitter.props.index

      const elements = [
        this.children[idx - 1],
        this.children[idx + 1]
      ]

      this.fireEvent(elements, 'onStartResize')
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onSplitterStopResize (data) {

    const containerId = data.splitter.props.containerId

    if (containerId === this.state.id) {

      document.body.style.cursor = 'auto'

      const idx = data.splitter.props.index

      const elements = [
        this.children[idx - 1],
        this.children[idx + 1]
      ]

      this.fireEvent(elements, 'onStopResize')
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  getOffset (event) {

    switch (this.props.orientation) {

      case 'horizontal':
        return event.pageY - this.previousPos

      case 'vertical':
        return event.pageX - this.previousPos
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onSplitterResize (data) {

    const containerId = data.splitter.props.containerId

    if (containerId === this.state.id) {

      const idx = data.splitter.props.index

      const offset = this.getOffset(data.event)

      const availableOffset =
        this.computeAvailableOffset(
          idx, offset)

      if (availableOffset !== 0) {

        switch (this.props.orientation) {

          case 'horizontal':
            this.previousPos = data.event.pageY
            break

          case 'vertical':
            this.previousPos = data.event.pageX
            break
        }

        const elements = this.dispatchOffset(
          idx, availableOffset)

        this.setState(this.state)

        this.fireEvent(elements, 'onResize')
      }
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  computeAvailableOffset (idx, offset) {

    const stretch = this.computeAvailableStretch(
      idx, offset)

    const shrink = this.computeAvailableShrink(
      idx, offset)

    console.log('stretch: ' + stretch)
    console.log('shrink: ' + shrink)
    console.log('offset: ' + offset)

    const availableOffset =
      Math.min(stretch, shrink) *
      Math.sign(offset)

    return availableOffset
  }

  /////////////////////////////////////////////////////////
  //
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
  //
  //
  /////////////////////////////////////////////////////////
  computeAvailableStretch (idx, offset) {

    const childIdx = offset < 0 ? idx + 1 : idx - 1

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const maxSize = child.props.maxSize ||
      (size + Math.abs(offset))

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
  //
  //
  /////////////////////////////////////////////////////////
  computeAvailableShrink (idx, offset) {

    const childIdx = offset > 0 ? idx + 1 : idx -1

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const minSize = child.props.minSize || 1

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
  //
  //
  /////////////////////////////////////////////////////////
  addOffsetAt (idx, offset) {

    const child = this.children[idx]

    const size = this.getSize(child)

    const newSize = size + offset

    const newFlex = this.computeNewFlex (
      child.props.flex,
      size, newSize)

    this.state.flexData[idx].flex = newFlex

    return child
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  dispatchStretch (idx, offset) {

    const childIdx = offset < 0 ? idx + 1 : idx - 1

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const maxSize = child.props.maxSize ||
      (size + Math.abs(offset))

    const availableStretch = maxSize - size
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  dispatchShrink (idx, offset) {


  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  dispatchOffset (idx, offset) {

    return [
      ...this.dispatchStretch(idx, offset),
      ...this.dispatchShrink(idx, offset)
    ]

    //return [
    //  this.addOffsetAt(idx - 1, offset),
    //  this.addOffsetAt(idx + 1, -1 * offset)
    //]
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  fireEvent (elements, event) {

    const elementsArray = Array.isArray(elements) ?
      elements : [elements]

    elementsArray.forEach((element) => {

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
  //
  //
  /////////////////////////////////////////////////////////
  computeNewFlex (flex, size, newSize) {

    if (size === 0) {

      return 0
    }

    return newSize * flex / size
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  getInitialFlexData () {

    let nbElements = 0

    if (!this.props.children) {

      return []
    }

    const children = Array.isArray(this.props.children) ?
      this.props.children :
      [this.props.children]

    const flexValues = children.map((child) => {

      if (child.type === ReflexElement) {

        if (!child.props.flex) {

          ++nbElements
        }
      }

      return child.props ? (child.props.flex || 0) : 0
    })

    let remainingFlex = 1

    flexValues.forEach((flex) => {

      remainingFlex -= flex
    })

    return children.map((child, idx) => {

      if (child.type === ReflexElement) {

        return {
          guid: this.guid(),
          flex: flexValues[idx] ||
            remainingFlex / nbElements
        }
      }

      return { flex : 0}
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const classNames = [
      ...this.props.className.split(' '),
      'reflex-layout',
      'reflex-container',
      this.props.orientation
    ]

    this.children = React.Children.map(
      this.props.children, (child, idx) => {

        const flexData = this.state.flexData[idx]

        const newProps = Object.assign({}, child.props, {
          containerId: this.state.id,
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

  /////////////////////////////////////////////////////////
  //
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
}
