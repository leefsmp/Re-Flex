'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _sign = require('babel-runtime/core-js/math/sign');

var _sign2 = _interopRequireDefault(_sign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _ReflexSplitter = require('./ReflexSplitter');

var _ReflexSplitter2 = _interopRequireDefault(_ReflexSplitter);

var _ReflexElement = require('./ReflexElement');

var _ReflexElement2 = _interopRequireDefault(_ReflexElement);

var _ReflexEvents = require('./ReflexEvents');

var _ReflexEvents2 = _interopRequireDefault(_ReflexEvents);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///////////////////////////////////////////////////////////
// ReflexContainer
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
var ReflexContainer = function (_React$Component) {
  (0, _inherits3.default)(ReflexContainer, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexContainer(props) {
    (0, _classCallCheck3.default)(this, ReflexContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReflexContainer.__proto__ || (0, _getPrototypeOf2.default)(ReflexContainer)).call(this, props));

    var children = _this.getValidChildren(props);

    _this.state = {
      flexData: _this.computeFlexData(children)
    };

    _this.events = new _ReflexEvents2.default();

    _this.onSplitterStartResize = _this.onSplitterStartResize.bind(_this);

    _this.onSplitterStopResize = _this.onSplitterStopResize.bind(_this);

    _this.onSplitterResize = _this.onSplitterResize.bind(_this);

    _this.onElementSize = _this.onElementSize.bind(_this);

    _this.children = [];
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


  (0, _createClass3.default)(ReflexContainer, [{
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
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'getValidChildren',
    value: function getValidChildren() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;


      return this.toArray(props.children).filter(function (child) {

        return !!child;
      });
    }

    /////////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////////

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {

      var children = this.getValidChildren(props);

      if (children.length !== this.state.flexData.length || this.flexHasChanged(props)) {

        this.setState((0, _assign2.default)({}, this.state, {

          flexData: this.computeFlexData(children)
        }));
      }
    }

    /////////////////////////////////////////////////////////
    // Check if flex has changed: this allows updating the
    // component when different flex is passed as property
    // to one or several children
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'flexHasChanged',
    value: function flexHasChanged(props) {

      var nextChildrenFlex = this.getValidChildren(props).map(function (child) {

        return child.props.flex || 0;
      });

      var childrenFlex = this.getValidChildren().map(function (child) {

        return child.props.flex || 0;
      });

      return !childrenFlex.every(function (flex, idx) {

        return flex === nextChildrenFlex[idx];
      });
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

      var resizedRefs = this.elements.map(function (element) {

        return element.ref;
      });

      var elements = this.children.filter(function (child) {

        return child.type !== _ReflexSplitter2.default && resizedRefs.includes(child.ref);
      });

      this.emitElementsEvent(elements, 'onStopResize');
    }

    /////////////////////////////////////////////////////////
    // Handles element size modified event
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onElementSize',
    value: function onElementSize(data) {
      var _this3 = this;

      return new _promise2.default(function (resolve) {

        try {

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

            resolve();
          });
        } catch (ex) {

          // TODO handle exception ...
        }
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

      var availableOffset = Math.min(stretch, shrink) * (0, _sign2.default)(offset);

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

          var typeCheck = child.type === _ReflexSplitter2.default;

          return typeCheck && child.props.propagate;
        }
      } else {

        if (idx > 2) {

          var _child = this.children[idx - 2];

          var _typeCheck = _child.type === _ReflexSplitter2.default;

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

          var nextOffset = (0, _sign2.default)(offset) * (Math.abs(offset) - availableStretch);

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

      var minSize = Math.max(child.props.minSize, 0);

      var availableShrink = size - minSize;

      if (availableShrink < Math.abs(offset)) {

        if (this.checkPropagate(idx, offset)) {

          var nextOffset = (0, _sign2.default)(offset) * (Math.abs(offset) - availableShrink);

          return availableShrink + this.computeAvailableShrink(offset > 0 ? idx + 2 : idx - 2, nextOffset);
        }
      }

      return Math.min(availableShrink, Math.abs(offset));
    }

    /////////////////////////////////////////////////////////
    // Returns flex value for unit pixel
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

      var idx = element.props.index;

      var newSize = Math.max(size + offset, 0);

      var currentFlex = this.state.flexData[idx].flex;

      var newFlex = currentFlex > 0 ? currentFlex * newSize / size : this.computePixelFlex() * newSize;

      this.state.flexData[idx].flex = !isFinite(newFlex) || isNaN(newFlex) ? 0 : newFlex;
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

      if (childIdx < 0 || childIdx > this.children.length - 1) {

        return [];
      }

      var child = this.children[childIdx];

      var size = this.getSize(child);

      var newSize = Math.min(child.props.maxSize, size + Math.abs(offset));

      var dispatchedStretch = newSize - size;

      this.addOffset(child, dispatchedStretch);

      if (dispatchedStretch < Math.abs(offset)) {

        var nextIdx = idx - (0, _sign2.default)(offset) * 2;

        var nextOffset = (0, _sign2.default)(offset) * (Math.abs(offset) - dispatchedStretch);

        return [child].concat((0, _toConsumableArray3.default)(this.dispatchStretch(nextIdx, nextOffset)));
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

      if (childIdx < 0 || childIdx > this.children.length - 1) {

        return [];
      }

      var child = this.children[childIdx];

      var size = this.getSize(child);

      var newSize = Math.max(child.props.minSize, size - Math.abs(offset));

      var dispatchedShrink = newSize - size;

      this.addOffset(child, dispatchedShrink);

      if (Math.abs(dispatchedShrink) < Math.abs(offset)) {

        var nextIdx = idx + (0, _sign2.default)(offset) * 2;

        var nextOffset = (0, _sign2.default)(offset) * (Math.abs(offset) + dispatchedShrink);

        return [child].concat((0, _toConsumableArray3.default)(this.dispatchShrink(nextIdx, nextOffset)));
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

      return [].concat((0, _toConsumableArray3.default)(this.dispatchStretch(idx, offset)), (0, _toConsumableArray3.default)(this.dispatchShrink(idx, offset)));
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
    key: 'computeFlexData',
    value: function computeFlexData(children) {
      var _this6 = this;

      var nbElements = 0;

      if (!children) {

        return [];
      }

      var childrenArray = this.toArray(children);

      var flexValues = childrenArray.map(function (child) {

        if (child.type !== _ReflexSplitter2.default && !child.props.flex) {

          ++nbElements;
        }

        return child.props ? child.props.flex || 0 : 0;
      });

      var remainingFlex = 1;

      flexValues.forEach(function (flex) {

        remainingFlex -= flex;
      });

      return childrenArray.map(function (child, idx) {

        if (child.type !== _ReflexSplitter2.default) {

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

      var classNames = ['reflex-layout', 'reflex-container', this.props.orientation].concat((0, _toConsumableArray3.default)(this.props.className.split(' ')));

      this.children = _react2.default.Children.map(this.getValidChildren(), function (child, idx) {

        if (idx > _this7.state.flexData.length - 1) {
          return _react2.default.createElement('div', null);
        }

        var flexData = _this7.state.flexData[idx];

        var newProps = (0, _assign2.default)({}, child.props, {
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
        { className: classNames.join(' '),
          style: this.props.style },
        this.children
      );
    }
  }]);
  return ReflexContainer;
}(_react2.default.Component);

ReflexContainer.propTypes = {
  orientation: _propTypes2.default.string,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
ReflexContainer.defaultProps = {
  orientation: 'horizontal',
  className: '',
  style: {}
};
exports.default = ReflexContainer;