import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
///////////////////////////////////////////////////////////
// ReflexHandle
// By Philippe Leefsma
// June 2018
//
///////////////////////////////////////////////////////////
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React from 'react';

var ReflexHandle = function (_React$Component) {
  _inherits(ReflexHandle, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexHandle(props) {
    _classCallCheck(this, ReflexHandle);

    var _this = _possibleConstructorReturn(this, (ReflexHandle.__proto__ || _Object$getPrototypeOf(ReflexHandle)).call(this, props));

    _this.state = {
      active: false
    };

    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);

    _this.document = props.document;
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


  _createClass(ReflexHandle, [{
    key: 'componentDidMount',
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

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'componentWillUnmount',
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

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {

      if (this.state.active) {

        this.props.events.emit('resize', {
          index: this.props.index,
          event: event
        });

        if (this.props.onResize) {

          this.props.onResize({
            domElement: ReactDOM.findDOMNode(this),
            component: this
          });
        }

        event.stopPropagation();
        event.preventDefault();
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseDown',
    value: function onMouseDown(event) {

      this.setState({
        active: true
      });

      if (this.props.onStartResize) {

        // cancels resize from controller
        // if needed by returning true
        // to onStartResize
        if (this.props.onStartResize({
          domElement: ReactDOM.findDOMNode(this),
          component: this
        })) {

          return;
        }
      }

      this.props.events.emit('startResize', {
        index: this.props.index,
        event: event
      });
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseUp',
    value: function onMouseUp(event) {

      if (this.state.active) {

        this.setState({
          active: false
        });

        if (this.props.onStopResize) {

          this.props.onStopResize({
            domElement: ReactDOM.findDOMNode(this),
            component: this
          });
        }

        this.props.events.emit('stopResize', {
          index: this.props.index,
          event: event
        });
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'render',
    value: function render() {

      var classNames = ['reflex-handle'].concat(_toConsumableArray(this.props.className.split(' ')));

      if (this.state.active) {

        classNames.push('active');
      }

      return React.createElement(
        'div',
        { className: classNames.join(' '),
          onTouchStart: this.onMouseDown,
          onMouseDown: this.onMouseDown,
          style: this.props.style,
          id: this.props.id },
        this.props.children
      );
    }
  }]);

  return ReflexHandle;
}(React.Component);

ReflexHandle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onStartResize: PropTypes.func,
  onStopResize: PropTypes.func,
  className: PropTypes.string,
  propagate: PropTypes.bool,
  onResize: PropTypes.func,
  style: PropTypes.object };
ReflexHandle.defaultProps = {
  document: typeof document === 'undefined' ? null : document,
  onStartResize: null,
  onStopResize: null,
  propagate: false,
  onResize: null,
  className: '',
  style: {} };
export default ReflexHandle;