import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
///////////////////////////////////////////////////////////
// ReflexHandle
// By Philippe Leefsma
// June 2018
//
///////////////////////////////////////////////////////////
import { getDataProps } from './utilities';
import PropTypes from 'prop-types';
import React from 'react';
export default class ReflexHandle extends React.Component {
  static isA(element) {
    var _element$props;
    if (!element) {
      return false;
    }
    return (process.env.NODE_ENV === 'development' ? element.type === /*#__PURE__*/React.createElement(ReflexHandle, null).type : element.type === ReflexHandle) || element.name === 'reflex-handle' || ((_element$props = element.props) === null || _element$props === void 0 ? void 0 : _element$props.name) === 'reflex-handle';
  }
  constructor(props) {
    super(props);
    _defineProperty(this, "ref", React.createRef());
    _defineProperty(this, "onMouseMove", event => {
      if (this.state.active) {
        const domElement = this.ref.current;
        this.props.events.emit('resize', {
          index: this.props.index,
          domElement,
          event
        });
        if (this.props.onResize) {
          this.props.onResize({
            component: this,
            domElement
          });
        }
        event.stopPropagation();
        event.preventDefault();
      }
    });
    _defineProperty(this, "onMouseDown", event => {
      this.setState({
        active: true
      });
      if (this.props.onStartResize) {
        // cancels resize from controller
        // if needed by returning true
        // to onStartResize
        if (this.props.onStartResize({
          domElement: this.ref.current,
          component: this
        })) {
          return;
        }
      }
      this.props.events.emit('startResize', {
        index: this.props.index,
        event
      });
    });
    _defineProperty(this, "onMouseUp", event => {
      if (this.state.active) {
        this.setState({
          active: false
        });
        if (this.props.onStopResize) {
          this.props.onStopResize({
            domElement: this.ref.current,
            component: this
          });
        }
        this.props.events.emit('stopResize', {
          index: this.props.index,
          event
        });
      }
    });
    this.state = {
      active: false
    };
    this.document = props.document;
  }
  componentDidMount() {
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
  componentWillUnmount() {
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
  render() {
    const className = [...this.props.className.split(' '), this.state.active ? 'active' : '', 'reflex-handle'].join(' ').trim();
    return /*#__PURE__*/React.createElement("div", _extends({}, getDataProps(this.props), {
      onTouchStart: this.onMouseDown,
      onMouseDown: this.onMouseDown,
      style: this.props.style,
      className: className,
      id: this.props.id,
      ref: this.ref
    }), this.props.children);
  }
}
_defineProperty(ReflexHandle, "propTypes", {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onStartResize: PropTypes.func,
  onStopResize: PropTypes.func,
  className: PropTypes.string,
  propagate: PropTypes.bool,
  onResize: PropTypes.func,
  style: PropTypes.object
});
_defineProperty(ReflexHandle, "defaultProps", {
  document: typeof document === 'undefined' ? null : document,
  onStartResize: null,
  onStopResize: null,
  propagate: false,
  onResize: null,
  className: '',
  style: {}
});