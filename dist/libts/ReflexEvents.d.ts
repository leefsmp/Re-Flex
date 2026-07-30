type ReflexEventHandler = (...args: unknown[]) => unknown;
declare class ReflexEvents {
    private _events;
    on(events: string, fct: ReflexEventHandler): this;
    off(events?: string, fct?: ReflexEventHandler): this;
    emit(event: string, ...args: unknown[]): unknown;
}
export default ReflexEvents;
