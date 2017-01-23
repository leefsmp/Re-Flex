/////////////////////////////////////////////////////////
// Browser Utils
//
/////////////////////////////////////////////////////////
class Browser {

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
    return (!Browser.isIE() && !!window.StyleMedia)
  }

  // Chrome 1+
  static isChrome () {
    return(!!window.chrome && !!window.chrome.webstore)
  }

  // Blink engine detection
  static isBlink () {
    return ((Browser.isChrome() || Browser.isOpera()) && !!window.CSS)
  }


  static getUserAgent () {
    return navigator.userAgent
  }

  static isAndroid () {
    return Browser.getUserAgent().match(/Android/i)
  }

  static isBlackBerry () {
    return Browser.getUserAgent().match(/BlackBerry/i)
  }

  static isIOS () {
    return Browser.getUserAgent().match(/iPhone|iPad|iPod/i)
  }

  static isOpera () {
    return Browser.getUserAgent().match(/Opera Mini/i)
  }

  static isWindows () {
    return Browser.isWindowsDesktop() || Browser.isWindowsMobile()
  }

  static isWindowsMobile () {
    return Browser.getUserAgent().match(/IEMobile/i)
  }

  static isWindowsDesktop () {
    return Browser.getUserAgent().match(/WPDesktop/i)
  }

  static isMobile () {

    return Browser.isWindowsMobile() ||
      Browser.isBlackBerry() ||
      Browser.isAndroid() ||
      Browser.isIOS()
  }
}

export default Browser
