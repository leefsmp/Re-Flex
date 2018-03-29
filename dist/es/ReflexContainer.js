import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Math$sign from 'babel-runtime/core-js/math/sign';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Promise from 'babel-runtime/core-js/promise';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
///////////////////////////////////////////////////////////
// ReflexContainer
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexSplitter from './ReflexSplitter';
import ReflexElement from './ReflexElement';
import ReflexEvents from './ReflexEvents';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React from 'react';

var ReflexContainer = function (_React$Component) {
  _inherits(ReflexContainer, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexContainer(props) {
    _classCallCheck(this, ReflexContainer);

    var _this = _possibleConstructorReturn(this, (ReflexContainer.__proto__ || _Object$getPrototypeOf(ReflexContainer)).call(this, props));

    _this.state = {
      flexData: []
    };

    _this.events = new ReflexEvents();

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


  _createClass(ReflexContainer, [{
    key: 'setPartialState',
    value: function setPartialState(partialState) {
      var _this2 = this;

      return new _Promise(function (resolve) {

        _this2.setState(_Object$assign({}, _this2.state, partialState), function () {
          resolve();
        });
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      var flexData = this.computeFlexData();

      this.setPartialState({
        flexData: flexData
      });

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

        var flexData = this.computeFlexData(children);

        this.setPartialState({
          flexData: flexData
        });
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

      var ref = element.ref ? this.refs[element.ref] : element;

      var domElement = ReactDOM.findDOMNode(ref);

      switch (this.props.orientation) {

        case 'horizontal':
          return domElement.offsetHeight;

        case 'vertical':
        default:
          return domElement.offsetWidth;
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
        default:
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
        default:
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
      var _this3 = this;

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
          default:
            this.previousPos = pos.pageX;
            break;
        }

        this.elements = this.dispatchOffset(idx, availableOffset);

        this.adjustFlex(this.elements);

        this.setPartialState(this.state).then(function () {

          _this3.emitElementsEvent(_this3.elements, 'onResize');
        });
      }
    }

    /////////////////////////////////////////////////////////
    // Determines if element is a splitter
    // or wraps a splitter
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'isSplitterElement',
    value: function isSplitterElement(element) {

      return element.type === ReflexSplitter;
    }

    /////////////////////////////////////////////////////////
    // Handles splitter stopResize event
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onSplitterStopResize',
    value: function onSplitterStopResize(data) {
      var _this4 = this;

      document.body.style.cursor = 'auto';

      var resizedRefs = this.elements.map(function (element) {

        return element.ref;
      });

      var elements = this.children.filter(function (child) {

        return !_this4.isSplitterElement(child) && resizedRefs.includes(child.ref);
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
      var _this5 = this;

      return new _Promise(function (resolve) {

        try {

          var idx = data.element.props.index;

          var size = _this5.getSize(_this5.children[idx]);

          var offset = data.size - size;

          var dir = data.direction;

          var splitterIdx = idx + dir;

          var availableOffset = _this5.computeAvailableOffset(splitterIdx, dir * offset);

          _this5.elements = null;

          if (availableOffset) {

            _this5.elements = _this5.dispatchOffset(splitterIdx, availableOffset);

            _this5.adjustFlex(_this5.elements);
          }

          _this5.setPartialState(_this5.state).then(function () {

            _this5.emitElementsEvent(_this5.elements, 'onResize');

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
      var _this6 = this;

      var diffFlex = elements.reduce(function (sum, element) {

        var idx = element.props.index;

        var previousFlex = element.props.flex;

        var nextFlex = _this6.state.flexData[idx].flex;

        return sum + (previousFlex - nextFlex) / elements.length;
      }, 0);

      elements.forEach(function (element) {
        _this6.state.flexData[element.props.index].flex += diffFlex;
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

      var availableOffset = Math.min(stretch, shrink) * _Math$sign(offset);

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

          var typeCheck = this.isSplitterElement(child);

          return typeCheck && child.props.propagate;
        }
      } else {

        if (idx > 2) {

          var _child = this.children[idx - 2];

          var _typeCheck = this.isSplitterElement(_child);

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

          var nextOffset = _Math$sign(offset) * (Math.abs(offset) - availableStretch);

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

          var nextOffset = _Math$sign(offset) * (Math.abs(offset) - availableShrink);

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

      var domElement = ReactDOM.findDOMNode(this);

      switch (this.props.orientation) {

        case 'horizontal':

          if (domElement.offsetHeight === 0.0) {
            console.warning('Found ReflexContainer with height=0, ' + 'this will cause invalid behavior...');
            console.warning(domElement);
            return 0.0;
          }

          return 1.0 / domElement.offsetHeight;

        case 'vertical':
        default:

          if (domElement.offsetWidth === 0.0) {
            console.warning('Found ReflexContainer with width=0, ' + 'this will cause invalid behavior...');
            console.warning(domElement);
            return 0.0;
          }

          return 1.0 / domElement.offsetWidth;
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

        var nextIdx = idx - _Math$sign(offset) * 2;

        var nextOffset = _Math$sign(offset) * (Math.abs(offset) - dispatchedStretch);

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

      if (childIdx < 0 || childIdx > this.children.length - 1) {

        return [];
      }

      var child = this.children[childIdx];

      var size = this.getSize(child);

      var newSize = Math.max(child.props.minSize, size - Math.abs(offset));

      var dispatchedShrink = newSize - size;

      this.addOffset(child, dispatchedShrink);

      if (Math.abs(dispatchedShrink) < Math.abs(offset)) {

        var nextIdx = idx + _Math$sign(offset) * 2;

        var nextOffset = _Math$sign(offset) * (Math.abs(offset) + dispatchedShrink);

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
    // Emits given if event for each given element
    // if present in the component props
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'emitElementsEvent',
    value: function emitElementsEvent(elements, event) {
      var _this7 = this;

      this.toArray(elements).forEach(function (element) {

        if (element.props[event]) {

          var ref = _this7.refs[element.ref];

          element.props[event]({
            domElement: ReactDOM.findDOMNode(ref),
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
    value: function computeFlexData() {
      var _this8 = this;

      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getValidChildren();


      var pixelFlex = this.computePixelFlex();

      var computeFreeFlex = function computeFreeFlex(flexData) {
        return flexData.reduce(function (sum, entry) {
          if (!_this8.isSplitterElement(entry) && entry.constrained) {
            return sum - entry.flex;
          }
          return sum;
        }, 1);
      };

      var computeFreeElements = function computeFreeElements(flexData) {
        return flexData.reduce(function (sum, entry) {
          if (!_this8.isSplitterElement(entry) && !entry.constrained) {
            return sum + 1;
          }
          return sum;
        }, 0);
      };

      var flexDataInit = children.map(function (child) {

        var props = child.props;

        return {
          maxFlex: (props.maxSize || Number.MAX_VALUE) * pixelFlex,
          sizeFlex: (props.size || Number.MAX_VALUE) * pixelFlex,
          minFlex: (props.minSize || 1) * pixelFlex,
          constrained: props.flex !== undefined,
          guid: props.ref || _this8.guid(),
          flex: props.flex || 0,
          type: child.type
        };
      });

      var computeFlexDataRec = function computeFlexDataRec(flexDataIn) {

        var hasContrain = false;

        var freeElements = computeFreeElements(flexDataIn);

        var freeFlex = computeFreeFlex(flexDataIn);

        var flexDataOut = flexDataIn.map(function (entry) {

          if (_this8.isSplitterElement(entry)) {
            return entry;
          }

          var proposedFlex = !entry.constrained ? freeFlex / freeElements : entry.flex;

          var constrainedFlex = Math.min(entry.sizeFlex, Math.min(entry.maxFlex, Math.max(entry.minFlex, proposedFlex)));

          var constrained = constrainedFlex !== proposedFlex;

          hasContrain = hasContrain || constrained;

          return _Object$assign({}, entry, {
            flex: constrainedFlex,
            constrained: constrained
          });
        });

        return hasContrain ? computeFlexDataRec(flexDataOut) : flexDataOut;
      };

      var flexData = computeFlexDataRec(flexDataInit);

      return flexData.map(function (entry) {

        return {
          flex: !_this8.isSplitterElement(entry) ? entry.flex : 0.0,
          guid: entry.guid
        };
      });
    }

    /////////////////////////////////////////////////////////
    // Utility method that generates a new unique GUID
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'guid',
    value: function guid() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'xxxx-xxxx';


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
      var _this9 = this;

      var classNames = ['reflex-layout', 'reflex-container', this.props.orientation].concat(_toConsumableArray(this.props.className.split(' ')));

      this.children = React.Children.map(this.getValidChildren(), function (child, idx) {

        if (idx > _this9.state.flexData.length - 1) {
          return React.createElement('div', null);
        }

        var flexData = _this9.state.flexData[idx];

        var newProps = _Object$assign({}, child.props, {
          maxSize: child.props.maxSize || Number.MAX_VALUE,
          orientation: _this9.props.orientation,
          minSize: child.props.minSize || 1,
          events: _this9.events,
          flex: flexData.flex,
          ref: flexData.guid,
          index: idx
        });

        return React.cloneElement(child, newProps);
      });

      return React.createElement(
        'div',
        { className: classNames.join(' '),
          style: this.props.style },
        this.children
      );
    }
  }]);

  return ReflexContainer;
}(React.Component);

/////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////


ReflexContainer.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
  style: PropTypes.object

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
};ReflexContainer.defaultProps = {
  orientation: 'horizontal',
  className: '',
  style: {}
};

export default ReflexContainer;