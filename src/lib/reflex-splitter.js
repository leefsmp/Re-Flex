import FlexEvents from './reflex-events'
import ReactDOM from 'react-dom'
import React from 'react'

export default class ReflexSplitter extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    onStartResize:React.PropTypes.func,
    onEndResize:React.PropTypes.func,
    onResize:React.PropTypes.func,
    className: React.PropTypes.string
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
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

    this.document = props.document

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp   = this.onMouseUp.bind(this)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount () {

    this.document.addEventListener(
      'mouseup',
      this.onMouseUp)

    this.document.addEventListener(
      'mousemove',
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
      'mousemove',
      this.onMouseMove)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onMouseMove (event) {

    if (this.state.active) {

      if (this.props.onResize) {

        this.props.onResize()
      }

      FlexEvents.emit(
        'splitter.resize', {
          splitter: this,
          event
        })

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

      this.props.onStartResize(event)
    }

    FlexEvents.emit('splitter.startResize', {
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

        this.props.onStopResize(event)
      }

      FlexEvents.emit('splitter.stopResize', {
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
      ...this.props.className.split(' '),
      'reflex-splitter'
    ]

    return (
      <div className={classNames.join(' ')}
        onMouseDown={this.onMouseDown}>
      </div>
    )
  }
}
