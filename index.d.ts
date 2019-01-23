import * as React from "react";

export type StyleAndClass = {
    className?: string;
    style?: React.CSSProperties;
};

export type ReflexContainerProps = {
    orientation?: "orizontal" | "vertical";
    maxRecDepth?: number;
    windowResizeAware?: boolean;
};

export class ReflexContainer extends React.Component<ReflexContainerProps, any> { }

type PosNeg = -1 | 1;

type HandlerProps = {
    domElement: Element | Text,
    component: React.ComponentElement<ReflexElementProps, ReflexElement>
};

type ReflexElementProps = {
    propagateDimensions?: boolean;
    propagateDimensionsRate?: number;
    resizeHeight?: boolean;
    resizeWidth?: boolean;
    size?: number;
    minSize?: number;
    maxSize?: number;
    flex?: number;
    direction?: PosNeg | [PosNeg, PosNeg];
    onStartResize?: (args: HandlerProps) => void;
    onResize?: (args: HandlerProps) => void;
} & StyleAndClass;

export class ReflexElement extends React.Component<ReflexElementProps, any> { }

export type ReflexSplitterProps = {
    propagate?: boolean;
    onStartResize?: (args: HandlerProps) => void;
    onStopResize?: (args: HandlerProps) => void;
    onResize?: (args: HandlerProps) => void;
} & StyleAndClass;

export class ReflexSplitter extends React.Component<ReflexSplitterProps, any> { }

export type ReflexHandleProps = {
    onStartResize?: (args: HandlerProps) => void;
    onStopResize?: (args: HandlerProps) => void;
    propagate?: boolean;
    onResize?: (args: HandlerProps) => void;
} & StyleAndClass;

export class ReflexHandle extends React.Component<any, any> { }
