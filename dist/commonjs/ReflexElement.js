'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Browser = require('./Browser');

var _Browser2 = _interopRequireDefault(_Browser);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
var ReflexElement = function (_React$Component) {
  (0, _inherits3.default)(ReflexElement, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexElement(props) {
    (0, _classCallCheck3.default)(this, ReflexElement);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReflexElement.__proto__ || (0, _getPrototypeOf2.default)(ReflexElement)).call(this, props));

    _this.onResize = _this.onResize.bind(_this);

    _this.setStateThrottled = (0, _lodash2.default)(function (state) {
      _this.setState(state);
    }, _this.props.renderOnResizeRate);

    _this.state = {
      dimensions: {
        height: "100%",
        width: "100%"
      }
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


  (0, _createClass3.default)(ReflexElement, [{
    key: 'componentWillReceiveProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(props) {
        var directions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dir;

        return _regenerator2.default.wrap(function _callee$(_context) {
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
                _iterator = (0, _getIterator3.default)(directions);

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
    key: 'onResize',
    value: function onResize(rect) {

      if (this.props.renderOnResize) {

        this.setStateThrottled({
          dimensions: {
            height: Math.floor(rect.bounds.height) + 1,
            width: Math.floor(rect.bounds.width) + 1
          }
        });
      }
    }

    ///////////////////////////////////////////////////////////////////
    //
    //
    ///////////////////////////////////////////////////////////////////

  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this2 = this;

      if (this.props.propagateDimensions) {

        return _react2.default.Children.map(this.props.children, function (child) {

          var newProps = (0, _assign2.default)({}, child.props, {
            dimensions: _this2.state.dimensions
          });

          return _react2.default.cloneElement(child, newProps);
        });
      }

      return this.props.children;
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var classNames = ['reflex-element'].concat((0, _toConsumableArray3.default)(this.props.className.split(' ')));

      var className = classNames.join(' ');

      var outerStyle = (0, _assign2.default)({}, {
        WebkitBoxFlex: this.props.flex,
        FlexElement: this.props.flex,
        MozBoxFlex: this.props.flex,
        WebkitFlex: this.props.flex,
        flex: this.props.flex
      }, this.props.style);

      var innerStyle = {
        height: this.state.dimensions.height,
        width: this.state.dimensions.width
      };

      return _react2.default.createElement(
        _reactMeasure2.default,
        { bounds: true, onResize: this.onResize },
        function (_ref2) {
          var measureRef = _ref2.measureRef;
          return _react2.default.createElement(
            'div',
            { ref: measureRef, className: className, style: outerStyle },
            _react2.default.createElement(
              'div',
              { style: innerStyle },
              _this3.renderChildren()
            )
          );
        }
      );
    }
  }]);
  return ReflexElement;
}(_react2.default.Component);

ReflexElement.propTypes = {
  renderOnResizeRate: _propTypes2.default.number,
  propagateDimensions: _propTypes2.default.bool,
  renderOnResize: _propTypes2.default.bool,
  className: _propTypes2.default.string
};
ReflexElement.defaultProps = {
  renderOnResize: _Browser2.default.isSafari(),
  propagateDimensions: false,
  renderOnResizeRate: 60,
  className: ''
};
exports.default = ReflexElement;