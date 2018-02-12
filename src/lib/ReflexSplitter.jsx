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
    document: typeof document === 'undefined' 
      ? null 
      : document,
    onStartResize: null,
    onStopResize: null,
    propagate: false,
    onResize:null,
    className: '',
    style: {}
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

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp   = this.onMouseUp.bind(this)

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
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onMouseMove (event) {

    if (this.state.active) {

      this.props.events.emit(
        'splitter.resize', {
          splitter: this,
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
  onMouseDown (event) {

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

    this.props.events.emit('splitter.startResize', {
      splitter: this,
      event
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onMouseUp (event) {

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

      this.props.events.emit('splitter.stopResize', {
        splitter: this,
        event
      })
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const classNames = [
      'reflex-splitter',
      ...this.props.className.split(' ')
    ]

    if (Browser.isMobile()) {

      classNames.push('reflex-thin')
    }

    if (this.state.active) {

      classNames.push('active')
    }

    return (
      <div className={classNames.join(' ')}
        onTouchStart={this.onMouseDown}
        onMouseDown={this.onMouseDown}
        style={this.props.style}
        id={this.props.id}>
        {this.props.children}
      </div>
    )
  }
}
