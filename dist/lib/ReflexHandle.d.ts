import { default as React } from 'react';
export default class ReflexHandle extends React.Component<any, any, any> {
    static propTypes: {
        children: any;
        onStartResize: any;
        onStopResize: any;
        className: any;
        propagate: any;
        onResize: any;
        style: any;
    };
    static defaultProps: {
        document: Document;
        onStartResize: any;
        onStopResize: any;
        propagate: boolean;
        onResize: any;
        className: string;
        style: {};
    };
    static isA(element: any): boolean;
    constructor(props: any);
    ref: React.RefObject<any>;
    state: {
        active: boolean;
    };
    document: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMouseMove: (event: any) => void;
    onMouseDown: (event: any) => void;
    onMouseUp: (event: any) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
