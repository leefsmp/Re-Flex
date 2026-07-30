///////////////////////////////////////////////////////////
// ReflexHandle
// By Philippe Leefsma
// June 2018
//
///////////////////////////////////////////////////////////
import { getDataProps } from './utilities'
import type { SplitterStartResizeHandler, SplitterResizeHandler } from './types'
import type ReflexEvents from './ReflexEvents'
import React from 'react'

export interface ReflexHandleProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  id?: string
  propagate?: boolean
  document?: Document | null
  onStartResize?: SplitterStartResizeHandler<ReflexHandle>
  onStopResize?: SplitterResizeHandler<ReflexHandle>
  onResize?: SplitterResizeHandler<ReflexHandle>
  [key: `data-${string}`]: unknown
}

interface ReflexHandleInternalProps extends ReflexHandleProps {
  index: number
  events: ReflexEvents
}

interface ReflexHandleState {
  active: boolean
}

export default class ReflexHandle
  extends React.Component<ReflexHandleProps, ReflexHandleState> {

  ref = React.createRef<HTMLDivElement>()

  document: Document | null

  static defaultProps = {
    document: typeof document === 'undefined'
      ? null
      : document,
    onStartResize: null,
    onStopResize: null,
    propagate: false,
    onResize: null,
    className: '',
    style: {}
  }

  static isA (element: React.ReactNode): boolean {
    if (!element || typeof element !== 'object' || !('type' in element)) {
      return false
    }
    //https://github.com/leefsmp/Re-Flex/issues/49
    return (process.env.NODE_ENV === 'development')
      ? (element.type === (<ReflexHandle/>).type)
      : (element.type === ReflexHandle)
  }

  constructor (props: ReflexHandleProps) {
    super (props)
    this.state = {
      active: false
    }
    this.document = props.document ?? null
  }

  get internalProps (): ReflexHandleInternalProps {
    return this.props as ReflexHandleInternalProps
  }

  componentDidMount () {

    if (!this.document) {
      return
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
      return
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

      this.internalProps.events.emit('stopResize', {
        index: this.internalProps.index,
        event: null
      })
    }
  }

  onMouseMove = (event: MouseEvent | TouchEvent) => {

    if (this.state.active) {

      const domElement = this.ref.current

      this.internalProps.events.emit(
        'resize', {
          index: this.internalProps.index,
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

  onMouseDown = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {

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

    this.internalProps.events.emit('startResize', {
      index: this.internalProps.index,
      event
    })
  }

  onMouseUp = (event: MouseEvent | TouchEvent) => {

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

      this.internalProps.events.emit('stopResize', {
        index: this.internalProps.index,
        event
      })
    }
  }

  render () {

    const className = [
      ...(this.props.className ?? '').split(' '),
      this.state.active ? 'active' : '',
      'reflex-handle'
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
