(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["re-flex"] = factory(require("react"), require("react-dom"));
	else
		root["re-flex"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _reflexContainer = __webpack_require__(5);
	
	var _reflexContainer2 = _interopRequireDefault(_reflexContainer);
	
	var _reflexSplitter = __webpack_require__(6);
	
	var _reflexSplitter2 = _interopRequireDefault(_reflexSplitter);
	
	var _reflexElement = __webpack_require__(3);
	
	var _reflexElement2 = _interopRequireDefault(_reflexElement);
	
	__webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  ReflexContainer: _reflexContainer2.default,
	  ReflexSplitter: _reflexSplitter2.default,
	  ReflexElement: _reflexElement2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	        WebkitBoxFlex: this.props.flex, /* OLD - iOS 6-, Safari 3.1-6 */
	        MozBoxFlex: this.props.flex, /* OLD - Firefox 19- */
	        WebkitFlex: this.props.flex, /* Chrome */
	        FlexElement: this.props.flex, /* IE 10 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _events = __webpack_require__(9);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var events = new _events2.default.EventEmitter();
	exports.default = events;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _reflexElement = __webpack_require__(3);
	
	var _reflexElement2 = _interopRequireDefault(_reflexElement);
	
	var _reflexEvents = __webpack_require__(4);
	
	var _reflexEvents2 = _interopRequireDefault(_reflexEvents);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	      window.addEventListener('resize', this.onResize);
	
	      _reflexEvents2.default.on('splitter.startResize', this.onSplitterStartResize);
	
	      _reflexEvents2.default.on('splitter.stopResize', this.onSplitterStopResize);
	
	      _reflexEvents2.default.on('splitter.resize', this.onSplitterResize);
	    }
	
	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	
	      window.removeEventListener('resize', this.onResize);
	
	      _reflexEvents2.default.removeListener('splitter.startResize', this.onSplitterStartResize);
	
	      _reflexEvents2.default.removeListener('splitter.stopResize', this.onSplitterStopResize);
	
	      _reflexEvents2.default.removeListener('splitter.resize', this.onSplitterResize);
	    }
	
	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	
	  }, {
	    key: 'getSizeAt',
	    value: function getSizeAt(idx) {
	
	      var ref = this.refs[this.state.flexData[idx].guid];
	
	      var domElement = _reactDom2.default.findDOMNode(ref);
	
	      return {
	        x: domElement.offsetWidth,
	        y: domElement.offsetHeight
	      };
	    }
	
	    ///////////////////////////////////////////////////////////////////
	    //
	    //
	    ///////////////////////////////////////////////////////////////////
	
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	
	      this.forceUpdate();
	    }
	
	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	
	  }, {
	    key: 'onSplitterStartResize',
	    value: function onSplitterStartResize(data) {
	
	      if (data.splitter.props.containerId === this.state.id) {
	
	        this.previousPos = {
	          x: data.event.pageX,
	          y: data.event.pageY
	        };
	
	        switch (this.props.orientation) {
	
	          case 'horizontal':
	
	            document.body.style.cursor = 'row-resize';
	            break;
	
	          case 'vertical':
	
	            document.body.style.cursor = 'col-resize';
	            break;
	        }
	
	        var idx = data.splitter.props.index;
	
	        this.fireEvent(idx, 'onStartResize');
	      }
	    }
	
	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	
	  }, {
	    key: 'onSplitterStopResize',
	    value: function onSplitterStopResize(data) {
	
	      if (data.splitter.props.containerId === this.state.id) {
	
	        var idx = data.splitter.props.index;
	
	        document.body.style.cursor = 'auto';
	
	        this.fireEvent(idx, 'onStopResize');
	      }
	    }
	
	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	
	  }, {
	    key: 'onSplitterResize',
	    value: function onSplitterResize(data) {
	
	      if (data.splitter.props.containerId === this.state.id) {
	
	        var idx = data.splitter.props.index;
	
	        var size1 = this.getSizeAt(idx - 1);
	
	        var offset = {
	          x: data.event.pageX - this.previousPos.x,
	          y: data.event.pageY - this.previousPos.y
	        };
	
	        this.previousPos = {
	          x: data.event.pageX,
	          y: data.event.pageY
	        };
	
	        var newSize1 = {
	          x: Math.max(size1.x + offset.x, 1),
	          y: Math.max(size1.y + offset.y, 1)
	        };
	
	        var size2 = this.getSizeAt(idx - 1);
	
	        var newSize2 = {
	          x: Math.max(size2.x - offset.x, 1),
	          y: Math.max(size2.y - offset.y, 1)
	        };
	
	        if (this.validateSizeAt(idx - 1, newSize1) && this.validateSizeAt(idx + 1, newSize2)) {
	
	          var flex = this.state.flexData[idx - 1].flex;
	
	          var newFlex = this.computeNewFlex(this.state.flexData[idx - 1].flex, size1, newSize1);
	
	          this.state.flexData[idx - 1] = Object.assign({}, this.state.flexData[idx - 1], {
	            flex: newFlex
	          });
	
	          this.state.flexData[idx + 1] = Object.assign({}, this.state.flexData[idx + 1], {
	            flex: this.state.flexData[idx + 1].flex - (newFlex - flex)
	          });
	
	          this.setState(Object.assign({}, this.state, {
	            flexData: this.state.flexData
	          }));
	
	          this.fireEvent(idx, 'onResize');
	        }
	      }
	    }
	
	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	
	  }, {
	    key: 'fireEvent',
	    value: function fireEvent(idx, event) {
	
	      var child1 = this.children[idx - 1];
	
	      if (child1 && child1.props[event]) {
	
	        var ref = this.refs[child1.ref];
	
	        child1.props[event]({
	          domElement: _reactDom2.default.findDOMNode(ref),
	          component: child1
	        });
	      }
	
	      var child2 = this.children[idx + 1];
	
	      if (child2 && child2.props[event]) {
	
	        var _ref = this.refs[child2.ref];
	
	        child2.props[event]({
	          domElement: _reactDom2.default.findDOMNode(_ref),
	          component: child2
	        });
	      }
	    }
	
	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	
	  }, {
	    key: 'computeNewFlex',
	    value: function computeNewFlex(flex, size, newSize) {
	
	      switch (this.props.orientation) {
	
	        case 'horizontal':
	
	          return newSize.y * flex / size.y;
	
	        case 'vertical':
	
	          if (size.x === 0) {
	
	            return 0;
	          }
	
	          return newSize.x * flex / size.x;
	
	        default:
	
	          return 0;
	      }
	    }
	
	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	
	  }, {
	    key: 'validateSizeAt',
	    value: function validateSizeAt(idx, size) {
	
	      var child = this.props.children[idx];
	
	      switch (this.props.orientation) {
	
	        case 'horizontal':
	
	          if (child.props.minSize && size.y < child.props.minSize) {
	
	            return false;
	          }
	
	          if (child.props.maxSize && size.y > child.props.maxSize) {
	
	            return false;
	          }
	
	        case 'vertical':
	
	          if (child.props.minSize && size.x < child.props.minSize) {
	
	            return false;
	          }
	
	          if (child.props.maxSize && size.x > child.props.maxSize) {
	
	            return false;
	          }
	      }
	
	      return true;
	    }
	
	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	
	  }, {
	    key: 'getInitialFlexData',
	    value: function getInitialFlexData() {
	      var _this2 = this;
	
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
	            guid: _this2.guid(),
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
	      var _this3 = this;
	
	      var classNames = [].concat(_toConsumableArray(this.props.className.split(' ')), ['reflex-layout', 'reflex-container', this.props.orientation]);
	
	      this.children = _react2.default.Children.map(this.props.children, function (child, idx) {
	
	        var flexData = _this3.state.flexData[idx];
	
	        var newProps = Object.assign({}, child.props, {
	          containerId: _this3.state.id,
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
	  orientation: _react2.default.PropTypes.string,
	  className: _react2.default.PropTypes.string
	};
	ReflexContainer.defaultProps = {
	  orientation: 'horizontal',
	  className: ''
	};
	exports.default = ReflexContainer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _reflexEvents = __webpack_require__(4);
	
	var _reflexEvents2 = _interopRequireDefault(_reflexEvents);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	    _this.document = props.document;
	
	    _this.onMouseMove = _this.onMouseMove.bind(_this);
	    _this.onMouseDown = _this.onMouseDown.bind(_this);
	    _this.onMouseUp = _this.onMouseUp.bind(_this);
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
	
	        if (this.props.onResize) {
	
	          this.props.onResize();
	        }
	
	        _reflexEvents2.default.emit('splitter.resize', {
	          splitter: this,
	          event: event
	        });
	
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
	
	        this.props.onStartResize(event);
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
	  onEndResize: _react2.default.PropTypes.func,
	  onResize: _react2.default.PropTypes.func,
	  className: _react2.default.PropTypes.string
	};
	ReflexSplitter.defaultProps = {
	  className: '',
	  document: document
	};
	exports.default = ReflexSplitter;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".reflex-layout.reflex-container {\n  justify-content: flex-start;\n  /* align items in Main Axis */\n  align-items: stretch;\n  /* align items in Cross Axis */\n  align-content: stretch;\n  display: -webkit-box;\n  /* OLD - iOS 6-, Safari 3.1-6 */\n  display: -moz-box;\n  /* OLD - Firefox 19- (buggy but mostly works) */\n  display: -ms-flexbox;\n  /* TWEENER - IE 10 */\n  display: -webkit-flex;\n  /* NEW - Chrome */\n  display: flex;\n  height: 100%;\n  width: 100%; }\n\n.reflex-layout.reflex-container.horizontal {\n  flex-direction: column; }\n\n.reflex-layout.reflex-container.vertical {\n  flex-direction: row; }\n\n.reflex-layout > .reflex-element {\n  overflow: auto;\n  height: 100%;\n  width: 100%; }\n\n.reflex-layout > .reflex-splitter {\n  background-color: #dddddd; }\n\n.reflex-layout > .reflex-splitter:hover {\n  transition: all 1s ease;\n  background-color: #c6c6c6; }\n\n.reflex-layout.horizontal > .reflex-splitter {\n  cursor: row-resize;\n  width: 100%;\n  height: 3px; }\n\n.reflex-layout.vertical > .reflex-splitter {\n  cursor: col-resize;\n  height: 100%;\n  width: 3px; }\n", ""]);
	
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

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

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
		if(false) {
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

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map