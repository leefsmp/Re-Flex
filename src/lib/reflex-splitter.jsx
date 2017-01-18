///////////////////////////////////////////////////////////
// ReflexSplitter
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReactDOM from 'react-dom'
import React from 'react'

export default class ReflexSplitter
  extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    onStartResize:React.PropTypes.func,
    className: React.PropTypes.string,
    onEndResize:React.PropTypes.func,
    propagate: React.PropTypes.bool,
    onResize:React.PropTypes.func
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
    onStartResize: null,
    onEndResize: null,
    propagate: false,
    onResize:null,
    className: '',
    document
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

    this.document.addEventListener(
      'touchend',
      this.onMouseUp)

    this.document.addEventListener(
      'mouseup',
      this.onMouseUp)

    this.document.addEventListener(
      'mousemove',
      this.onMouseMove)

    this.document.addEventListener(
      'touchmove',
      this.onMouseMove)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillUnmount () {

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

        event.stopPropagation()
        event.preventDefault()

        return
      }
    }

    this.props.events.emit('splitter.startResize', {
      splitter: this,
      event
    })

    event.stopPropagation()
    event.preventDefault()
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

    if (mobile.isAny()) {

      classNames.push('mobile')
    }

    return (
      <div className={classNames.join(' ')}
        onTouchStart={this.onMouseDown}
        onMouseDown={this.onMouseDown}>
      </div>
    )
  }
}

const mobile = {

  getUserAgent: function () {
    return navigator.userAgent;
  },
  isAndroid: function () {
    return this.getUserAgent().match(/Android/i);
  },
  isBlackBerry: function () {
    return this.getUserAgent().match(/BlackBerry/i);
  },
  isIOS: function () {
    return this.getUserAgent().match(/iPhone|iPad|iPod/i);
  },
  isOpera: function () {
    return this.getUserAgent().match(/Opera Mini/i);
  },
  isWindows: function () {
    return this.isWindowsDesktop() || this.isWindowsMobile();
  },
  isWindowsMobile: function () {
    return this.getUserAgent().match(/IEMobile/i);
  },
  isWindowsDesktop: function () {
    return this.getUserAgent().match(/WPDesktop/i);
  },
  isAny: function () {

    return this.isAndroid() ||
      this.isBlackBerry() ||
      this.isIOS() ||
      this.isWindowsMobile();
  }
}
