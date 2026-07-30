import { default as ReflexEvents } from './ReflexEvents';
import { default as React } from 'react';
import { Orientation, FlexDataEntry, ReflexChildElement, ReflexRawChildElement } from './types';
export interface ReflexContainerProps {
    orientation?: Orientation;
    windowResizeAware?: boolean;
    maxRecDepth?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    [key: `data-${string}`]: unknown;
}
interface ReflexContainerState {
    flexData: FlexDataEntry[];
    windowResizeAware?: boolean;
    resizing?: boolean;
}
interface StartResizeEventData {
    index: number;
    event: React.MouseEvent | React.TouchEvent;
}
interface ResizeEventData {
    index: number;
    domElement: Element | null;
    event: MouseEvent | TouchEvent;
}
interface ElementSizeEventData {
    index: number;
    size?: number;
    direction: 1 | -1;
}
export default class ReflexContainer extends React.Component<ReflexContainerProps, ReflexContainerState> {
    static defaultProps: {
        orientation: string;
        windowResizeAware: boolean;
        maxRecDepth: number;
        className: string;
        style: {};
    };
    events: ReflexEvents;
    children: ReflexChildElement[];
    elements: ReflexChildElement[] | null;
    previousPos: number;
    ref: React.RefObject<HTMLDivElement | null>;
    constructor(props: ReflexContainerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getValidChildren(props?: ReflexContainerProps): ReflexRawChildElement[];
    componentDidUpdate(prevProps: ReflexContainerProps): void;
    onWindowResize: () => void;
    flexHasChanged(prevProps: ReflexContainerProps): boolean;
    getChildRef(element?: ReflexChildElement | null): React.RefObject<unknown> | undefined;
    getSize(element?: ReflexChildElement | null): number;
    getOffset(pos: {
        clientX: number;
        clientY: number;
    }, domElement: Element): number;
    onStartResize: (data: StartResizeEventData) => void;
    onResize: (data: ResizeEventData) => void;
    onStopResize: () => void;
    onElementSize: (data: ElementSizeEventData) => Promise<void>;
    adjustFlex(elements: ReflexChildElement[], flexData: FlexDataEntry[]): void;
    computeAvailableOffset(idx: number, offset: number): number;
    checkPropagate(idx: number, direction: number): boolean;
    computeAvailableStretch(idx: number, offset: number): number;
    computeAvailableShrink(idx: number, offset: number): number;
    computePixelFlex(orientation?: Orientation): number;
    addOffset(element: ReflexChildElement, offset: number, flexData: FlexDataEntry[]): void;
    dispatchStretch(idx: number, offset: number, flexData: FlexDataEntry[]): ReflexChildElement[];
    dispatchShrink(idx: number, offset: number, flexData: FlexDataEntry[]): ReflexChildElement[];
    dispatchOffset(idx: number, offset: number, flexData: FlexDataEntry[]): ReflexChildElement[];
    cloneFlexData(flexData: FlexDataEntry[]): FlexDataEntry[];
    emitElementsEvent(elements: ReflexChildElement[] | ReflexChildElement | null, event: 'onStartResize' | 'onStopResize' | 'onResize'): void;
    computeFlexData(children?: ReflexRawChildElement[], props?: ReflexContainerProps): FlexDataEntry[];
    toArray<T>(obj: T | T[] | null | undefined): T[];
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
