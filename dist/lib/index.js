(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["react-reflex"] = factory(require("react"), require("react-dom"));
	else
		root["react-reflex"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } ///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////


var ReflexElement = function (_React$Component) {
  _inherits(ReflexElement, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexElement(props) {
    _classCallCheck(this, ReflexElement);

    var _this = _possibleConstructorReturn(this, (ReflexElement.__proto__ || Object.getPrototypeOf(ReflexElement)).call(this, props));

    _this.state = {
      style: {}
    };
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(ReflexElement, [{
    key: 'componentWillReceiveProps',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(props) {
        var directions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dir;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(props.size !== this.props.size)) {
                  _context.next = 28;
                  break;
                }

                directions = this.toArray(props.direction);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = directions[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 14;
                  break;
                }

                dir = _step.value;
                _context.next = 11;
                return this.props.events.emit('element.size', {
                  size: props.size,
                  direction: dir,
                  element: this
                });

              case 11:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 14:
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 20:
                _context.prev = 20;
                _context.prev = 21;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 23:
                _context.prev = 23;

                if (!_didIteratorError) {
                  _context.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context.finish(23);

              case 27:
                return _context.finish(20);

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 16, 20, 28], [21,, 23, 27]]);
      }));

      function componentWillReceiveProps(_x) {
        return _ref.apply(this, arguments);
      }

      return componentWillReceiveProps;
    }()

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'toArray',
    value: function toArray(obj) {

      return obj ? Array.isArray(obj) ? obj : [obj] : [];
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'render',
    value: function render() {

      var classNames = ['reflex-element'].concat(_toConsumableArray(this.props.className.split(' ')));

      var style = Object.assign({}, {
        WebkitBoxFlex: this.props.flex,
        FlexElement: this.props.flex,
        MozBoxFlex: this.props.flex,
        WebkitFlex: this.props.flex,
        flex: this.props.flex
      }, this.props.style);

      return _react2.default.createElement(
        'div',
        { className: classNames.join(' '), style: style },
        this.props.children
      );
    }
  }]);

  return ReflexElement;
}(_react2.default.Component);

ReflexElement.propTypes = {
  className: _react2.default.PropTypes.string
};
ReflexElement.defaultProps = {
  className: ''
};
exports.default = ReflexElement;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } ///////////////////////////////////////////////////////////
// ReflexSplitter
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////


var ReflexSplitter = function (_React$Component) {
  _inherits(ReflexSplitter, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexSplitter(props) {
    _classCallCheck(this, ReflexSplitter);

    var _this = _possibleConstructorReturn(this, (ReflexSplitter.__proto__ || Object.getPrototypeOf(ReflexSplitter)).call(this, props));

    _this.state = {
      active: false
    };

    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);

    _this.document = props.document;
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(ReflexSplitter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      this.document.addEventListener('touchend', this.onMouseUp);

      this.document.addEventListener('mouseup', this.onMouseUp);

      this.document.addEventListener('mousemove', this.onMouseMove);

      this.document.addEventListener('touchmove', this.onMouseMove);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      this.document.removeEventListener('mouseup', this.onMouseUp);

      this.document.removeEventListener('touchend', this.onMouseUp);

      this.document.removeEventListener('mousemove', this.onMouseMove);

      this.document.removeEventListener('touchmove', this.onMouseMove);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {

      if (this.state.active) {

        this.props.events.emit('splitter.resize', {
          splitter: this,
          event: event
        });

        if (this.props.onResize) {

          this.props.onResize();
        }

        event.stopPropagation();
        event.preventDefault();
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseDown',
    value: function onMouseDown(event) {

      this.setState({
        active: true
      });

      if (this.props.onStartResize) {

        // cancels resize from controller
        // if needed by returning true
        // to onStartResize
        if (this.props.onStartResize(event)) {

          event.stopPropagation();
          event.preventDefault();

          return;
        }
      }

      this.props.events.emit('splitter.startResize', {
        splitter: this,
        event: event
      });

      event.stopPropagation();
      event.preventDefault();
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseUp',
    value: function onMouseUp(event) {

      if (this.state.active) {

        this.setState({
          active: false
        });

        if (this.props.onStopResize) {

          this.props.onStopResize(event);
        }

        this.props.events.emit('splitter.stopResize', {
          splitter: this,
          event: event
        });
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'render',
    value: function render() {

      var classNames = ['reflex-splitter'].concat(_toConsumableArray(this.props.className.split(' ')));

      if (mobile.isAny()) {

        classNames.push('mobile');
      }

      return _react2.default.createElement('div', { className: classNames.join(' '),
        onTouchStart: this.onMouseDown,
        onMouseDown: this.onMouseDown });
    }
  }]);

  return ReflexSplitter;
}(_react2.default.Component);

ReflexSplitter.propTypes = {
  onStartResize: _react2.default.PropTypes.func,
  className: _react2.default.PropTypes.string,
  onEndResize: _react2.default.PropTypes.func,
  propagate: _react2.default.PropTypes.bool,
  onResize: _react2.default.PropTypes.func
};
ReflexSplitter.defaultProps = {
  onStartResize: null,
  onEndResize: null,
  propagate: false,
  onResize: null,
  className: '',
  document: document
};
exports.default = ReflexSplitter;


var mobile = {

  getUserAgent: function getUserAgent() {
    return navigator.userAgent;
  },
  isAndroid: function isAndroid() {
    return this.getUserAgent().match(/Android/i);
  },
  isBlackBerry: function isBlackBerry() {
    return this.getUserAgent().match(/BlackBerry/i);
  },
  isIOS: function isIOS() {
    return this.getUserAgent().match(/iPhone|iPad|iPod/i);
  },
  isOpera: function isOpera() {
    return this.getUserAgent().match(/Opera Mini/i);
  },
  isWindows: function isWindows() {
    return this.isWindowsDesktop() || this.isWindowsMobile();
  },
  isWindowsMobile: function isWindowsMobile() {
    return this.getUserAgent().match(/IEMobile/i);
  },
  isWindowsDesktop: function isWindowsDesktop() {
    return this.getUserAgent().match(/WPDesktop/i);
  },
  isAny: function isAny() {

    return this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isWindowsMobile();
  }
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reflexSplitter = __webpack_require__(3);

var _reflexSplitter2 = _interopRequireDefault(_reflexSplitter);

var _reflexElement = __webpack_require__(2);

var _reflexElement2 = _interopRequireDefault(_reflexElement);

var _reflexEvents = __webpack_require__(7);

var _reflexEvents2 = _interopRequireDefault(_reflexEvents);

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } ///////////////////////////////////////////////////////////
// ReflexContainer
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////


var ReflexContainer = function (_React$Component) {
  _inherits(ReflexContainer, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexContainer(props) {
    _classCallCheck(this, ReflexContainer);

    var _this = _possibleConstructorReturn(this, (ReflexContainer.__proto__ || Object.getPrototypeOf(ReflexContainer)).call(this, props));

    _this.state = {
      flexData: _this.getInitialFlexData()
    };

    _this.events = new _reflexEvents2.default();

    _this.onSplitterStartResize = _this.onSplitterStartResize.bind(_this);

    _this.onSplitterStopResize = _this.onSplitterStopResize.bind(_this);

    _this.onSplitterResize = _this.onSplitterResize.bind(_this);

    _this.onElementSize = _this.onElementSize.bind(_this);
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(ReflexContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      this.events.on('splitter.startResize', this.onSplitterStartResize);

      this.events.on('splitter.stopResize', this.onSplitterStopResize);

      this.events.on('splitter.resize', this.onSplitterResize);

      this.events.on('element.size', this.onElementSize);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      this.events.off();
    }

    /////////////////////////////////////////////////////////
    // Returns size of a ReflexElement
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getSize',
    value: function getSize(element) {

      var ref = this.refs[element.ref];

      var domElement = _reactDom2.default.findDOMNode(ref);

      switch (this.props.orientation) {

        case 'horizontal':
          return domElement.offsetHeight;

        case 'vertical':
          return domElement.offsetWidth;

        default:
          return 0;
      }
    }

    /////////////////////////////////////////////////////////
    // Computes offset from pointer position
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getOffset',
    value: function getOffset(event) {

      var pos = event.changedTouches ? event.changedTouches[0] : event;

      switch (this.props.orientation) {

        case 'horizontal':
          return pos.pageY - this.previousPos;

        case 'vertical':
          return pos.pageX - this.previousPos;
      }
    }

    /////////////////////////////////////////////////////////
    // Handles splitter startResize event
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onSplitterStartResize',
    value: function onSplitterStartResize(data) {

      var pos = data.event.changedTouches ? data.event.changedTouches[0] : data.event;

      switch (this.props.orientation) {

        case 'horizontal':
          document.body.style.cursor = 'row-resize';
          this.previousPos = pos.pageY;
          break;

        case 'vertical':
          document.body.style.cursor = 'col-resize';
          this.previousPos = pos.pageX;
          break;
      }

      var idx = data.splitter.props.index;

      this.elements = [this.children[idx - 1], this.children[idx + 1]];

      this.emitElementsEvent(this.elements, 'onStartResize');

      this.emitEvent('onStartResize');
    }

    /////////////////////////////////////////////////////////
    // Handles splitter resize event
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onSplitterResize',
    value: function onSplitterResize(data) {
      var _this2 = this;

      var idx = data.splitter.props.index;

      var offset = this.getOffset(data.event);

      var availableOffset = this.computeAvailableOffset(idx, offset);

      if (availableOffset) {

        var pos = data.event.changedTouches ? data.event.changedTouches[0] : data.event;

        switch (this.props.orientation) {

          case 'horizontal':
            this.previousPos = pos.pageY;
            break;

          case 'vertical':
            this.previousPos = pos.pageX;
            break;
        }

        this.elements = this.dispatchOffset(idx, availableOffset);

        this.adjustFlex(this.elements);

        this.setState(this.state, function () {

          _this2.emitElementsEvent(_this2.elements, 'onResize');

          _this2.emitEvent('onResize');

          //this.elements.forEach((element)=>{
          //
          //  const ref = this.refs[element.ref]
          //
          //  ref.forceUpdate()
          //})
        });
      }
    }

    /////////////////////////////////////////////////////////
    // Handles splitter stopResize event
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onSplitterStopResize',
    value: function onSplitterStopResize(data) {

      document.body.style.cursor = 'auto';

      this.emitElementsEvent(this.children, 'onStopResize');

      this.emitEvent('onStopResize');
    }

    /////////////////////////////////////////////////////////
    // Handles element size modified event
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onElementSize',
    value: function onElementSize(data) {
      var _this3 = this;

      return new Promise(function (resolve) {

        var idx = data.element.props.index;

        var size = _this3.getSize(_this3.children[idx]);

        var offset = data.size - size;

        var dir = data.direction;

        var splitterIdx = idx + dir;

        var availableOffset = _this3.computeAvailableOffset(splitterIdx, dir * offset);

        _this3.elements = null;

        if (availableOffset) {

          _this3.elements = _this3.dispatchOffset(splitterIdx, availableOffset);

          _this3.adjustFlex(_this3.elements);
        }

        _this3.setState(_this3.state, function () {

          _this3.emitElementsEvent(_this3.elements, 'onResize');

          _this3.emitEvent('onResize');

          resolve();
        });
      });
    }

    /////////////////////////////////////////////////////////
    // Adjusts flex after a dispatch to make sure
    // total flex of modified elements remains the same
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'adjustFlex',
    value: function adjustFlex(elements) {
      var _this4 = this;

      var diffFlex = elements.reduce(function (sum, element) {

        var idx = element.props.index;

        var previousFlex = element.props.flex;

        var nextFlex = _this4.state.flexData[idx].flex;

        return sum + (previousFlex - nextFlex) / elements.length;
      }, 0);

      elements.forEach(function (element) {
        _this4.state.flexData[element.props.index].flex += diffFlex;
      });
    }

    /////////////////////////////////////////////////////////
    // Returns available offset for a given raw offset value
    // This checks how much the panes can be stretched and
    // shrink, then returns the min
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'computeAvailableOffset',
    value: function computeAvailableOffset(idx, offset) {

      var stretch = this.computeAvailableStretch(idx, offset);

      var shrink = this.computeAvailableShrink(idx, offset);

      var availableOffset = Math.min(stretch, shrink) * Math.sign(offset);

      return availableOffset;
    }

    /////////////////////////////////////////////////////////
    // Returns true if the next splitter than the one at idx
    // can propagate the drag. This can happen if that
    // next element is actually a splitter and it has
    // propagate=true property set
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'checkPropagate',
    value: function checkPropagate(idx, direction) {

      if (direction > 0) {

        if (idx < this.children.length - 2) {

          var child = this.children[idx + 2];

          var typeCheck = child.type === _reflexSplitter2.default;

          return typeCheck && child.props.propagate;
        }
      } else {

        if (idx > 2) {

          var _child = this.children[idx - 2];

          var _typeCheck = _child.type === _reflexSplitter2.default;

          return _typeCheck && _child.props.propagate;
        }
      }

      return false;
    }

    /////////////////////////////////////////////////////////
    // Recursively computes available stretch at splitter
    // idx for given raw offset
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'computeAvailableStretch',
    value: function computeAvailableStretch(idx, offset) {

      var childIdx = offset < 0 ? idx + 1 : idx - 1;

      var child = this.children[childIdx];

      var size = this.getSize(child);

      var maxSize = child.props.maxSize;

      var availableStretch = maxSize - size;

      if (availableStretch < Math.abs(offset)) {

        if (this.checkPropagate(idx, -1 * offset)) {

          var nextOffset = Math.sign(offset) * (Math.abs(offset) - availableStretch);

          return availableStretch + this.computeAvailableStretch(offset < 0 ? idx + 2 : idx - 2, nextOffset);
        }
      }

      return Math.min(availableStretch, Math.abs(offset));
    }

    /////////////////////////////////////////////////////////
    // Recursively computes available shrink at splitter
    // idx for given raw offset
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'computeAvailableShrink',
    value: function computeAvailableShrink(idx, offset) {

      var childIdx = offset > 0 ? idx + 1 : idx - 1;

      var child = this.children[childIdx];

      var size = this.getSize(child);

      var minSize = child.props.minSize;

      var availableShrink = size - minSize;

      if (availableShrink < Math.abs(offset)) {

        if (this.checkPropagate(idx, offset)) {

          var nextOffset = Math.sign(offset) * (Math.abs(offset) - availableShrink);

          return availableShrink + this.computeAvailableShrink(offset > 0 ? idx + 2 : idx - 2, nextOffset);
        }
      }

      return Math.min(availableShrink, Math.abs(offset));
    }

    /////////////////////////////////////////////////////////
    // Currently not used, causes a wacky behavior ...
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'computePixelFlex',
    value: function computePixelFlex() {

      var domElement = _reactDom2.default.findDOMNode(this);

      var parent = domElement.parentNode;

      switch (this.props.orientation) {

        case 'horizontal':

          return 1.0 / parent.offsetHeight;

        case 'vertical':

          return 1.0 / parent.offsetWidth;

        default:

          return 0;
      }
    }

    /////////////////////////////////////////////////////////
    // Adds offset to a given ReflexElement
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'addOffset',
    value: function addOffset(element, offset) {

      var size = this.getSize(element);

      if (size) {

        var idx = element.props.index;

        var newSize = size + offset;

        this.state.flexData[idx].flex *= newSize / size;
      }
    }

    /////////////////////////////////////////////////////////
    // Recursively dispatches stretch offset across
    // children elements starting at splitter idx
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'dispatchStretch',
    value: function dispatchStretch(idx, offset) {

      var childIdx = offset < 0 ? idx + 1 : idx - 1;

      var child = this.children[childIdx];

      var size = this.getSize(child);

      var newSize = Math.min(child.props.maxSize, size + Math.abs(offset));

      var dispatchedStretch = newSize - size;

      this.addOffset(child, dispatchedStretch);

      if (dispatchedStretch < Math.abs(offset)) {

        var nextIdx = idx - Math.sign(offset) * 2;

        var nextOffset = Math.sign(offset) * (Math.abs(offset) - dispatchedStretch);

        return [child].concat(_toConsumableArray(this.dispatchStretch(nextIdx, nextOffset)));
      }

      return [child];
    }

    /////////////////////////////////////////////////////////
    // Recursively dispatches shrink offset across
    // children elements starting at splitter idx
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'dispatchShrink',
    value: function dispatchShrink(idx, offset) {

      var childIdx = offset > 0 ? idx + 1 : idx - 1;

      var child = this.children[childIdx];

      var size = this.getSize(child);

      var newSize = Math.max(child.props.minSize, size - Math.abs(offset));

      var dispatchedShrink = newSize - size;

      this.addOffset(child, dispatchedShrink);

      if (Math.abs(dispatchedShrink) < Math.abs(offset)) {

        var nextIdx = idx + Math.sign(offset) * 2;

        var nextOffset = Math.sign(offset) * (Math.abs(offset) + dispatchedShrink);

        return [child].concat(_toConsumableArray(this.dispatchShrink(nextIdx, nextOffset)));
      }

      return [child];
    }

    /////////////////////////////////////////////////////////
    // Dispatch offset at splitter idx
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'dispatchOffset',
    value: function dispatchOffset(idx, offset) {

      return [].concat(_toConsumableArray(this.dispatchStretch(idx, offset)), _toConsumableArray(this.dispatchShrink(idx, offset)));
    }

    /////////////////////////////////////////////////////////
    // Emits given if event if present in the component props
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'emitEvent',
    value: function emitEvent(event) {

      if (this.props[event]) {

        this.props[event]({
          domElement: _reactDom2.default.findDOMNode(this),
          component: this
        });
      }
    }

    /////////////////////////////////////////////////////////
    // Emits given if event for each given element
    // if present in the component props
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'emitElementsEvent',
    value: function emitElementsEvent(elements, event) {
      var _this5 = this;

      this.toArray(elements).forEach(function (element) {

        if (element.props[event]) {

          var ref = _this5.refs[element.ref];

          element.props[event]({
            domElement: _reactDom2.default.findDOMNode(ref),
            component: element
          });
        }
      });
    }

    /////////////////////////////////////////////////////////
    // Computes initial flex data based on provided flex
    // properties. By default each ReflexElement gets
    // evenly arranged within its container
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getInitialFlexData',
    value: function getInitialFlexData() {
      var _this6 = this;

      var nbElements = 0;

      if (!this.props.children) {

        return [];
      }

      var children = this.toArray(this.props.children);

      var flexValues = children.map(function (child) {

        if (child.type !== _reflexSplitter2.default && !child.props.flex) {

          ++nbElements;
        }

        return child.props ? child.props.flex || 0 : 0;
      });

      var remainingFlex = 1;

      flexValues.forEach(function (flex) {

        remainingFlex -= flex;
      });

      return children.map(function (child, idx) {

        if (child.type !== _reflexSplitter2.default) {

          return {
            guid: child.props.ref || _this6.guid(),
            flex: flexValues[idx] || remainingFlex / nbElements
          };
        }

        return { flex: 0 };
      });
    }

    /////////////////////////////////////////////////////////
    // Utility method that generates a new unique GUID
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'guid',
    value: function guid() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'xxxxxxxxxxxx';


      var d = new Date().getTime();

      return format.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : r & 0x7 | 0x8).toString(16);
      });
    }

    /////////////////////////////////////////////////////////
    // Utility method to ensure given argument is
    // returned as an array
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'toArray',
    value: function toArray(obj) {

      return obj ? Array.isArray(obj) ? obj : [obj] : [];
    }

    /////////////////////////////////////////////////////////
    // Render container. This will clone all original child
    // components in order to pass some internal properties
    // used to handle resizing logic
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var classNames = ['reflex-layout', 'reflex-container', this.props.orientation].concat(_toConsumableArray(this.props.className.split(' ')));

      this.children = _react2.default.Children.map(this.props.children, function (child, idx) {

        var flexData = _this7.state.flexData[idx];

        var newProps = Object.assign({}, child.props, {
          maxSize: child.props.maxSize || Number.MAX_VALUE,
          orientation: _this7.props.orientation,
          minSize: child.props.minSize || 1,
          events: _this7.events,
          flex: flexData.flex,
          ref: flexData.guid,
          index: idx
        });

        return _react2.default.cloneElement(child, newProps);
      });

      return _react2.default.createElement(
        'div',
        { className: classNames.join(' ') },
        this.children
      );
    }
  }]);

  return ReflexContainer;
}(_react2.default.Component);

ReflexContainer.propTypes = {
  orientation: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string
};
ReflexContainer.defaultProps = {
  orientation: 'horizontal',
  className: ''
};
exports.default = ReflexContainer;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } ///////////////////////////////////////////////////////////
// ReflexResizer
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////


var ReflexResizer = function (_React$Component) {
  _inherits(ReflexResizer, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexResizer() {
    _classCallCheck(this, ReflexResizer);

    var _this = _possibleConstructorReturn(this, (ReflexResizer.__proto__ || Object.getPrototypeOf(ReflexResizer)).call(this));

    _this.state = {
      style: {}
    };
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  _createClass(ReflexResizer, [{
    key: 'fillParent',
    value: function fillParent() {

      var domElement = _reactDom2.default.findDOMNode(this);

      var parent = domElement.parentNode;

      this.setState({
        style: {
          height: parent.offsetHeight,
          width: parent.offsetWidth
        }
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {

      this.fillParent();
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'render',
    value: function render() {

      var classNames = ['reflex-resizer'].concat(_toConsumableArray(this.props.className.split(' ')));

      var style = Object.assign({}, this.state.style, this.props.style);

      return _react2.default.createElement(
        'div',
        { className: classNames.join(' '), style: style },
        this.props.children
      );
    }
  }]);

  return ReflexResizer;
}(_react2.default.Component);

ReflexResizer.propTypes = {
  className: _react2.default.PropTypes.string
};
ReflexResizer.defaultProps = {
  className: ''
};
exports.default = ReflexResizer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(10)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./reflex-styles.scss", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./reflex-styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

///////////////////////////////////////////////////////////
// ReflexEvents
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
var ReflexEvents = function () {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexEvents() {
    _classCallCheck(this, ReflexEvents);

    this._events = {};
  }

  /////////////////////////////////////////////////////////
  // Supports multiple events space-separated
  //
  /////////////////////////////////////////////////////////


  _createClass(ReflexEvents, [{
    key: 'on',
    value: function on(events, fct) {
      var _this = this;

      events.split(' ').forEach(function (event) {

        _this._events[event] = _this._events[event] || [];
        _this._events[event].push(fct);
      });

      return this;
    }

    /////////////////////////////////////////////////////////
    // Supports multiple events space-separated
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'off',
    value: function off(events, fct) {
      var _this2 = this;

      if (events == undefined) {

        this._events = {};
        return;
      }

      events.split(' ').forEach(function (event) {

        if (event in _this2._events === false) return;

        if (fct) {

          _this2._events[event].splice(_this2._events[event].indexOf(fct), 1);
        } else {

          _this2._events[event] = [];
        }
      });

      return this;
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'emit',
    value: function emit(event /* , args... */) {

      if (this._events[event] === undefined) return;

      var tmpArray = this._events[event].slice();

      for (var i = 0; i < tmpArray.length; ++i) {

        var result = tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1));

        if (result !== undefined) {

          return result;
        }
      }

      return undefined;
    }
  }]);

  return ReflexEvents;
}();

exports.default = ReflexEvents;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)();
// imports


// module
exports.push([module.i, ".reflex-layout.reflex-container {\n  justify-content: flex-start;\n  /* align items in Main Axis */\n  align-items: stretch;\n  /* align items in Cross Axis */\n  align-content: stretch;\n  display: -webkit-box;\n  /* OLD - iOS 6-, Safari 3.1-6 */\n  display: -moz-box;\n  /* OLD - Firefox 19- (buggy but mostly works) */\n  display: -ms-flexbox;\n  /* TWEENER - IE 10 */\n  display: -webkit-flex;\n  /* NEW - Chrome */\n  display: flex;\n  height: 100%;\n  width: 100%; }\n\n.reflex-layout.reflex-container.horizontal {\n  flex-direction: column; }\n\n.reflex-layout.reflex-container.vertical {\n  flex-direction: row; }\n\n.reflex-layout > .reflex-element {\n  overflow: auto;\n  height: 100%;\n  width: 100%; }\n\n.reflex-layout > .reflex-splitter {\n  background-color: #eeeeee;\n  z-index: 100; }\n\n.reflex-layout > .reflex-splitter:hover {\n  background-color: #c6c6c6;\n  transition: all 1s ease; }\n\n.reflex-layout.horizontal > .reflex-splitter {\n  border-bottom: 1px solid #c6c6c6;\n  border-top: 1px solid #c6c6c6;\n  cursor: row-resize;\n  width: 100%;\n  height: 2px; }\n\n.reflex-layout.horizontal > .reflex-splitter.mobile {\n  height: 6px; }\n\n.reflex-layout.horizontal > .reflex-splitter:hover {\n  border-bottom: 1px solid #eeeeee;\n  border-top: 1px solid #eeeeee;\n  transition: all 1s ease; }\n\n.reflex-layout.vertical > .reflex-splitter {\n  border-right: 1px solid #c6c6c6;\n  border-left: 1px solid #c6c6c6;\n  cursor: col-resize;\n  height: 100%;\n  width: 2px; }\n\n.reflex-layout.vertical > .reflex-splitter.mobile {\n  width: 6px; }\n\n.reflex-layout.vertical > .reflex-splitter:hover {\n  border-righ: 1px solid #eeeeee;\n  border-left: 1px solid #eeeeee;\n  transition: all 1s ease; }\n", ""]);

// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 10 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0;

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function createStyleElement() {
	var styleElement = document.createElement("style");
	var head = getHeadElement();
	styleElement.type = "text/css";
	head.appendChild(styleElement);
	return styleElement;
}

function createLinkElement() {
	var linkElement = document.createElement("link");
	var head = getHeadElement();
	linkElement.rel = "stylesheet";
	head.appendChild(linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement());
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement();
		update = updateLink.bind(null, styleElement);
		remove = function() {
			styleElement.parentNode.removeChild(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement();
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			styleElement.parentNode.removeChild(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _reflexContainer = __webpack_require__(4);

var _reflexContainer2 = _interopRequireDefault(_reflexContainer);

var _reflexSplitter = __webpack_require__(3);

var _reflexSplitter2 = _interopRequireDefault(_reflexSplitter);

var _reflexElement = __webpack_require__(2);

var _reflexElement2 = _interopRequireDefault(_reflexElement);

var _reflexResizer = __webpack_require__(5);

var _reflexResizer2 = _interopRequireDefault(_reflexResizer);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ReflexContainer: _reflexContainer2.default,
  ReflexSplitter: _reflexSplitter2.default,
  ReflexElement: _reflexElement2.default,
  ReflexResizer: _reflexResizer2.default
};

/***/ }
/******/ ]);
});
//# sourceMappingURL=index.js.map