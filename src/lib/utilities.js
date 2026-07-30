/////////////////////////////////////////////////////////
// Browser Utils
//
/////////////////////////////////////////////////////////
class Browser {

  // Check if not running on server
  static isBrowser () {
    return typeof window !== 'undefined';
  }

  static getUserAgent () {
    return typeof navigator === 'undefined' ? '' : navigator.userAgent
  }

  static isAndroid () {
    return Browser.isBrowser() && Browser.getUserAgent().match(/Android/i)
  }

  static isBlackBerry () {
    return Browser.isBrowser() && Browser.getUserAgent().match(/BlackBerry/i)
  }

  static isIOS () {
    return Browser.isBrowser() && Browser.getUserAgent().match(/iPhone|iPad|iPod/i)
  }

  static isWindowsMobile () {
    return Browser.isBrowser() && Browser.getUserAgent().match(/IEMobile/i)
  }

  static isMobile () {

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
const getDataProps = (props) => {
  return Object.keys(props).reduce((prev, key) => {
    if (key.substr(0, 5) === 'data-') {
        return {
          ...prev,
          [key]: props[key]
        }
    }
    return prev
  }, {})
}

/////////////////////////////////////////////////////////
// Returns the pointer position from a mouse or touch
// event, normalizing away the changedTouches indirection
//
/////////////////////////////////////////////////////////
const getPointerPosition = (event) => {
  return event.changedTouches
    ? event.changedTouches[0]
    : event
}

export {
  getDataProps,
  getPointerPosition,
  Browser
}