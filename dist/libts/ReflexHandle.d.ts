import { SplitterStartResizeHandler, SplitterResizeHandler } from './types';
import { default as ReflexEvents } from './ReflexEvents';
import { default as React } from 'react';
export interface ReflexHandleProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    propagate?: boolean;
    document?: Document | null;
    onStartResize?: SplitterStartResizeHandler<ReflexHandle>;
    onStopResize?: SplitterResizeHandler<ReflexHandle>;
    onResize?: SplitterResizeHandler<ReflexHandle>;
    [key: `data-${string}`]: unknown;
}
interface ReflexHandleInternalProps extends ReflexHandleProps {
    index: number;
    events: ReflexEvents;
}
interface ReflexHandleState {
    active: boolean;
}
export default class ReflexHandle extends React.Component<ReflexHandleProps, ReflexHandleState> {
    ref: React.RefObject<HTMLDivElement>;
    document: Document | null;
    static defaultProps: {
        document: Document;
        onStartResize: any;
        onStopResize: any;
        propagate: boolean;
        onResize: any;
        className: string;
        style: {};
    };
    static isA(element: React.ReactNode): boolean;
    constructor(props: ReflexHandleProps);
    get internalProps(): ReflexHandleInternalProps;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMouseMove: (event: MouseEvent | TouchEvent) => void;
    onMouseDown: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    onMouseUp: (event: MouseEvent | TouchEvent) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
