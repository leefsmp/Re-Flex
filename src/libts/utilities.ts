import type React from 'react'

/////////////////////////////////////////////////////////
// Browser Utils
//
/////////////////////////////////////////////////////////
export class Browser {

  // Check if not running on server
  static isBrowser (): boolean {
    return typeof window !== 'undefined'
  }

  static getUserAgent (): string {
    return typeof navigator === 'undefined' ? '' : navigator.userAgent
  }

  static isAndroid (): boolean {
    return Browser.isBrowser() && /Android/i.test(Browser.getUserAgent())
  }

  static isBlackBerry (): boolean {
    return Browser.isBrowser() && /BlackBerry/i.test(Browser.getUserAgent())
  }

  static isIOS (): boolean {
    return Browser.isBrowser() && /iPhone|iPad|iPod/i.test(Browser.getUserAgent())
  }

  static isWindowsMobile (): boolean {
    return Browser.isBrowser() && /IEMobile/i.test(Browser.getUserAgent())
  }

  static isMobile (): boolean {

    return Browser.isBrowser() &&
      (Browser.isWindowsMobile() ||
      Browser.isBlackBerry() ||
      Browser.isAndroid() ||
      Browser.isIOS())
  }
}

/////////////////////////////////////////////////////////
// Returns only the props that start with "data-"
//
/////////////////////////////////////////////////////////
export const getDataProps = <P extends object>(
  props: P
): Record<string, unknown> => {
  return Object.keys(props).reduce((prev, key) => {
    if (key.startsWith('data-')) {
      return {
        ...prev,
        [key]: (props as Record<string, unknown>)[key]
      }
    }
    return prev
  }, {} as Record<string, unknown>)
}

/////////////////////////////////////////////////////////
// Returns the pointer position from a mouse or touch
// event (native or synthetic), normalizing away the
// changedTouches indirection
//
/////////////////////////////////////////////////////////
type PointerSourceEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent
  | React.TouchEvent

export const getPointerPosition = (
  event: PointerSourceEvent
): { clientX: number; clientY: number } => {
  return 'changedTouches' in event
    ? event.changedTouches[0]
    : event
}
