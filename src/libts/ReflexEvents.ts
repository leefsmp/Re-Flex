///////////////////////////////////////////////////////////
// ReflexEvents
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
type ReflexEventHandler = (...args: unknown[]) => unknown

class ReflexEvents {

  private _events: Record<string, ReflexEventHandler[]> = {}

  /////////////////////////////////////////////////////////
  // Supports multiple events space-separated
  //
  /////////////////////////////////////////////////////////
  on (events: string, fct: ReflexEventHandler): this {

    events.split(' ').forEach((event) => {

      this._events[event] = this._events[event] || []
      this._events[event].push(fct)
    })

    return this
  }

  /////////////////////////////////////////////////////////
  // Supports multiple events space-separated
  //
  /////////////////////////////////////////////////////////
  off (events?: string, fct?: ReflexEventHandler): this {

    if (events === undefined) {

      this._events = {}
      return this
    }

    events.split(' ').forEach((event) => {

      if (event in this._events === false) {
        return
      }

      if (fct) {

        const idx = this._events[event].indexOf(fct)

        if (idx !== -1) {
          this._events[event].splice(idx, 1)
        }

      } else {

        this._events[event] = []
      }
    })

    return this
  }

  emit (event: string, ...args: unknown[]): unknown {

    const handlers = this._events[event]

    if (handlers === undefined) {
      return undefined
    }

    const snapshot = handlers.slice()

    for (const handler of snapshot) {

      const result = handler.apply(this, args)

      if (result !== undefined) {
        return result
      }
    }

    return undefined
  }
}

export default ReflexEvents
