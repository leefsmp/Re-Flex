import { SplitterStartResizeHandler, SplitterResizeHandler } from './types';
import { default as ReflexEvents } from './ReflexEvents';
import { default as React } from 'react';
export interface ReflexSplitterProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    propagate?: boolean;
    document?: Document | null;
    onStartResize?: SplitterStartResizeHandler<ReflexSplitter>;
    onStopResize?: SplitterResizeHandler<ReflexSplitter>;
    onResize?: SplitterResizeHandler<ReflexSplitter>;
    [key: `data-${string}`]: unknown;
}
interface ReflexSplitterInternalProps extends ReflexSplitterProps {
    index: number;
    events: ReflexEvents;
}
interface ReflexSplitterState {
    active: boolean;
}
export default class ReflexSplitter extends React.Component<ReflexSplitterProps, ReflexSplitterState> {
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
    static isA(element: {
        type?: unknown;
    } | null | undefined): boolean;
    constructor(props: ReflexSplitterProps);
    get internalProps(): ReflexSplitterInternalProps;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMouseMove: (event: MouseEvent | TouchEvent) => void;
    onMouseDown: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    onMouseUp: (event: MouseEvent | TouchEvent) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
