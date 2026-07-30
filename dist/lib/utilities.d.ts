export function getDataProps(props: any): {};
export function getPointerPosition(event: any): any;
export class Browser {
    static isBrowser(): boolean;
    static getUserAgent(): string;
    static isAndroid(): RegExpMatchArray;
    static isBlackBerry(): RegExpMatchArray;
    static isIOS(): RegExpMatchArray;
    static isWindowsMobile(): RegExpMatchArray;
    static isMobile(): RegExpMatchArray;
}
