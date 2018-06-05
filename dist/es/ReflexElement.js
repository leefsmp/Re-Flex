import _Object$assign from 'babel-runtime/core-js/object/assign';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _getIterator from 'babel-runtime/core-js/get-iterator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexHandle from './ReflexHandle';
import throttle from 'lodash.throttle';
import Measure from 'react-measure';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Browser from './Browser';
import React from 'react';

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

    var _this = _possibleConstructorReturn(this, (ReflexElement.__proto__ || _Object$getPrototypeOf(ReflexElement)).call(this, props));

    _this.onResize = _this.onResize.bind(_this);

    _this.setStateThrottled = throttle(function (state) {
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


  _createClass(ReflexElement, [{
    key: 'componentWillReceiveProps',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(props) {
        var directions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dir;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                _iterator = _getIterator(directions);

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 14;
                  break;
                }

                dir = _step.value;
                _context.next = 11;
                return this.props.events.emit('element.size', {
                  index: props.index,
                  size: props.size,
                  direction: dir
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
      var _props = this.props,
          renderOnResize = _props.renderOnResize,
          resizeHeight = _props.resizeHeight,
          resizeWidth = _props.resizeWidth;


      if (renderOnResize) {

        this.setStateThrottled({
          dimensions: _extends({}, resizeHeight && { height: Math.floor(rect.bounds.height) }, resizeWidth && { width: Math.floor(rect.bounds.width) })
        });
      }
    }

    /////////////////////////////////////////////////////////
    // Determines if element is an handle
    // or wraps an handle
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'isHandleElement',
    value: function isHandleElement(element) {

      //https://github.com/leefsmp/Re-Flex/issues/49
      return process.env.NODE_ENV === 'development' ? element.type === React.createElement(ReflexHandle, null).type : element.type === ReflexHandle;
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this2 = this;

      return React.Children.map(this.props.children, function (child) {

        var childProps = _extends({}, child.props);

        if (_this2.props.propagateDimensions) {
          childProps = _extends({}, childProps, {
            dimensions: _this2.state.dimensions
          });
        }

        if (_this2.isHandleElement(child)) {

          childProps = _extends({}, childProps, {
            index: _this2.props.index - 1,
            events: _this2.props.events
          });
        }

        return React.cloneElement(child, childProps);
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

      var classNames = ['reflex-element'].concat(_toConsumableArray(this.props.className.split(' ')));

      var className = classNames.join(' ');

      var outerStyle = _Object$assign({}, {
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

      return React.createElement(
        Measure,
        { bounds: true, onResize: this.onResize },
        function (_ref2) {
          var measureRef = _ref2.measureRef;
          return React.createElement(
            'div',
            { ref: measureRef, className: className, style: outerStyle },
            React.createElement(
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
}(React.Component);

ReflexElement.propTypes = {
  renderOnResizeRate: PropTypes.number,
  propagateDimensions: PropTypes.bool,
  renderOnResize: PropTypes.bool,
  resizeHeight: PropTypes.bool,
  resizeWidth: PropTypes.bool,
  className: PropTypes.string };
ReflexElement.defaultProps = {
  renderOnResize: Browser.isSafari(), // Safari is creepy ...
  propagateDimensions: false,
  renderOnResizeRate: 60,
  resizeHeight: true,
  resizeWidth: true,
  className: '' };
export default ReflexElement;