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

  function SizeAwareReflexElement(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SizeAwareReflexElement);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SizeAwareReflexElement).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onResize", function (rect) {
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
    }
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

  function ReflexElement(props) {
    var _this4;

    (0, _classCallCheck2.default)(this, ReflexElement);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ReflexElement).call(this, props));
    _this4.state = {
      size: props.size
    };
    return _this4;
  }

  (0, _createClass2.default)(ReflexElement, [{
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(prevProps, prevState, snapshot) {
        var directions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, direction;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(prevState.size !== this.state.size)) {
                  _context.next = 28;
                  break;
                }

                directions = this.toArray(this.props.direction);
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

                direction = _step.value;
                _context.next = 11;
                return this.props.events.emit('element.size', {
                  index: this.props.index,
                  size: this.props.size,
                  direction: direction
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
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 20:
                _context.prev = 20;
                _context.prev = 21;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
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
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 16, 20, 28], [21,, 23, 27]]);
      }));

      return function componentDidUpdate(_x, _x2, _x3) {
        return _componentDidUpdate.apply(this, arguments);
      };
    }()
  }, {
    key: "toArray",
    value: function toArray(obj) {
      return obj ? Array.isArray(obj) ? obj : [obj] : [];
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this5 = this;

      return _react.default.Children.map(this.props.children, function (child) {
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
      var className = (0, _toConsumableArray2.default)(this.props.className.split(' ')).concat([this.props.orientation, 'reflex-element']).join(' ').trim();
      var style = (0, _objectSpread2.default)({}, this.props.style, {
        flexGrow: this.props.flex,
        flexShrink: 1,
        flexBasis: '0%'
      });
      return _react.default.createElement("div", (0, _extends2.default)({}, (0, _utilities.getDataProps)(this.props), {
        ref: this.props.innerRef,
        className: className,
        style: style
      }), this.props.propagateDimensions ? _react.default.createElement(SizeAwareReflexElement, this.props) : this.renderChildren());
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
  renderOnResizeRate: _propTypes.default.number,
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

var _default = _react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(ReflexElement, (0, _extends2.default)({
    innerRef: ref
  }, props));
});

exports.default = _default;