///////////////////////////////////////////////////////////
// ReflexSplitter
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import {Browser, getDataProps} from './utilities'
import PropTypes from 'prop-types'
import React from 'react'

export default class ReflexSplitter extends React.Component {

  ref = React.createRef()
  
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    onStartResize: PropTypes.func,
    onStopResize: PropTypes.func,
    className: PropTypes.string,
    propagate: PropTypes.bool,
    onResize: PropTypes.func,
    style: PropTypes.object
  }

  static defaultProps = {
    document: typeof document !== 'undefined' 
      ? document
      : null,
    onStartResize: null,
    onStopResize: null,
    propagate: false,
    onResize:null,
    className: '',
    style: {}
  }

  /////////////////////////////////////////////////////////
  // Determines if element is a splitter
  // or wraps a splitter
  //
  /////////////////////////////////////////////////////////
  static isA (element) {
    if (!element) {
      return false
    }
    //https://github.com/leefsmp/Re-Flex/issues/49
    return (element.type === (<ReflexSplitter/>).type)
  }

  constructor (props) {
    super (props)
    this.state = {
      active: false
    }
    this.document = props.document
  }
  
  componentDidMount () {
    
    if (!this.document) {
      return;
    }

    this.document.addEventListener(
      'touchend',
      this.onMouseUp)

    this.document.addEventListener(
      'mouseup',
      this.onMouseUp)

    this.document.addEventListener(
      'mousemove',
      this.onMouseMove, {
        passive: false
      })

    this.document.addEventListener(
      'touchmove',
      this.onMouseMove, {
        passive: false
      })
  }

  componentWillUnmount () {

    if (!this.document) {
      return;
    }

    this.document.removeEventListener(
      'mouseup',
      this.onMouseUp)

    this.document.removeEventListener(
      'touchend',
      this.onMouseUp)

    this.document.removeEventListener(
      'mousemove',
      this.onMouseMove)

    this.document.removeEventListener(
      'touchmove',
      this.onMouseMove)

    if (this.state.active) {
      this.props.events.emit('stopResize', {
        index: this.props.index,
        event: null
      })
    }
  }
  
  onMouseMove = (event) => {

    if (this.state.active) {

      const domElement = this.ref.current

      this.props.events.emit(
        'resize', {
          index: this.props.index,
          domElement,
          event
        })

      if (this.props.onResize) {

        this.props.onResize({
          component: this,
          domElement
        })
      }    

      event.stopPropagation()
      event.preventDefault()
    }
  }

  onMouseDown = (event) => {

    this.setState({
      active: true
    })

    if (this.props.onStartResize) {

      // cancels resize from controller
      // if needed by returning true
      // to onStartResize
      if (this.props.onStartResize({
          domElement: this.ref.current,
          component: this
      })) {
        return
      }
    }

    this.props.events.emit('startResize', {
      index: this.props.index,
      event
    })
  }
  
  onMouseUp = (event) => {

    if (this.state.active) {

      this.setState({
        active: false
      })

      if (this.props.onStopResize) {
        this.props.onStopResize({
          domElement: this.ref.current,
          component: this
        })
      }

      this.props.events.emit('stopResize', {
        index: this.props.index,
        event
      })
    }
  }
  
  render () {

    const className = [
      Browser.isMobile() ? 'reflex-thin' : '',
      ...this.props.className.split(' '),
      this.state.active ? 'active' : '',
      'reflex-splitter'
    ].join(' ').trim()

    return (
      <div
        {...getDataProps(this.props)}
        onTouchStart={this.onMouseDown}
        onMouseDown={this.onMouseDown}
        style={this.props.style}
        className={className}
        id={this.props.id}
        ref={this.ref}>
        {this.props.children}
      </div>
    )
  }
}
