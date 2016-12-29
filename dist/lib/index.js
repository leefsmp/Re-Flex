(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["re-flex"] = factory(require("react"), require("react-dom"));
	else
		root["re-flex"] = factory(root["React"], root["ReactDOM"]);
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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

  function ReflexElement() {
    _classCallCheck(this, ReflexElement);

    return _possibleConstructorReturn(this, (ReflexElement.__proto__ || Object.getPrototypeOf(ReflexElement)).apply(this, arguments));
  }

  _createClass(ReflexElement, [{
    key: 'render',


    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////
    value: function render() {

      var classNames = [].concat(_toConsumableArray(this.props.className.split(' ')), ['reflex-element']);

      var children = _react2.default.Children.map(this.props.children, function (child) {

        return child;
      });

      var style = Object.assign({}, this.props.style, {
        /* OLD - iOS 6-, Safari 3.1-6 */
        WebkitBoxFlex: this.props.flex,
        /* OLD - Firefox 19- */
        MozBoxFlex: this.props.flex,
        /* Chrome */
        WebkitFlex: this.props.flex,
        /* IE 10 */
        FlexElement: this.props.flex,
        flex: this.props.flex
      });

      return _react2.default.createElement(
        'div',
        { className: classNames.join(' '), style: style },
        children
      );
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

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

var _reflexEvents = __webpack_require__(4);

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

      this.document.addEventListener('mouseup', this.onMouseUp);

      this.document.addEventListener('mousemove', this.onMouseMove);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      this.document.removeEventListener('mouseup', this.onMouseUp);

      this.document.removeEventListener('mousemove', this.onMouseMove);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {

      if (this.state.active) {

        _reflexEvents2.default.emit('splitter.resize', {
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

      _reflexEvents2.default.emit('splitter.startResize', {
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

        _reflexEvents2.default.emit('splitter.stopResize', {
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

      var classNames = [].concat(_toConsumableArray(this.props.className.split(' ')), ['reflex-splitter']);

      return _react2.default.createElement('div', { className: classNames.join(' '),
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

/***/ },
/* 4 */
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

        if (result !== undefined) return result;
      }

      return undefined;
    }
  }]);

  return ReflexEvents;
}();

var events = new ReflexEvents();

exports.default = events;

/***/ },
/* 5 */
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

var _reflexEvents = __webpack_require__(4);

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
      flexData: _this.getInitialFlexData(),
      id: _this.guid()
    };

    _this.onResize = _this.onResize.bind(_this);

    _this.onSplitterStartResize = _this.onSplitterStartResize.bind(_this);

    _this.onSplitterStopResize = _this.onSplitterStopResize.bind(_this);

    _this.onSplitterResize = _this.onSplitterResize.bind(_this);
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

      _reflexEvents2.default.on('splitter.startResize', this.onSplitterStartResize);

      _reflexEvents2.default.on('splitter.stopResize', this.onSplitterStopResize);

      _reflexEvents2.default.on('splitter.resize', this.onSplitterResize);

      window.addEventListener('resize', this.onResize);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      window.removeEventListener('resize', this.onResize);

      _reflexEvents2.default.off('splitter.startResize', this.onSplitterStartResize);

      _reflexEvents2.default.off('splitter.stopResize', this.onSplitterStopResize);

      _reflexEvents2.default.off('splitter.resize', this.onSplitterResize);
    }

    /////////////////////////////////////////////////////////
    //
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
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onResize',
    value: function onResize() {

      if (this.props.updateOnWindowResize) {

        this.forceUpdate();
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onSplitterStartResize',
    value: function onSplitterStartResize(data) {

      var containerId = data.splitter.props.containerId;

      if (containerId === this.state.id) {

        switch (this.props.orientation) {

          case 'horizontal':
            document.body.style.cursor = 'row-resize';
            this.previousPos = data.event.pageY;
            break;

          case 'vertical':
            document.body.style.cursor = 'col-resize';
            this.previousPos = data.event.pageX;
            break;
        }

        var idx = data.splitter.props.index;

        var elements = [this.children[idx - 1], this.children[idx + 1]];

        this.fireEvent(elements, 'onStartResize');
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onSplitterStopResize',
    value: function onSplitterStopResize(data) {

      var containerId = data.splitter.props.containerId;

      if (containerId === this.state.id) {

        document.body.style.cursor = 'auto';

        this.fireEvent(this.children, 'onStopResize');
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getOffset',
    value: function getOffset(event) {

      switch (this.props.orientation) {

        case 'horizontal':
          return event.pageY - this.previousPos;

        case 'vertical':
          return event.pageX - this.previousPos;
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onSplitterResize',
    value: function onSplitterResize(data) {

      var containerId = data.splitter.props.containerId;

      if (containerId === this.state.id) {

        var idx = data.splitter.props.index;

        var offset = this.getOffset(data.event);

        var availableOffset = this.computeAvailableOffset(idx, offset);

        if (availableOffset !== 0) {

          switch (this.props.orientation) {

            case 'horizontal':
              this.previousPos = data.event.pageY;
              break;

            case 'vertical':
              this.previousPos = data.event.pageX;
              break;
          }

          var elements = this.dispatchOffset(idx, availableOffset);

          this.setState(this.state);

          this.fireEvent(elements, 'onResize');
        }
      }
    }

    /////////////////////////////////////////////////////////
    //
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
    //
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
    //
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
    //
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
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'addOffset',
    value: function addOffset(element, offset) {

      var size = this.getSize(element);

      var newSize = size + offset;

      var newFlex = this.computeNewFlex(element.props.flex, size, newSize);

      var idx = element.props.index;

      this.state.flexData[idx].flex = newFlex;
    }

    /////////////////////////////////////////////////////////
    //
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
    //
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
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'dispatchOffset',
    value: function dispatchOffset(idx, offset) {

      return [].concat(_toConsumableArray(this.dispatchStretch(idx, offset)), _toConsumableArray(this.dispatchShrink(idx, offset)));
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'fireEvent',
    value: function fireEvent(elements, event) {
      var _this2 = this;

      var elementsArray = Array.isArray(elements) ? elements : [elements];

      elementsArray.forEach(function (element) {

        if (element.props[event]) {

          var ref = _this2.refs[element.ref];

          element.props[event]({
            domElement: _reactDom2.default.findDOMNode(ref),
            component: element
          });
        }
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'computeNewFlex',
    value: function computeNewFlex(flex, size, newSize) {

      if (size === 0) {

        return 0;
      }

      return newSize * flex / size;
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getInitialFlexData',
    value: function getInitialFlexData() {
      var _this3 = this;

      var nbElements = 0;

      if (!this.props.children) {

        return [];
      }

      var children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];

      var flexValues = children.map(function (child) {

        if (child.type === _reflexElement2.default) {

          if (!child.props.flex) {

            ++nbElements;
          }
        }

        return child.props ? child.props.flex || 0 : 0;
      });

      var remainingFlex = 1;

      flexValues.forEach(function (flex) {

        remainingFlex -= flex;
      });

      return children.map(function (child, idx) {

        if (child.type === _reflexElement2.default) {

          return {
            guid: _this3.guid(),
            flex: flexValues[idx] || remainingFlex / nbElements
          };
        }

        return { flex: 0 };
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var classNames = [].concat(_toConsumableArray(this.props.className.split(' ')), ['reflex-layout', 'reflex-container', this.props.orientation]);

      this.children = _react2.default.Children.map(this.props.children, function (child, idx) {

        var flexData = _this4.state.flexData[idx];

        var newProps = Object.assign({}, child.props, {
          maxSize: child.props.maxSize || Number.MAX_VALUE,
          minSize: child.props.minSize || 1,
          containerId: _this4.state.id,
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

    /////////////////////////////////////////////////////////
    //
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
  }]);

  return ReflexContainer;
}(_react2.default.Component);

ReflexContainer.propTypes = {
  updateOnWindowResize: _react2.default.PropTypes.bool,
  orientation: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string
};
ReflexContainer.defaultProps = {
  updateOnWindowResize: false,
  orientation: 'horizontal',
  className: ''
};
exports.default = ReflexContainer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(9)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./reflex-layout.scss", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./reflex-layout.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, ".reflex-layout.reflex-container {\n  justify-content: flex-start;\n  /* align items in Main Axis */\n  align-items: stretch;\n  /* align items in Cross Axis */\n  align-content: stretch;\n  display: -webkit-box;\n  /* OLD - iOS 6-, Safari 3.1-6 */\n  display: -moz-box;\n  /* OLD - Firefox 19- (buggy but mostly works) */\n  display: -ms-flexbox;\n  /* TWEENER - IE 10 */\n  display: -webkit-flex;\n  /* NEW - Chrome */\n  display: flex;\n  height: 100%;\n  width: 100%; }\n\n.reflex-layout.reflex-container.horizontal {\n  flex-direction: column; }\n\n.reflex-layout.reflex-container.vertical {\n  flex-direction: row; }\n\n.reflex-layout > .reflex-element {\n  overflow: auto;\n  height: 100%;\n  width: 100%; }\n\n.reflex-layout > .reflex-splitter {\n  background-color: #dddddd; }\n\n.reflex-layout > .reflex-splitter:hover {\n  transition: all 1s ease;\n  background-color: #c6c6c6; }\n\n.reflex-layout.horizontal > .reflex-splitter {\n  cursor: row-resize;\n  width: 100%;\n  height: 3px; }\n\n.reflex-layout.vertical > .reflex-splitter {\n  cursor: col-resize;\n  height: 100%;\n  width: 3px; }\n", ""]);

// exports


/***/ },
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _reflexContainer = __webpack_require__(5);

var _reflexContainer2 = _interopRequireDefault(_reflexContainer);

var _reflexSplitter = __webpack_require__(3);

var _reflexSplitter2 = _interopRequireDefault(_reflexSplitter);

var _reflexElement = __webpack_require__(2);

var _reflexElement2 = _interopRequireDefault(_reflexElement);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ReflexContainer: _reflexContainer2.default,
  ReflexSplitter: _reflexSplitter2.default,
  ReflexElement: _reflexElement2.default
};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map