"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _utilities = require("./utilities");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } ///////////////////////////////////////////////////////////
// ReflexHandle
// By Philippe Leefsma
// June 2018
//
///////////////////////////////////////////////////////////
var ReflexHandle = exports.default = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ReflexHandle, _React$Component);
  function ReflexHandle(props) {
    var _this;
    (0, _classCallCheck2.default)(this, ReflexHandle);
    _this = _callSuper(this, ReflexHandle, [props]);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "ref", _react.default.createRef());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseMove", function (event) {
      if (_this.state.active) {
        var domElement = _this.ref.current;
        _this.props.events.emit('resize', {
          index: _this.props.index,
          domElement: domElement,
          event: event
        });
        if (_this.props.onResize) {
          _this.props.onResize({
            component: (0, _assertThisInitialized2.default)(_this),
            domElement: domElement
          });
        }
        event.stopPropagation();
        event.preventDefault();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseDown", function (event) {
      _this.setState({
        active: true
      });
      if (_this.props.onStartResize) {
        // cancels resize from controller
        // if needed by returning true
        // to onStartResize
        if (_this.props.onStartResize({
          domElement: _this.ref.current,
          component: (0, _assertThisInitialized2.default)(_this)
        })) {
          return;
        }
      }
      _this.props.events.emit('startResize', {
        index: _this.props.index,
        event: event
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMouseUp", function (event) {
      if (_this.state.active) {
        _this.setState({
          active: false
        });
        if (_this.props.onStopResize) {
          _this.props.onStopResize({
            domElement: _this.ref.current,
            component: (0, _assertThisInitialized2.default)(_this)
          });
        }
        _this.props.events.emit('stopResize', {
          index: _this.props.index,
          event: event
        });
      }
    });
    _this.state = {
      active: false
    };
    _this.document = props.document;
    return _this;
  }
  (0, _createClass2.default)(ReflexHandle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.document) {
        return;
      }
      this.document.addEventListener('touchend', this.onMouseUp);
      this.document.addEventListener('mouseup', this.onMouseUp);
      this.document.addEventListener('mousemove', this.onMouseMove, {
        passive: false
      });
      this.document.addEventListener('touchmove', this.onMouseMove, {
        passive: false
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.document) {
        return;
      }
      this.document.removeEventListener('mouseup', this.onMouseUp);
      this.document.removeEventListener('touchend', this.onMouseUp);
      this.document.removeEventListener('mousemove', this.onMouseMove);
      this.document.removeEventListener('touchmove', this.onMouseMove);
      if (this.state.active) {
        this.props.events.emit('stopResize', {
          index: this.props.index,
          event: null
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = [].concat((0, _toConsumableArray2.default)(this.props.className.split(' ')), [this.state.active ? 'active' : '', 'reflex-handle']).join(' ').trim();
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, (0, _utilities.getDataProps)(this.props), {
        onTouchStart: this.onMouseDown,
        onMouseDown: this.onMouseDown,
        style: this.props.style,
        className: className,
        id: this.props.id,
        ref: this.ref
      }), this.props.children);
    }
  }], [{
    key: "isA",
    value: function isA(element) {
      var _element$props;
      if (!element) {
        return false;
      }
      return (process.env.NODE_ENV === 'development' ? element.type === /*#__PURE__*/_react.default.createElement(ReflexHandle, null).type : element.type === ReflexHandle) || element.name === 'reflex-handle' || ((_element$props = element.props) === null || _element$props === void 0 ? void 0 : _element$props.name) === 'reflex-handle';
    }
  }]);
  return ReflexHandle;
}(_react.default.Component);
(0, _defineProperty2.default)(ReflexHandle, "propTypes", {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  onStartResize: _propTypes.default.func,
  onStopResize: _propTypes.default.func,
  className: _propTypes.default.string,
  propagate: _propTypes.default.bool,
  onResize: _propTypes.default.func,
  style: _propTypes.default.object
});
(0, _defineProperty2.default)(ReflexHandle, "defaultProps", {
  document: typeof document === 'undefined' ? null : document,
  onStartResize: null,
  onStopResize: null,
  propagate: false,
  onResize: null,
  className: '',
  style: {}
});