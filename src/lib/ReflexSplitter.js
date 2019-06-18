///////////////////////////////////////////////////////////
// ReflexSplitter
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Browser from './Browser'
import React from 'react'
import getDataProps from './utilities';

export default class ReflexSplitter extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
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

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
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
    return (process.env.NODE_ENV === 'development')
      ? (element.type === (<ReflexSplitter/>).type)
      : (element.type === ReflexSplitter)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)

    this.state = {
      active: false
    }

    this.document = props.document
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
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

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
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

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onMouseMove = (event) => {

    if (this.state.active) {

      this.props.events.emit(
        'resize', {
          index: this.props.index,
          event
        })

      if (this.props.onResize) {

        this.props.onResize({
          domElement: ReactDOM.findDOMNode(this),
          component: this
        })
      }    

      event.stopPropagation()
      event.preventDefault()
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onMouseDown = (event) => {

    this.setState({
      active: true
    })

    if (this.props.onStartResize) {

      // cancels resize from controller
      // if needed by returning true
      // to onStartResize
      if (this.props.onStartResize({
          domElement: ReactDOM.findDOMNode(this),
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

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onMouseUp = (event) => {

    if (this.state.active) {

      this.setState({
        active: false
      })

      if (this.props.onStopResize) {
        this.props.onStopResize({
          domElement: ReactDOM.findDOMNode(this),
          component: this
        })
      }

      this.props.events.emit('stopResize', {
        index: this.props.index,
        event
      })
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const className = [
      Browser.isMobile() ? 'reflex-thin' :'',
      ...this.props.className.split(' '),
      this.state.active? 'active' : '',
      'reflex-splitter'
    ].join(' ').trim()

    return (
      <div
        {...getDataProps(this.props)}
        onTouchStart={this.onMouseDown}
        onMouseDown={this.onMouseDown}
        className={className}
        id={this.props.id}>
        {this.props.children}
      </div>
    )
  }
}
