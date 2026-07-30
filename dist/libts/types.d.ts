import { default as React } from 'react';
import { default as ReflexEvents } from './ReflexEvents';
export type Orientation = 'horizontal' | 'vertical';
export interface ElementHandlerArgs {
    domElement?: Element | null;
    component: ReflexChildElement;
}
export type ElementResizeHandler = (args: ElementHandlerArgs) => void;
export interface SplitterHandlerArgs<C> {
    domElement?: Element | null;
    component: C;
}
export type SplitterStartResizeHandler<C> = (args: SplitterHandlerArgs<C>) => boolean | void;
export type SplitterResizeHandler<C> = (args: SplitterHandlerArgs<C>) => void;
export interface ReflexAnyChildProps {
    maxSize?: number;
    minSize?: number;
    size?: number;
    flex?: number;
    propagate?: boolean;
    [key: string]: unknown;
}
export type ReflexRawChildElement = React.ReactElement<ReflexAnyChildProps>;
export interface ReflexInternalProps extends ReflexAnyChildProps {
    index: number;
    flex: number;
    maxSize: number;
    minSize: number;
    orientation: Orientation;
    events: ReflexEvents;
    ref?: React.RefObject<unknown>;
    onStartResize?: ElementResizeHandler;
    onStopResize?: ElementResizeHandler;
    onResize?: ElementResizeHandler;
}
export type ReflexChildElement = React.ReactElement<ReflexInternalProps>;
export interface FlexDataEntry {
    flex: number;
    ref: React.RefObject<unknown>;
}
