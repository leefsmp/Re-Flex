///////////////////////////////////////////////////////////
// ReflexContainer
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexSplitter from './ReflexSplitter'
import ReflexElement from './ReflexElement'
import ReflexEvents from './ReflexEvents'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import React from 'react'

class ReflexContainer extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)

    this.state = {
      flexData: []
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

    this.children = []
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  setPartialState (partialState) {

    return new Promise((resolve) => {

      this.setState(Object.assign({}, this.state,
        partialState), () => {
        resolve()
      })
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount () {

    const flexData = this.computeFlexData()

    this.setPartialState ({
      flexData
    })

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
  //
  //
  /////////////////////////////////////////////////////////
  getValidChildren (props = this.props) {

    return this.toArray(props.children).filter((child) => {

      return !!child
    })
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  componentWillReceiveProps (props) {

    const children = this.getValidChildren (props)

    if (children.length !== this.state.flexData.length ||
      this.flexHasChanged(props)) {

      const flexData = this.computeFlexData(children)

      this.setPartialState({
        flexData
      })
    }
  }

  /////////////////////////////////////////////////////////
  // Check if flex has changed: this allows updating the
  // component when different flex is passed as property
  // to one or several children
  //
  /////////////////////////////////////////////////////////
  flexHasChanged (props) {

    const nextChildrenFlex =
      this.getValidChildren(props).map((child) => {

        return child.props.flex || 0
      })

    const childrenFlex =
      this.getValidChildren().map((child) => {

        return child.props.flex || 0
      })

    return !childrenFlex.every((flex, idx) => {

      return flex === nextChildrenFlex[idx]
    })
  }

  /////////////////////////////////////////////////////////
  // Returns size of a ReflexElement
  //
  /////////////////////////////////////////////////////////
  getSize (element) {

    const ref = element.ref
      ? this.refs[element.ref]
      : element

    const domElement = ReactDOM.findDOMNode(ref)

    switch (this.props.orientation) {

      case 'horizontal':
        return domElement.offsetHeight

      case 'vertical':
      default:
        return domElement.offsetWidth
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
      default:
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
      default:
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
        default:
          this.previousPos = pos.pageX
          break
      }

      this.elements = this.dispatchOffset(
        idx, availableOffset)

      this.adjustFlex(this.elements)

      this.setPartialState(this.state).then(() => {

        this.emitElementsEvent(
          this.elements, 'onResize')
      })
    }
  }

  /////////////////////////////////////////////////////////
  // Determines if element is a splitter
  // or wraps a splitter
  //
  /////////////////////////////////////////////////////////
  isSplitterElement (element) {

    return element.type === ReflexSplitter
  }

  /////////////////////////////////////////////////////////
  // Handles splitter stopResize event
  //
  /////////////////////////////////////////////////////////
  onSplitterStopResize (data) {

    document.body.style.cursor = 'auto'

    const resizedRefs = this.elements.map((element) => {

      return element.ref
    })

    const elements = this.children.filter((child) => {

      return !this.isSplitterElement(child) &&
        resizedRefs.includes(child.ref)
    })

    this.emitElementsEvent(elements, 'onStopResize')
  }

  /////////////////////////////////////////////////////////
  // Handles element size modified event
  //
  /////////////////////////////////////////////////////////
  onElementSize (data) {

    return new Promise((resolve) => {

      try {

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

        this.setPartialState(this.state).then(() => {

          this.emitElementsEvent(
            this.elements, 'onResize')

          resolve()
        })

      } catch (ex) {

        // TODO handle exception ...
      }
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

        const typeCheck = this.isSplitterElement(child)

        return typeCheck && child.props.propagate
      }

    } else {

      if (idx > 2) {

        const child = this.children[idx - 2]

        const typeCheck = this.isSplitterElement(child)

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

    const minSize = Math.max(
      child.props.minSize, 0)

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
  // Returns flex value for unit pixel
  //
  /////////////////////////////////////////////////////////
  computePixelFlex () {

    const domElement = ReactDOM.findDOMNode(this)

    switch (this.props.orientation) {

      case 'horizontal':

        if (domElement.offsetHeight === 0.0) {
          console.warn(
            'Found ReflexContainer with height=0, ' +
            'this will cause invalid behavior...')
          console.warn(domElement)
          return 0.0
        }

        return 1.0 / domElement.offsetHeight

      case 'vertical':
      default:

        if (domElement.offsetWidth === 0.0) {
          console.warn(
            'Found ReflexContainer with width=0, ' +
            'this will cause invalid behavior...')
          console.warn(domElement)
          return 0.0
        }

        return 1.0 / domElement.offsetWidth
    }
  }

  /////////////////////////////////////////////////////////
  // Adds offset to a given ReflexElement
  //
  /////////////////////////////////////////////////////////
  addOffset (element, offset) {

    const size = this.getSize(element)

    const idx = element.props.index

    const newSize = Math.max(size + offset, 0)

    const currentFlex = this.state.flexData[idx].flex

    const newFlex = (currentFlex > 0)
        ? currentFlex * newSize / size
        : this.computePixelFlex () * newSize

    this.state.flexData[idx].flex =
      (!isFinite(newFlex) || isNaN(newFlex))
        ? 0 : newFlex
  }

  /////////////////////////////////////////////////////////
  // Recursively dispatches stretch offset across
  // children elements starting at splitter idx
  //
  /////////////////////////////////////////////////////////
  dispatchStretch (idx, offset) {

    const childIdx = offset < 0 ? idx + 1 : idx - 1

    if (childIdx < 0 || childIdx > this.children.length-1) {

      return []
    }

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

    if (childIdx < 0 || childIdx > this.children.length-1) {

      return []
    }

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
  computeFlexData (children = this.getValidChildren()) {

    const pixelFlex = this.computePixelFlex()

    const computeFreeFlex = (flexData) => {
      return flexData.reduce((sum, entry) => {
        if (!this.isSplitterElement(entry)
          && entry.constrained) {
          return sum - entry.flex
        }
        return sum
      }, 1)
    }

    const computeFreeElements = (flexData) => {
      return flexData.reduce((sum, entry) => {
        if (!this.isSplitterElement(entry)
          && !entry.constrained) {
          return sum + 1
        }
        return sum
      }, 0)
    }

    const flexDataInit = children.map((child) => {

      const props = child.props

      return {
        maxFlex: (props.maxSize || Number.MAX_VALUE) * pixelFlex,
        sizeFlex: (props.size || Number.MAX_VALUE) * pixelFlex,
        minFlex: (props.minSize || 1) * pixelFlex,
        constrained: props.flex !== undefined,
        guid: props.ref || this.guid(),
        flex: props.flex || 0,
        type: child.type
      }
    })

    const computeFlexDataRec = (flexDataIn) => {

      let hasContrain = false

      const freeElements = computeFreeElements(flexDataIn)

      const freeFlex = computeFreeFlex(flexDataIn)

      const flexDataOut = flexDataIn.map((entry) => {

        if (this.isSplitterElement(entry)) {
          return entry
        }

        const proposedFlex = !entry.constrained
          ? freeFlex / freeElements
          : entry.flex

        const constrainedFlex =
          Math.min(entry.sizeFlex,
            Math.min(entry.maxFlex,
              Math.max(entry.minFlex,
                proposedFlex)))

        const constrained =
          (constrainedFlex !== proposedFlex)

        hasContrain = hasContrain || constrained

        return Object.assign({}, entry, {
          flex: constrainedFlex,
          constrained
        })
      })

      return hasContrain
        ? computeFlexDataRec(flexDataOut)
        : flexDataOut
    }

    const flexData = computeFlexDataRec(flexDataInit)

    return flexData.map((entry) => {

      return {
          flex: !this.isSplitterElement(entry)
            ? entry.flex : 0.0,
          guid: entry.guid
       }
    })
  }

  /////////////////////////////////////////////////////////
  // Utility method that generates a new unique GUID
  //
  /////////////////////////////////////////////////////////
  guid (format = 'xxxx-xxxx') {

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
      this.getValidChildren(), (child, idx) => {

        if (idx > this.state.flexData.length - 1) {
          return <div/>
        }

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
      <div className={classNames.join(' ')}
        style={this.props.style}>
        { this.children }
      </div>
    )
  }
}

/////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////
ReflexContainer.propTypes = {
  orientation: PropTypes.oneOf([
    'horizontal', 'vertical'
  ]),
  className: PropTypes.string,
  style: PropTypes.object
}

/////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////
ReflexContainer.defaultProps = {
  orientation: 'horizontal',
  className: '',
  style: {}
}

export default ReflexContainer



