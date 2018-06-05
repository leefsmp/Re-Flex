///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexHandle from './ReflexHandle'
import throttle from 'lodash.throttle'
import Measure from 'react-measure'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Browser from './Browser'
import React from 'react'

export default class ReflexElement extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    renderOnResizeRate: PropTypes.number,
    propagateDimensions: PropTypes.bool,
    renderOnResize: PropTypes.bool,
    resizeHeight: PropTypes.bool,
    resizeWidth: PropTypes.bool,
    className: PropTypes.string
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
    renderOnResize: Browser.isSafari(), // Safari is creepy ...
    propagateDimensions: false,
    renderOnResizeRate: 60,
    resizeHeight: true,
    resizeWidth: true,
    className: ''
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)

    this.onResize = this.onResize.bind(this)

    this.setStateThrottled = throttle((state) => {
      this.setState(state)
    }, this.props.renderOnResizeRate)

    this.state = {
      dimensions: {
        height: "100%",
        width: "100%"
      }
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  async componentWillReceiveProps (props) {

    if (props.size !== this.props.size) {

      const directions = this.toArray(props.direction)

      for (let dir of directions) {

        await this.props.events.emit('element.size', {
          index: props.index,
          size: props.size,
          direction: dir
        })
      }
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  toArray (obj) {

    return obj ? (Array.isArray(obj) ? obj : [obj]) : []
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onResize (rect) {

    const {
      renderOnResize,
      resizeHeight,
      resizeWidth
    } = this.props

    if (renderOnResize) {

      this.setStateThrottled({
        dimensions: {
          ...resizeHeight && {height: Math.floor(rect.bounds.height)},
          ...resizeWidth && {width: Math.floor(rect.bounds.width)}
        }
      })
    }
  }

  /////////////////////////////////////////////////////////
  // Determines if element is an handle
  // or wraps an handle
  //
  /////////////////////////////////////////////////////////
  isHandleElement (element) {

    //https://github.com/leefsmp/Re-Flex/issues/49
    return (process.env.NODE_ENV === 'development')
      ? (element.type === (<ReflexHandle/>).type)
      : (element.type === ReflexHandle)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderChildren () {

    return React.Children.map(
      this.props.children, (child) => {

        let childProps = {
          ...child.props
        }

        if (this.props.propagateDimensions) {
          childProps = {
            ...childProps,
            dimensions: this.state.dimensions
          }
        }

        if (this.isHandleElement(child)) {

          childProps = {
            ...childProps,
            index: this.props.index - 1,
            events: this.props.events
          }
        }

        return React.cloneElement(child, childProps)
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const classNames = [
      'reflex-element',
      ...this.props.className.split(' ')
    ]

    const className = classNames.join(' ')

    const outerStyle = Object.assign({}, {
        WebkitBoxFlex: this.props.flex,
        FlexElement: this.props.flex,
        MozBoxFlex: this.props.flex,
        WebkitFlex: this.props.flex,
        flex: this.props.flex
      }, this.props.style)

    const innerStyle = {
      height: this.state.dimensions.height,
      width: this.state.dimensions.width
    }

    return (
      <Measure bounds onResize={this.onResize}>
        {
          ({ measureRef }) =>
          <div ref={measureRef} className={className} style={outerStyle}>
            <div style={innerStyle}>
              { this.renderChildren() }
            </div>
          </div>
        }
      </Measure>
    )
  }
}
