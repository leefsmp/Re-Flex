/////////////////////////////////////////////////////////
// Detect Browser Type utils
//
/////////////////////////////////////////////////////////
class BrowserType {

  // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
  static isOpera () {
    return (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0)
  }

  // Firefox 1.0+
  static isFirefox () {
    return (typeof InstallTrigger !== 'undefined')
  }

  // Safari 3.0+
  static isSafari () {

    const hasPushNotif = (p) => {
      return p.toString() === "[object SafariRemoteNotification]"
    }

    const htmlElement = Object.prototype.toString.call(window.HTMLElement)

    const push = !window['safari'] || safari.pushNotification

    return (htmlElement.indexOf('Constructor') > 0 || hasPushNotif (push))
  }

  // Internet Explorer 6-11
  static isIE () {
    /*@cc_on!@*/
    return (false || !!document.documentMode)
  }

  // Edge 20+
  static isEdge () {
    return (!BrowserType.isIE() && !!window.StyleMedia)
  }

  // Chrome 1+
  static isChrome () {
    return(!!window.chrome && !!window.chrome.webstore)
  }

  // Blink engine detection
  static isBlink () {
    return ((BrowserType.isChrome() || BrowserType.isOpera()) && !!window.CSS)
  }
}

export default BrowserType
