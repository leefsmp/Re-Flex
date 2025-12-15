export default ReflexEvents;
declare class ReflexEvents {
    _events: {};
    on(events: any, fct: any): this;
    off(events: any, fct: any): this;
    emit(event: any, ...args: any[]): any;
}
