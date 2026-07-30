import { default as React } from 'react';
export declare class Browser {
    static isBrowser(): boolean;
    static getUserAgent(): string;
    static isAndroid(): boolean;
    static isBlackBerry(): boolean;
    static isIOS(): boolean;
    static isWindowsMobile(): boolean;
    static isMobile(): boolean;
}
export declare const getDataProps: <P extends object>(props: P) => Record<string, unknown>;
type PointerSourceEvent = MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent;
export declare const getPointerPosition: (event: PointerSourceEvent) => {
    clientX: number;
    clientY: number;
};
export {};
