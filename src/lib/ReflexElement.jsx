///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
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
    className: PropTypes.string
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
    renderOnResize: Browser.isSafari(),
    propagateDimensions: false,
    renderOnResizeRate: 60,
    className: ''
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)

    this.onMeasure = this.onMeasure.bind(this)

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
          size: props.size,
          direction: dir,
          element: this
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
  onMeasure (dimensions) {

    if (this.props.renderOnResize) {

      this.setStateThrottled({
        dimensions: {
          height: Math.floor(dimensions.height),
          width: Math.floor(dimensions.width)
        }
      })
    }
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  renderChildren() {

    if (this.props.propagateDimensions) {

      return React.Children.map(this.props.children, (child) => {

        const newProps = Object.assign({},
          child.props, {
            dimensions: this.state.dimensions
          })

        return React.cloneElement(child, newProps)
      })
    }

    return this.props.children
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

    const style = Object.assign({}, {
        WebkitBoxFlex: this.props.flex,
        FlexElement: this.props.flex,
        MozBoxFlex: this.props.flex,
        WebkitFlex: this.props.flex,
        flex: this.props.flex
      }, this.props.style)

    return (
      <Measure onMeasure={(dimensions) => this.onMeasure(dimensions)}>
        <div className={classNames.join(' ')} style={style}>
          <div style={{
            height: this.state.dimensions.height,
            width: this.state.dimensions.width
          }}>
            { this.renderChildren() }
          </div>
        </div>
      </Measure>
    )
  }
}
