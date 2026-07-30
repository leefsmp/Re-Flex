import { default as React } from 'react';
import { ElementResizeHandler } from './types';
export interface ReflexElementProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    name?: string;
    size?: number;
    minSize?: number;
    maxSize?: number;
    flex?: number;
    direction?: 1 | -1 | (1 | -1)[];
    withHandle?: boolean;
    propagateDimensions?: boolean;
    propagateDimensionsRate?: number;
    resizeHeight?: boolean;
    resizeWidth?: boolean;
    onStartResize?: ElementResizeHandler;
    onStopResize?: ElementResizeHandler;
    onResize?: ElementResizeHandler;
    [key: `data-${string}`]: unknown;
}
declare const ForwardedReflexElement: React.ForwardRefExoticComponent<ReflexElementProps & React.RefAttributes<HTMLDivElement>>;
export default ForwardedReflexElement;
