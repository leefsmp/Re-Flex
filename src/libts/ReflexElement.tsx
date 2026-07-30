///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexHandle from './ReflexHandle'
import { getDataProps } from './utilities'
import throttle from 'lodash.throttle'
import React from 'react'
import type { Orientation, ElementResizeHandler } from './types'
import type ReflexEvents from './ReflexEvents'

type AnyReactElement = React.ReactElement<Record<string, unknown>>

const toArray = (obj: React.ReactNode): AnyReactElement[] => {
  if (!obj) {
    return []
  }
  return (Array.isArray(obj) ? obj : [obj]) as AnyReactElement[]
}

export interface ReflexElementProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  name?: string
  size?: number
  minSize?: number
  maxSize?: number
  flex?: number
  direction?: 1 | -1 | (1 | -1)[]
  withHandle?: boolean
  propagateDimensions?: boolean
  propagateDimensionsRate?: number
  resizeHeight?: boolean
  resizeWidth?: boolean
  onStartResize?: ElementResizeHandler
  onStopResize?: ElementResizeHandler
  onResize?: ElementResizeHandler
  [key: `data-${string}`]: unknown
}

// Props injected by ReflexContainer (via cloneElement) and
// by the forwardRef wrapper below, on top of the public props
interface ReflexElementInternalProps extends ReflexElementProps {
  index: number
  orientation: Orientation
  events: ReflexEvents
  innerRef?: React.Ref<HTMLDivElement>
}

interface SizeAwareState {
  height: string | number
  width: string | number
}

class SizeAwareReflexElement
  extends React.Component<ReflexElementInternalProps, SizeAwareState> {

  measureRef = React.createRef<HTMLDivElement>()

  resizeObserver?: ResizeObserver

  setDimensions: (dimensions: Partial<SizeAwareState>) => void

  constructor (props: ReflexElementInternalProps) {

    super (props)

    this.setDimensions = throttle((dimensions: Partial<SizeAwareState>) => {
      this.setState(dimensions as SizeAwareState)
    }, (this.props.propagateDimensionsRate as number) / 1000)

    this.state = {
      height: "100%",
      width: "100%"
    }
  }

  componentDidMount () {

    this.resizeObserver = new ResizeObserver((entries) => {
      this.onResize(entries[0].contentRect)
    })

    if (this.measureRef.current) {
      this.resizeObserver.observe(this.measureRef.current)
    }
  }

  componentWillUnmount () {

    this.resizeObserver?.disconnect()
  }

  onResize = ({ height, width }: { height: number; width: number }) => {

    const { resizeHeight, resizeWidth } = this.props

    this.setDimensions({
      ...(resizeHeight && { height }),
      ...(resizeWidth && { width })
    })
  }

  renderChildren () {

    const { propagateDimensions } = this.props

    const validChildren = toArray(this.props.children).filter((child) => {
      return !!child
    })

    return React.Children.map(validChildren, (child) => {

        if (this.props.withHandle || ReflexHandle.isA(child)) {
          return React.cloneElement(child, {
            dimensions: propagateDimensions && this.state,
            ...child.props,
            index: this.props.index - 1,
            events: this.props.events
          })
        }

        if (propagateDimensions) {
          return React.cloneElement(child, {
            ...child.props,
            dimensions: this.state
          })
        }

        return child
    })
  }

  render () {

    return (
      <div ref={this.measureRef} className="reflex-size-aware">
        <div style={this.state}>
          { this.renderChildren() }
        </div>
      </div>
    )
  }
}


interface ReflexElementState {
  size?: number
}

class ReflexElement
  extends React.Component<ReflexElementInternalProps, ReflexElementState> {

  static defaultProps = {
    propagateDimensionsRate: 100,
    propagateDimensions: false,
    resizeHeight: true,
    resizeWidth: true,
    direction: [1],
    className: ''
  }

  constructor (props: ReflexElementInternalProps) {
    super (props)
    this.state = {
      size: props.size
    }
  }

  static getDerivedStateFromProps (
    nextProps: ReflexElementInternalProps,
    prevState: ReflexElementState
  ): ReflexElementState | null {
    if (nextProps.size !== prevState.size) {
      return {
        ...prevState,
        size: nextProps.size
      }
    }
    return null
  }

  async componentDidUpdate (
    _prevProps: ReflexElementInternalProps,
    prevState: ReflexElementState
  ) {

    if (prevState.size !== this.state.size) {

      const propDirection = this.props.direction

      const directions: (1 | -1)[] = Array.isArray(propDirection)
        ? propDirection
        : propDirection !== undefined ? [propDirection] : []

      for (const direction of directions) {

        await this.props.events.emit('element.size', {
          index: this.props.index,
          size: this.props.size,
          direction
        })
      }
    }
  }

  renderChildren () {

    const validChildren = toArray(this.props.children).filter((child) => {
      return !!child
    })

    return React.Children.map(validChildren, (child) => {
      if (this.props.withHandle || ReflexHandle.isA(child)) {
        return React.cloneElement(child, {
          ...child.props,
          index: this.props.index - 1,
          events: this.props.events
        })
      }
      return child
    })
  }

  render () {

    const className = [
      ...(this.props.className ?? '').split(' '),
      this.props.orientation,
      'reflex-element'
    ].join(' ').trim()

    const style: React.CSSProperties = {
      ...this.props.style,
      flexGrow: this.props.flex,
      flexShrink: 1,
      flexBasis: '0%'
    }

    return (
      <div
        {...getDataProps(this.props)}
        ref={this.props.innerRef}
        className={className}
        style={style}>
      {
        this.props.propagateDimensions
          ? <SizeAwareReflexElement {...this.props}/>
          : this.renderChildren()
      }
      </div>
    )
  }
}

const ForwardedReflexElement = React.forwardRef<HTMLDivElement, ReflexElementProps>((props, ref) => {
  return (
    <ReflexElement innerRef={ref} {...(props as ReflexElementInternalProps)}/>
  )
})

export default ForwardedReflexElement
