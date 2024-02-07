"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _ReflexHandle = _interopRequireDefault(require("./ReflexHandle"));
var _utilities = require("./utilities");
var _lodash = _interopRequireDefault(require("lodash.throttle"));
var _reactMeasure = _interopRequireDefault(require("react-measure"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } ///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
var toArray = function toArray(obj) {
  return obj ? Array.isArray(obj) ? obj : [obj] : [];
};
var SizeAwareReflexElement = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(SizeAwareReflexElement, _React$Component);
  function SizeAwareReflexElement(props) {
    var _this;
    (0, _classCallCheck2.default)(this, SizeAwareReflexElement);
    _this = _callSuper(this, SizeAwareReflexElement, [props]);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onResize", function (rect) {
      var _this$props = _this.props,
        resizeHeight = _this$props.resizeHeight,
        resizeWidth = _this$props.resizeWidth;
      var _rect$bounds = rect.bounds,
        height = _rect$bounds.height,
        width = _rect$bounds.width;
      _this.setDimensions((0, _objectSpread2.default)({}, resizeHeight && {
        height: height
      }, resizeWidth && {
        width: width
      }));
    });
    _this.setDimensions = (0, _lodash.default)(function (dimensions) {
      _this.setState(dimensions);
    }, _this.props.propagateDimensionsRate / 1000);
    _this.state = {
      height: "100%",
      width: "100%"
    };
    return _this;
  }
  (0, _createClass2.default)(SizeAwareReflexElement, [{
    key: "renderChildren",
    value: function renderChildren() {
      var _this2 = this;
      var propagateDimensions = this.props.propagateDimensions;
      var validChildren = toArray(this.props.children).filter(function (child) {
        return !!child;
      });
      return _react.default.Children.map(validChildren, function (child) {
        if (_this2.props.withHandle || _ReflexHandle.default.isA(child)) {
          return _react.default.cloneElement(child, (0, _objectSpread2.default)({
            dimensions: propagateDimensions && _this2.state
          }, child.props, {
            index: _this2.props.index - 1,
            events: _this2.props.events
          }));
        }
        if (propagateDimensions) {
          return _react.default.cloneElement(child, (0, _objectSpread2.default)({}, child.props, {
            dimensions: _this2.state
          }));
        }
        return child;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      return /*#__PURE__*/_react.default.createElement(_reactMeasure.default, {
        bounds: true,
        onResize: this.onResize
      }, function (_ref) {
        var measureRef = _ref.measureRef;
        return /*#__PURE__*/_react.default.createElement("div", {
          ref: measureRef,
          className: "reflex-size-aware"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: _this3.state
        }, _this3.renderChildren()));
      });
    }
  }]);
  return SizeAwareReflexElement;
}(_react.default.Component);
var ReflexElement = /*#__PURE__*/function (_React$Component2) {
  (0, _inherits2.default)(ReflexElement, _React$Component2);
  function ReflexElement(props) {
    var _this4;
    (0, _classCallCheck2.default)(this, ReflexElement);
    _this4 = _callSuper(this, ReflexElement, [props]);
    _this4.state = {
      size: props.size
    };
    return _this4;
  }
  (0, _createClass2.default)(ReflexElement, [{
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(prevProps, prevState, snapshot) {
        var directions, _iterator, _step, direction;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(prevState.size !== this.state.size)) {
                _context.next = 19;
                break;
              }
              directions = toArray(this.props.direction);
              _iterator = _createForOfIteratorHelper(directions);
              _context.prev = 3;
              _iterator.s();
            case 5:
              if ((_step = _iterator.n()).done) {
                _context.next = 11;
                break;
              }
              direction = _step.value;
              _context.next = 9;
              return this.props.events.emit('element.size', {
                index: this.props.index,
                size: this.props.size,
                direction: direction
              });
            case 9:
              _context.next = 5;
              break;
            case 11:
              _context.next = 16;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](3);
              _iterator.e(_context.t0);
            case 16:
              _context.prev = 16;
              _iterator.f();
              return _context.finish(16);
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3, 13, 16, 19]]);
      }));
      function componentDidUpdate(_x, _x2, _x3) {
        return _componentDidUpdate.apply(this, arguments);
      }
      return componentDidUpdate;
    }()
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this5 = this;
      var validChildren = toArray(this.props.children).filter(function (child) {
        return !!child;
      });
      return _react.default.Children.map(validChildren, function (child) {
        if (_this5.props.withHandle || _ReflexHandle.default.isA(child)) {
          return _react.default.cloneElement(child, (0, _objectSpread2.default)({}, child.props, {
            index: _this5.props.index - 1,
            events: _this5.props.events
          }));
        }
        return child;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var className = [].concat((0, _toConsumableArray2.default)(this.props.className.split(' ')), [this.props.orientation, 'reflex-element']).join(' ').trim();
      var style = (0, _objectSpread2.default)({}, this.props.style, {
        flexGrow: this.props.flex,
        flexShrink: 1,
        flexBasis: '0%'
      });
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, (0, _utilities.getDataProps)(this.props), {
        ref: this.props.innerRef,
        className: className,
        style: style
      }), this.props.propagateDimensions ? /*#__PURE__*/_react.default.createElement(SizeAwareReflexElement, this.props) : this.renderChildren());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.size !== prevState.size) {
        return (0, _objectSpread2.default)({}, prevState, {
          size: nextProps.size
        });
      }
      return null;
    }
  }]);
  return ReflexElement;
}(_react.default.Component);
(0, _defineProperty2.default)(ReflexElement, "propTypes", {
  propagateDimensions: _propTypes.default.bool,
  resizeHeight: _propTypes.default.bool,
  resizeWidth: _propTypes.default.bool,
  className: _propTypes.default.string,
  size: _propTypes.default.number
});
(0, _defineProperty2.default)(ReflexElement, "defaultProps", {
  propagateDimensionsRate: 100,
  propagateDimensions: false,
  resizeHeight: true,
  resizeWidth: true,
  direction: [1],
  className: ''
});
var _default = exports.default = _react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(ReflexElement, (0, _extends2.default)({
    innerRef: ref
  }, props));
});