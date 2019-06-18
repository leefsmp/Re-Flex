"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ReflexHandle = _interopRequireDefault(require("./ReflexHandle"));

var _utilities = require("./utilities");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _reactMeasure = _interopRequireDefault(require("react-measure"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
var SizeAwareReflexElement =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(SizeAwareReflexElement, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function SizeAwareReflexElement(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SizeAwareReflexElement);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SizeAwareReflexElement).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onResize", function (rect) {
      var _this$props = _this.props,
          resizeHeight = _this$props.resizeHeight,
          resizeWidth = _this$props.resizeWidth;
      var height = Math.floor(rect.bounds.height);
      var width = Math.floor(rect.bounds.width);

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
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  (0, _createClass2.default)(SizeAwareReflexElement, [{
    key: "renderChildren",
    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////
    value: function renderChildren() {
      var _this2 = this;

      var propagateDimensions = this.props.propagateDimensions;
      return _react.default.Children.map(this.props.children, function (child) {
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
    } /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement(_reactMeasure.default, {
        bounds: true,
        onResize: this.onResize
      }, function (_ref) {
        var measureRef = _ref.measureRef;
        return _react.default.createElement("div", {
          ref: measureRef,
          className: "reflex-size-aware"
        }, _react.default.createElement("div", {
          style: _this3.state
        }, _this3.renderChildren()));
      });
    }
  }]);
  return SizeAwareReflexElement;
}(_react.default.Component);

var ReflexElement =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(ReflexElement, _React$Component2);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexElement(props) {
    var _this4;

    (0, _classCallCheck2.default)(this, ReflexElement);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ReflexElement).call(this, props));
    _this4.state = {
      events: props.events,
      size: props.size
    };
    return _this4;
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  (0, _createClass2.default)(ReflexElement, [{
    key: "setStateAsync",
    value: function setStateAsync(state) {
      var _this5 = this;

      return new Promise(function (resolve) {
        _this5.setState(state, function () {
          return resolve();
        });
      });
    } /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "componentWillReceiveProps",
    value: function () {
      var _componentWillReceiveProps = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(props) {
        var directions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dir;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(props.size !== this.state.size)) {
                  _context.next = 30;
                  break;
                }

                _context.next = 3;
                return this.setStateAsync({
                  size: props.size
                });

              case 3:
                directions = this.toArray(props.direction);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 7;
                _iterator = directions[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 16;
                  break;
                }

                dir = _step.value;
                _context.next = 13;
                return this.state.events.emit('element.size', {
                  index: props.index,
                  size: props.size,
                  direction: dir
                });

              case 13:
                _iteratorNormalCompletion = true;
                _context.next = 9;
                break;

              case 16:
                _context.next = 22;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](7);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 22:
                _context.prev = 22;
                _context.prev = 23;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 25:
                _context.prev = 25;

                if (!_didIteratorError) {
                  _context.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context.finish(25);

              case 29:
                return _context.finish(22);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 18, 22, 30], [23,, 25, 29]]);
      }));

      return function componentWillReceiveProps(_x) {
        return _componentWillReceiveProps.apply(this, arguments);
      };
    }() /////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////
    // static getDerivedStateFromProps (nextProps, prevState) {
    //  TODO: implement when migrating to React 16+
    // }
    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "toArray",
    value: function toArray(obj) {
      return obj ? Array.isArray(obj) ? obj : [obj] : [];
    } /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this6 = this;

      return _react.default.Children.map(this.props.children, function (child) {
        if (_this6.props.withHandle || _ReflexHandle.default.isA(child)) {
          return _react.default.cloneElement(child, (0, _objectSpread2.default)({}, child.props, {
            index: _this6.props.index - 1,
            events: _this6.state.events
          }));
        }

        return child;
      });
    } /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "render",
    value: function render() {
      var className = (0, _toConsumableArray2.default)(this.props.className.split(' ')).concat([this.props.orientation, 'reflex-element']).join(' ').trim();
      var style = (0, _objectSpread2.default)({}, this.props.style, {
        flex: this.props.flex
      });
      return _react.default.createElement("div", (0, _extends2.default)({}, (0, _utilities.getDataProps)(this.props), {
        className: className,
        style: style
      }), this.props.propagateDimensions ? _react.default.createElement(SizeAwareReflexElement, this.props) : this.renderChildren());
    }
  }]);
  return ReflexElement;
}(_react.default.Component);

exports.default = ReflexElement;
(0, _defineProperty2.default)(ReflexElement, "propTypes", {
  renderOnResizeRate: _propTypes.default.number,
  propagateDimensions: _propTypes.default.bool,
  resizeHeight: _propTypes.default.bool,
  resizeWidth: _propTypes.default.bool,
  className: _propTypes.default.string,
  size: _propTypes.default.number /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////

});
(0, _defineProperty2.default)(ReflexElement, "defaultProps", {
  propagateDimensionsRate: 100,
  propagateDimensions: false,
  resizeHeight: true,
  resizeWidth: true,
  direction: [1],
  className: '' /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////

});