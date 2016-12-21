import ReflexElement from './reflex-element'
import ReflexEvents from './reflex-events'
import ReactDOM from 'react-dom'
import React from 'react'

export default class ReflexContainer extends React.Component {

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

    ReflexEvents.removeListener(
      'splitter.startResize',
      this.onSplitterStartResize)

    ReflexEvents.removeListener(
      'splitter.stopResize',
      this.onSplitterStopResize)

    ReflexEvents.removeListener(
      'splitter.resize',
      this.onSplitterResize)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  getSizeAt (idx) {

    const ref = this.refs[ this.state.flexData[ idx ].guid ]

    const domElement = ReactDOM.findDOMNode(ref)

    return {
      x: domElement.offsetWidth,
      y: domElement.offsetHeight
    }
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  onResize () {

    this.forceUpdate()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onSplitterStartResize (data) {

    if (data.splitter.props.containerId === this.state.id) {

      this.previousPos = {
        x: data.event.pageX,
        y: data.event.pageY
      }

      switch (this.props.orientation) {

        case 'horizontal':

          document.body.style.cursor = 'row-resize'
          break

        case 'vertical':

          document.body.style.cursor = 'col-resize'
          break
      }
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onSplitterStopResize (data) {

    if (data.splitter.props.containerId === this.state.id) {

      document.body.style.cursor = 'auto'
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onSplitterResize (data) {

    if (data.splitter.props.containerId === this.state.id) {

      const idx = data.splitter.props.index

      const size1 = this.getSizeAt(idx - 1)

      const offset = {
        x: data.event.pageX - this.previousPos.x,
        y: data.event.pageY - this.previousPos.y
      }

      this.previousPos = {
        x: data.event.pageX,
        y: data.event.pageY
      }

      const newSize1 = {
        x: Math.max(size1.x + offset.x, 1),
        y: Math.max(size1.y + offset.y, 1)
      }

      const size2 = this.getSizeAt(idx - 1)

      const newSize2 = {
        x: Math.max(size2.x - offset.x, 1),
        y: Math.max(size2.y - offset.y, 1)
      }

      if (this.validateSizeAt(idx - 1, newSize1) &&
          this.validateSizeAt(idx + 1, newSize2)) {

        const flex = this.state.flexData[ idx - 1 ].flex

        const newFlex = this.computeNewFlex(
          this.state.flexData[ idx - 1 ].flex,
          size1, newSize1)

        this.state.flexData[ idx - 1 ] = Object.assign({},
          this.state.flexData[ idx - 1 ], {
            flex: newFlex
          })

        this.state.flexData[ idx + 1 ] = Object.assign({},
          this.state.flexData[ idx + 1 ], {
            flex: this.state.flexData[ idx + 1 ].flex -
            (newFlex - flex)
          })

        this.setState(Object.assign({}, this.state, {
          flexData: this.state.flexData
        }))
      }
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  computeNewFlex (flex, size, newSize) {

    switch (this.props.orientation) {

      case 'horizontal':

        return newSize.y * flex / size.y

      case 'vertical':

        if (size.x === 0) {

          return 0
        }

        return newSize.x * flex / size.x

      default:

        return 0
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  validateSizeAt (idx, size) {

    const child = this.props.children[idx]

    switch (this.props.orientation) {

      case 'horizontal':

        if (child.props.minSize &&
           (size.y < child.props.minSize)) {

          return false
        }

        if (child.props.maxSize &&
           (size.y > child.props.maxSize)) {

          return false
        }

      case 'vertical':

        if (child.props.minSize &&
           (size.x < child.props.minSize)) {

          return false
        }

        if (child.props.maxSize &&
           (size.x > child.props.maxSize)) {

          return false
        }
    }

    return true
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  getInitialFlexData () {

    let nbElements = 0

    const flexValues = this.props.children.map((child) => {

      if (child.type === ReflexElement) {

        if (!child.props.flex) {

          ++nbElements
        }
      }

      return child.props.flex || 0
    })

    let remainingFlex = 1

    flexValues.forEach((flex) => {

      remainingFlex -= flex
    })

    return this.props.children.map((child, idx) => {

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

    const children = React.Children.map(
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
        { children }
      </div>
    )
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  guid (format='xxxxxxxxxxxx') {

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
