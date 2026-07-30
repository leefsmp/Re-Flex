import type React from 'react'
import type ReflexEvents from './ReflexEvents'

export type Orientation = 'horizontal' | 'vertical'

/////////////////////////////////////////////////////////
// Args passed to onStartResize/onStopResize/onResize
// handlers set on a ReflexElement: component is the
// cloned child element being resized
//
/////////////////////////////////////////////////////////
export interface ElementHandlerArgs {
  domElement?: Element | null
  component: ReflexChildElement
}

export type ElementResizeHandler = (args: ElementHandlerArgs) => void

/////////////////////////////////////////////////////////
// Args passed to onStartResize/onStopResize/onResize
// handlers set directly on a ReflexSplitter/ReflexHandle:
// component is the splitter/handle instance itself
//
/////////////////////////////////////////////////////////
export interface SplitterHandlerArgs<C> {
  domElement?: Element | null
  component: C
}

export type SplitterStartResizeHandler<C> =
  (args: SplitterHandlerArgs<C>) => boolean | void

export type SplitterResizeHandler<C> =
  (args: SplitterHandlerArgs<C>) => void

/////////////////////////////////////////////////////////
// Loose shape covering both ReflexElementProps and
// ReflexSplitterProps: used while walking raw,
// not-yet-cloned JSX children (see ReflexContainer's
// getValidChildren/computeFlexData), since a container's
// children can be either kind
//
/////////////////////////////////////////////////////////
export interface ReflexAnyChildProps {
  maxSize?: number
  minSize?: number
  size?: number
  flex?: number
  propagate?: boolean
  [key: string]: unknown
}

export type ReflexRawChildElement = React.ReactElement<ReflexAnyChildProps>

/////////////////////////////////////////////////////////
// Props injected by ReflexContainer onto every cloned
// child (both ReflexElement and ReflexSplitter/Handle
// instances) via React.cloneElement, on top of whatever
// public props the child already had
//
/////////////////////////////////////////////////////////
export interface ReflexInternalProps extends ReflexAnyChildProps {
  index: number
  flex: number
  maxSize: number
  minSize: number
  orientation: Orientation
  events: ReflexEvents
  ref?: React.RefObject<unknown>
  onStartResize?: ElementResizeHandler
  onStopResize?: ElementResizeHandler
  onResize?: ElementResizeHandler
}

export type ReflexChildElement = React.ReactElement<ReflexInternalProps>

export interface FlexDataEntry {
  flex: number
  ref: React.RefObject<unknown>
}
