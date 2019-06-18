import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexHandle from './ReflexHandle';
import { getDataProps } from './utilities';
import throttle from 'lodash.throttle';
import Measure from 'react-measure';
import PropTypes from 'prop-types';
import React from 'react';

class SizeAwareReflexElement extends React.Component {
  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor(props) {
    super(props);

    _defineProperty(this, "onResize", rect => {
      const {
        resizeHeight,
        resizeWidth
      } = this.props;
      const height = Math.floor(rect.bounds.height);
      const width = Math.floor(rect.bounds.width);
      this.setDimensions(_objectSpread({}, resizeHeight && {
        height
      }, resizeWidth && {
        width
      }));
    });

    this.setDimensions = throttle(dimensions => {
      this.setState(dimensions);
    }, this.props.propagateDimensionsRate / 1000);
    this.state = {
      height: "100%",
      width: "100%"
    };
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderChildren() {
    const {
      propagateDimensions
    } = this.props;
    return React.Children.map(this.props.children, child => {
      if (this.props.withHandle || ReflexHandle.isA(child)) {
        return React.cloneElement(child, _objectSpread({
          dimensions: propagateDimensions && this.state
        }, child.props, {
          index: this.props.index - 1,
          events: this.props.events
        }));
      }

      if (propagateDimensions) {
        return React.cloneElement(child, _objectSpread({}, child.props, {
          dimensions: this.state
        }));
      }

      return child;
    });
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  render() {
    return React.createElement(Measure, {
      bounds: true,
      onResize: this.onResize
    }, ({
      measureRef
    }) => {
      return React.createElement("div", {
        ref: measureRef,
        className: "reflex-size-aware"
      }, React.createElement("div", {
        style: this.state
      }, this.renderChildren()));
    });
  }

}

export default class ReflexElement extends React.Component {
  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor(props) {
    super(props);
    this.state = {
      events: props.events,
      size: props.size
    };
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, () => resolve());
    });
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  async componentWillReceiveProps(props) {
    if (props.size !== this.state.size) {
      await this.setStateAsync({
        size: props.size
      });
      const directions = this.toArray(props.direction);

      for (let dir of directions) {
        await this.state.events.emit('element.size', {
          index: props.index,
          size: props.size,
          direction: dir
        });
      }
    }
  } /////////////////////////////////////////////////////////////
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


  toArray(obj) {
    return obj ? Array.isArray(obj) ? obj : [obj] : [];
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if (this.props.withHandle || ReflexHandle.isA(child)) {
        return React.cloneElement(child, _objectSpread({}, child.props, {
          index: this.props.index - 1,
          events: this.state.events
        }));
      }

      return child;
    });
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  render() {
    const className = [...this.props.className.split(' '), this.props.orientation, 'reflex-element'].join(' ').trim();

    const style = _objectSpread({}, this.props.style, {
      flex: this.props.flex
    });

    return React.createElement("div", _extends({}, getDataProps(this.props), {
      className: className,
      style: style
    }), this.props.propagateDimensions ? React.createElement(SizeAwareReflexElement, this.props) : this.renderChildren());
  }

}

_defineProperty(ReflexElement, "propTypes", {
  renderOnResizeRate: PropTypes.number,
  propagateDimensions: PropTypes.bool,
  resizeHeight: PropTypes.bool,
  resizeWidth: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.number /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////

});

_defineProperty(ReflexElement, "defaultProps", {
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