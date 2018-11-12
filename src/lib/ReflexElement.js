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
import React from 'react'

class SizeAwareReflexElement extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)

    this.setDimensions = throttle((dimensions) => {
      this.setState(dimensions)
    }, this.props.propagateDimensionsRate/1000)

    this.state = {
      height: "100%",
      width: "100%"
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onResize = (rect) => {

    const { resizeHeight, resizeWidth } = this.props

    const height = Math.floor(rect.bounds.height)
    const width = Math.floor(rect.bounds.width)

    this.setDimensions({
      ...(resizeHeight && {height}),
      ...(resizeWidth && {width})
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderChildren () {

    return React.Children.map(
      this.props.children, (child) => {

        if (this.props.withHandler || ReflexHandle.isA(child)) {
          return React.cloneElement(child, {
            ...child.props,
            index: this.props.index - 1,
            events: this.props.events
          })
        }

        if (this.props.propagateDimensions) {
          return React.cloneElement(child, {
            ...child.props,
            dimensions: this.state
          })
        }

        return child
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    return (
      <Measure bounds onResize={this.onResize}>
      {
        ({measureRef}) => {
            return (
              <div ref={measureRef} className="reflex-size-aware">
                <div style={this.state}>
                  { this.renderChildren() }
                </div>
              </div>
            )
          }
      }
      </Measure>
    )
  }
}


export default class ReflexElement extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    renderOnResizeRate: PropTypes.number,
    propagateDimensions: PropTypes.bool,
    resizeHeight: PropTypes.bool,
    resizeWidth: PropTypes.bool,
    className: PropTypes.string,
    size: PropTypes.number
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
    propagateDimensionsRate: 100,
    propagateDimensions: false, 
    resizeHeight: true,
    resizeWidth: true,
    direction: [1],
    className: ''
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)

    this.state = {
      events: props.events,
      size: props.size
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  setStateAsync (state) {
    return new Promise((resolve) => {
      this.setState(state, () => resolve())
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  async componentWillReceiveProps (props) {

    if (props.size !== this.state.size) {

      await this.setStateAsync({
        size: props.size
      })

      const directions = this.toArray(props.direction)

      for (let dir of directions) {

        await this.state.events.emit('element.size', {
          index: props.index,
          size: props.size,
          direction: dir
        })
      }
    }
  }

  /////////////////////////////////////////////////////////////
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
  toArray (obj) {
    return obj ? (Array.isArray(obj) ? obj : [obj]) : []
  }
  
  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  renderChildren () {

    return React.Children.map(
      this.props.children, (child) => {

        if (this.props.withHandle || ReflexHandle.isA(child)) {
          return React.cloneElement(child, {
            ...child.props,
            index: this.props.index - 1,
            events: this.state.events
          })
        }

        return child
    })
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const className = [
      ...this.props.className.split(' '),
      'reflex-element'
    ].join(' ')

    const style = {
      ...this.props.style,
      flex: this.props.flex
    }

    return (
      <div className={className} style={style}>
      {
        this.props.propagateDimensions
          ? <SizeAwareReflexElement {...this.props}/>
          : this.renderChildren()
      }
      </div>
    ) 
  }
}
