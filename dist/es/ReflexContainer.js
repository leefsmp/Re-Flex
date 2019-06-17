import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
///////////////////////////////////////////////////////////
// ReflexContainer
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexSplitter from './ReflexSplitter';
import ReflexEvents from './ReflexEvents';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React from 'react';
import './Polyfills';
export default class ReflexContainer extends React.Component {
  /////////////////////////////////////////////////////////
  // orientation: Orientation of the layout container
  //              valid values are ['horizontal', 'vertical'] 
  // maxRecDepth: Maximun recursion depth to solve initial flex
  //              of layout elements based on user provided values
  // className: Space separated classnames to apply custom styles 
  //            to the layout container  
  // style: allows passing inline style to the container
  /////////////////////////////////////////////////////////
  constructor(props) {
    super(props);

    _defineProperty(this, "onWindowResize", () => {
      this.setState({
        flexData: this.computeFlexData()
      });
    });

    _defineProperty(this, "onStartResize", data => {
      const pos = data.event.changedTouches ? data.event.changedTouches[0] : data.event;

      switch (this.props.orientation) {
        case 'horizontal':
          document.body.classList.add('row-resize');
          this.previousPos = pos.pageY;
          break;

        case 'vertical':
        default:
          document.body.classList.add('col-resize');
          this.previousPos = pos.pageX;
          break;
      }

      this.elements = [this.children[data.index - 1], this.children[data.index + 1]];
      this.emitElementsEvent(this.elements, 'onStartResize');
    });

    _defineProperty(this, "onResize", data => {
      const offset = this.getOffset(data.event);
      const availableOffset = this.computeAvailableOffset(data.index, offset);

      if (availableOffset) {
        const pos = data.event.changedTouches ? data.event.changedTouches[0] : data.event;

        switch (this.props.orientation) {
          case 'horizontal':
            this.previousPos = pos.pageY;
            break;

          case 'vertical':
          default:
            this.previousPos = pos.pageX;
            break;
        }

        this.elements = this.dispatchOffset(data.index, availableOffset);
        this.adjustFlex(this.elements);
        this.setState({
          resizing: true
        }, () => {
          this.emitElementsEvent(this.elements, 'onResize');
        });
      }
    });

    _defineProperty(this, "onStopResize", data => {
      document.body.classList.remove('row-resize');
      document.body.classList.remove('col-resize');
      const resizedRefs = this.elements.map(element => {
        return element.ref;
      });
      const elements = this.children.filter(child => {
        return !ReflexSplitter.isA(child) && resizedRefs.includes(child.ref);
      });
      this.emitElementsEvent(elements, 'onStopResize');
      this.setState({
        resizing: false
      });
    });

    _defineProperty(this, "onElementSize", data => {
      return new Promise(resolve => {
        try {
          const idx = data.index;
          const size = this.getSize(this.children[idx]);
          const offset = data.size - size;
          const dir = data.direction;
          const splitterIdx = idx + dir;
          const availableOffset = this.computeAvailableOffset(splitterIdx, dir * offset);
          this.elements = null;

          if (availableOffset) {
            this.elements = this.dispatchOffset(splitterIdx, availableOffset);
            this.adjustFlex(this.elements);
          }

          this.setState(this.state, () => {
            this.emitElementsEvent(this.elements, 'onResize');
            resolve();
          });
        } catch (ex) {
          // TODO handle exception ...
          console.log(ex);
        }
      });
    });

    this.state = {
      flexData: []
    };
    this.events = new ReflexEvents();
    this.children = [];
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  componentDidMount() {
    const flexData = this.computeFlexData();
    const {
      windowResizeAware
    } = this.props;

    if (windowResizeAware) {
      window.addEventListener('resize', this.onWindowResize);
    }

    this.setState({
      windowResizeAware,
      flexData
    });
    this.events.on('element.size', this.onElementSize);
    this.events.on('startResize', this.onStartResize);
    this.events.on('stopResize', this.onStopResize);
    this.events.on('resize', this.onResize);
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  componentWillUnmount() {
    this.events.off();

    if (this.state.windowResizeAware) {
      window.removeEventListener('resize', this.onWindowResize);
    }
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  getValidChildren(props = this.props) {
    return this.toArray(props.children).filter(child => {
      return !!child;
    });
  } /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////


  componentWillReceiveProps(props) {
    const children = this.getValidChildren(props);

    if (children.length !== this.state.flexData.length || props.orientation !== this.props.orientation || this.flexHasChanged(props)) {
      const flexData = this.computeFlexData(children, props);
      this.setState({
        flexData
      });
    }

    if (props.windowResizeAware !== this.state.windowResizeAware) {
      if (props.windowResizeAware) {
        window.addEventListener('resize', this.onWindowResize);
      } else {
        window.removeEventListener('resize', this.onWindowResize);
      }

      this.setState({
        windowResizeAware: props.windowResizeAware
      });
    }
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  // static getDerivedStateFromProps (nextProps, prevState) {
  //   TODO: implement when migrating to React 16+
  // }
  /////////////////////////////////////////////////////////
  // attempts to preserve current flex on window resize
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  // Check if flex has changed: this allows updating the
  // component when different flex is passed as property
  // to one or several children
  //
  /////////////////////////////////////////////////////////
  flexHasChanged(props) {
    const nextChildrenFlex = this.getValidChildren(props).map(child => {
      return child.props.flex || 0;
    });
    const childrenFlex = this.getValidChildren().map(child => {
      return child.props.flex || 0;
    });
    return !childrenFlex.every((flex, idx) => {
      return flex === nextChildrenFlex[idx];
    });
  } /////////////////////////////////////////////////////////
  // Returns size of a ReflexElement
  //
  /////////////////////////////////////////////////////////


  getSize(element) {
    const ref = element.ref ? this.refs[element.ref] : element;
    const domElement = ReactDOM.findDOMNode(ref);

    switch (this.props.orientation) {
      case 'horizontal':
        return domElement.offsetHeight;

      case 'vertical':
      default:
        return domElement.offsetWidth;
    }
  } /////////////////////////////////////////////////////////
  // Computes offset from pointer position
  //
  /////////////////////////////////////////////////////////


  getOffset(event) {
    const pos = event.changedTouches ? event.changedTouches[0] : event;

    switch (this.props.orientation) {
      case 'horizontal':
        return pos.pageY - this.previousPos;

      case 'vertical':
      default:
        return pos.pageX - this.previousPos;
    }
  } /////////////////////////////////////////////////////////
  // Handles startResize event
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  // Adjusts flex after a dispatch to make sure
  // total flex of modified elements remains the same
  //
  /////////////////////////////////////////////////////////
  adjustFlex(elements) {
    const diffFlex = elements.reduce((sum, element) => {
      const idx = element.props.index;
      const previousFlex = element.props.flex;
      const nextFlex = this.state.flexData[idx].flex;
      return sum + (previousFlex - nextFlex) / elements.length;
    }, 0);
    elements.forEach(element => {
      this.state.flexData[element.props.index].flex += diffFlex;
    });
  } /////////////////////////////////////////////////////////
  // Returns available offset for a given raw offset value
  // This checks how much the panes can be stretched and
  // shrink, then returns the min
  //
  /////////////////////////////////////////////////////////


  computeAvailableOffset(idx, offset) {
    const stretch = this.computeAvailableStretch(idx, offset);
    const shrink = this.computeAvailableShrink(idx, offset);
    const availableOffset = Math.min(stretch, shrink) * Math.sign(offset);
    return availableOffset;
  } /////////////////////////////////////////////////////////
  // Returns true if the next splitter than the one at idx
  // can propagate the drag. This can happen if that
  // next element is actually a splitter and it has
  // propagate=true property set
  //
  /////////////////////////////////////////////////////////


  checkPropagate(idx, direction) {
    if (direction > 0) {
      if (idx < this.children.length - 2) {
        const child = this.children[idx + 2];
        const typeCheck = ReflexSplitter.isA(child);
        return typeCheck && child.props.propagate;
      }
    } else {
      if (idx > 2) {
        const child = this.children[idx - 2];
        const typeCheck = ReflexSplitter.isA(child);
        return typeCheck && child.props.propagate;
      }
    }

    return false;
  } /////////////////////////////////////////////////////////
  // Recursively computes available stretch at splitter
  // idx for given raw offset
  //
  /////////////////////////////////////////////////////////


  computeAvailableStretch(idx, offset) {
    const childIdx = offset < 0 ? idx + 1 : idx - 1;
    const child = this.children[childIdx];
    const size = this.getSize(child);
    const maxSize = child.props.maxSize;
    const availableStretch = maxSize - size;

    if (availableStretch < Math.abs(offset)) {
      if (this.checkPropagate(idx, -1 * offset)) {
        const nextOffset = Math.sign(offset) * (Math.abs(offset) - availableStretch);
        return availableStretch + this.computeAvailableStretch(offset < 0 ? idx + 2 : idx - 2, nextOffset);
      }
    }

    return Math.min(availableStretch, Math.abs(offset));
  } /////////////////////////////////////////////////////////
  // Recursively computes available shrink at splitter
  // idx for given raw offset
  //
  /////////////////////////////////////////////////////////


  computeAvailableShrink(idx, offset) {
    const childIdx = offset > 0 ? idx + 1 : idx - 1;
    const child = this.children[childIdx];
    const size = this.getSize(child);
    const minSize = Math.max(child.props.minSize, 0);
    const availableShrink = size - minSize;

    if (availableShrink < Math.abs(offset)) {
      if (this.checkPropagate(idx, offset)) {
        const nextOffset = Math.sign(offset) * (Math.abs(offset) - availableShrink);
        return availableShrink + this.computeAvailableShrink(offset > 0 ? idx + 2 : idx - 2, nextOffset);
      }
    }

    return Math.min(availableShrink, Math.abs(offset));
  } /////////////////////////////////////////////////////////
  // Returns flex value for unit pixel
  //
  /////////////////////////////////////////////////////////


  computePixelFlex(orientation = this.props.orientation) {
    const domElement = ReactDOM.findDOMNode(this);

    switch (orientation) {
      case 'horizontal':
        if (domElement.offsetHeight === 0.0) {
          console.warn('Found ReflexContainer with height=0, ' + 'this will cause invalid behavior...');
          console.warn(domElement);
          return 0.0;
        }

        return 1.0 / domElement.offsetHeight;

      case 'vertical':
      default:
        if (domElement.offsetWidth === 0.0) {
          console.warn('Found ReflexContainer with width=0, ' + 'this will cause invalid behavior...');
          console.warn(domElement);
          return 0.0;
        }

        return 1.0 / domElement.offsetWidth;
    }
  } /////////////////////////////////////////////////////////
  // Adds offset to a given ReflexElement
  //
  /////////////////////////////////////////////////////////


  addOffset(element, offset) {
    const size = this.getSize(element);
    const idx = element.props.index;
    const newSize = Math.max(size + offset, 0);
    const currentFlex = this.state.flexData[idx].flex;
    const newFlex = currentFlex > 0 ? currentFlex * newSize / size : this.computePixelFlex() * newSize;
    this.state.flexData[idx].flex = !isFinite(newFlex) || isNaN(newFlex) ? 0 : newFlex;
  } /////////////////////////////////////////////////////////
  // Recursively dispatches stretch offset across
  // children elements starting at splitter idx
  //
  /////////////////////////////////////////////////////////


  dispatchStretch(idx, offset) {
    const childIdx = offset < 0 ? idx + 1 : idx - 1;

    if (childIdx < 0 || childIdx > this.children.length - 1) {
      return [];
    }

    const child = this.children[childIdx];
    const size = this.getSize(child);
    const newSize = Math.min(child.props.maxSize, size + Math.abs(offset));
    const dispatchedStretch = newSize - size;
    this.addOffset(child, dispatchedStretch);

    if (dispatchedStretch < Math.abs(offset)) {
      const nextIdx = idx - Math.sign(offset) * 2;
      const nextOffset = Math.sign(offset) * (Math.abs(offset) - dispatchedStretch);
      return [child, ...this.dispatchStretch(nextIdx, nextOffset)];
    }

    return [child];
  } /////////////////////////////////////////////////////////
  // Recursively dispatches shrink offset across
  // children elements starting at splitter idx
  //
  /////////////////////////////////////////////////////////


  dispatchShrink(idx, offset) {
    const childIdx = offset > 0 ? idx + 1 : idx - 1;

    if (childIdx < 0 || childIdx > this.children.length - 1) {
      return [];
    }

    const child = this.children[childIdx];
    const size = this.getSize(child);
    const newSize = Math.max(child.props.minSize, size - Math.abs(offset));
    const dispatchedShrink = newSize - size;
    this.addOffset(child, dispatchedShrink);

    if (Math.abs(dispatchedShrink) < Math.abs(offset)) {
      const nextIdx = idx + Math.sign(offset) * 2;
      const nextOffset = Math.sign(offset) * (Math.abs(offset) + dispatchedShrink);
      return [child, ...this.dispatchShrink(nextIdx, nextOffset)];
    }

    return [child];
  } /////////////////////////////////////////////////////////
  // Dispatch offset at splitter idx
  //
  /////////////////////////////////////////////////////////


  dispatchOffset(idx, offset) {
    return [...this.dispatchStretch(idx, offset), ...this.dispatchShrink(idx, offset)];
  } /////////////////////////////////////////////////////////
  // Emits given if event for each given element
  // if present in the component props
  //
  /////////////////////////////////////////////////////////


  emitElementsEvent(elements, event) {
    this.toArray(elements).forEach(component => {
      if (component.props[event]) {
        const ref = this.refs[component.ref];
        const domElement = ReactDOM.findDOMNode(ref);
        component.props[event]({
          domElement,
          component
        });
      }
    });
  } /////////////////////////////////////////////////////////
  // Computes initial flex data based on provided flex
  // properties. By default each ReflexElement gets
  // evenly arranged within its container
  //
  /////////////////////////////////////////////////////////


  computeFlexData(children = this.getValidChildren(), props = this.props) {
    const pixelFlex = this.computePixelFlex(props.orientation);

    const computeFreeFlex = flexData => {
      return flexData.reduce((sum, entry) => {
        if (!ReflexSplitter.isA(entry) && entry.constrained) {
          return sum - entry.flex;
        }

        return sum;
      }, 1.0);
    };

    const computeFreeElements = flexData => {
      return flexData.reduce((sum, entry) => {
        if (!ReflexSplitter.isA(entry) && !entry.constrained) {
          return sum + 1;
        }

        return sum;
      }, 0.0);
    };

    const flexDataInit = children.map(child => {
      const props = child.props;
      return {
        maxFlex: (props.maxSize || Number.MAX_VALUE) * pixelFlex,
        sizeFlex: (props.size || Number.MAX_VALUE) * pixelFlex,
        minFlex: (props.minSize || 1) * pixelFlex,
        constrained: props.flex !== undefined,
        guid: props.ref || this.guid(),
        flex: props.flex || 0,
        type: child.type
      };
    });

    const computeFlexDataRec = (flexDataIn, depth = 0) => {
      let hasContrain = false;
      const freeElements = computeFreeElements(flexDataIn);
      const freeFlex = computeFreeFlex(flexDataIn);
      const flexDataOut = flexDataIn.map((entry, idx) => {
        if (ReflexSplitter.isA(entry)) {
          return entry;
        }

        const proposedFlex = !entry.constrained ? freeFlex / freeElements : entry.flex;
        const constrainedFlex = Math.min(entry.sizeFlex, Math.min(entry.maxFlex, Math.max(entry.minFlex, proposedFlex)));
        const constrained = constrainedFlex !== proposedFlex;
        hasContrain = hasContrain || constrained;
        return _objectSpread({}, entry, {
          flex: constrainedFlex,
          constrained
        });
      });
      return hasContrain && depth < this.props.maxRecDepth ? computeFlexDataRec(flexDataOut, depth + 1) : flexDataOut;
    };

    const flexData = computeFlexDataRec(flexDataInit);
    return flexData.map(entry => {
      return {
        flex: !ReflexSplitter.isA(entry) ? entry.flex : 0.0,
        guid: entry.guid
      };
    });
  } /////////////////////////////////////////////////////////
  // Utility method that generates a new unique GUID
  //
  /////////////////////////////////////////////////////////


  guid(format = 'xxxx-xxxx') {
    let d = new Date().getTime();
    return format.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x7 | 0x8).toString(16);
    });
  } /////////////////////////////////////////////////////////
  // Utility method to ensure given argument is
  // returned as an array
  //
  /////////////////////////////////////////////////////////


  toArray(obj) {
    return obj ? Array.isArray(obj) ? obj : [obj] : [];
  } /////////////////////////////////////////////////////////
  // Render container. This will clone all original child
  // components in order to pass some internal properties
  // used to handle resizing logic
  //
  /////////////////////////////////////////////////////////


  render() {
    const className = [this.state.resizing ? 'reflex-resizing' : '', ...this.props.className.split(' '), this.props.orientation, 'reflex-container'].join(' ').trim();
    this.children = React.Children.map(this.getValidChildren(), (child, index) => {
      if (index > this.state.flexData.length - 1) {
        return React.createElement("div", null);
      }

      const flexData = this.state.flexData[index];

      const newProps = _objectSpread({}, child.props, {
        maxSize: child.props.maxSize || Number.MAX_VALUE,
        orientation: this.props.orientation,
        minSize: child.props.minSize || 1,
        events: this.events,
        flex: flexData.flex,
        ref: flexData.guid,
        index
      });

      return React.cloneElement(child, newProps);
    });
    return React.createElement("div", _extends({}, this.props, {
      className: className
    }), this.children);
  }

}

_defineProperty(ReflexContainer, "propTypes", {
  windowResizeAware: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  maxRecDepth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////

});

_defineProperty(ReflexContainer, "defaultProps", {
  orientation: 'horizontal',
  windowResizeAware: false,
  maxRecDepth: 100,
  className: '',
  style: {} /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////

});