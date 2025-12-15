import { default as React } from 'react';
import { default as ReflexEvents } from './ReflexEvents';
export default class ReflexContainer extends React.Component<any, any, any> {
    static propTypes: {
        windowResizeAware: any;
        orientation: any;
        maxRecDepth: any;
        className: any;
        style: any;
    };
    static defaultProps: {
        orientation: string;
        windowResizeAware: boolean;
        maxRecDepth: number;
        className: string;
        style: {};
    };
    constructor(props: any);
    events: ReflexEvents;
    children: any[];
    state: {
        flexData: any[];
    };
    ref: React.RefObject<any>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getValidChildren(props?: Readonly<any>): any[];
    componentDidUpdate(prevProps: any, prevState: any): void;
    onWindowResize: () => void;
    flexHasChanged(prevProps: any): boolean;
    getSize(element: any): any;
    getOffset(pos: any, domElement: any): number;
    onStartResize: (data: any) => void;
    previousPos: any;
    elements: any[];
    onResize: (data: any) => void;
    onStopResize: (data: any) => void;
    onElementSize: (data: any) => Promise<any>;
    adjustFlex(elements: any): void;
    computeAvailableOffset(idx: any, offset: any): number;
    checkPropagate(idx: any, direction: any): any;
    computeAvailableStretch(idx: any, offset: any): any;
    computeAvailableShrink(idx: any, offset: any): any;
    computePixelFlex(orientation?: any): number;
    addOffset(element: any, offset: any): void;
    dispatchStretch(idx: any, offset: any): any;
    dispatchShrink(idx: any, offset: any): any;
    dispatchOffset(idx: any, offset: any): any[];
    emitElementsEvent(elements: any, event: any): void;
    computeFlexData(children?: any[], props?: Readonly<any>): any;
    toArray(obj: any): any[];
    render(): import("react/jsx-runtime").JSX.Element;
}
