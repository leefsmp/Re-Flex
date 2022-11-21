///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexHandle from './ReflexHandle'
import {getDataProps} from './utilities'
import throttle from 'lodash.throttle'
import Measure from 'react-measure'
import PropTypes from 'prop-types'
import React from 'react'

const toArray = (obj) => {
  return obj ? (Array.isArray(obj) ? obj : [obj]) : []
}

class SizeAwareReflexElement extends React.Component {

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
  
  onResize = (rect) => {

    const { resizeHeight, resizeWidth } = this.props

    const {height, width} = rect.bounds

    this.setDimensions({
      ...(resizeHeight && {height}),
      ...(resizeWidth && {width})
    })
  }

  renderChildren () {

    const {propagateDimensions} = this.props

    const validChildren = toArray(this.props.children).filter(child => {
      return !!child
    })

    return React.Children.map(validChildren, (child) => {

        if (this.props.withHandle || ReflexHandle.isA(child)) {
          return React.cloneElement(child, {
            dimensions: propagateDimensions && this.state,
            ...child.props,
            index: this.props.index - 1,
            events: this.props.events
          })
        }

        if (propagateDimensions) {
          return React.cloneElement(child, {
            ...child.props,
            dimensions: this.state
          })
        }

        return child
    })
  }

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


class ReflexElement extends React.Component {
  
  static propTypes = {
    propagateDimensions: PropTypes.bool,
    resizeHeight: PropTypes.bool,
    resizeWidth: PropTypes.bool,
    className: PropTypes.string,
    size: PropTypes.number
  }
  
  static defaultProps = {
    propagateDimensionsRate: 100,
    propagateDimensions: false,
    resizeHeight: true,
    resizeWidth: true,
    direction: [1],
    className: ''
  }

  constructor (props) {
    super (props)
    this.state = {
      size: props.size
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.size !== prevState.size) {
      return {
        ...prevState,
        size: nextProps.size
      }
    }
    return null
  }

  async componentDidUpdate (prevProps, prevState, snapshot) {

    if (prevState.size !== this.state.size) {

      const directions = toArray(this.props.direction)

      for (let direction of directions) {

        await this.props.events.emit('element.size', {
          index: this.props.index,
          size: this.props.size,
          direction,
          isSetPropSize: true
        })
      }
    }
  }

  renderChildren () {

    const validChildren = toArray(this.props.children).filter(child => {
      return !!child
    })

    return React.Children.map(validChildren, (child) => {
      if (this.props.withHandle || ReflexHandle.isA(child)) {
        return React.cloneElement(child, {
          ...child.props,
          index: this.props.index - 1,
          events: this.props.events
        })
      }
      return child
    })
  }

  render () {

    const className = [
      ...this.props.className.split(' '),
      this.props.orientation,
      'reflex-element'
    ].join(' ').trim()

    const style = {
      ...this.props.style,
      flexGrow: this.props.flex,
      flexShrink: 1,
      flexBasis: '0%'
    }

    return (
      <div
        {...getDataProps(this.props)}
        ref={this.props.innerRef}
        className={className}
        style={style}>
      {
        this.props.propagateDimensions
          ? <SizeAwareReflexElement {...this.props}/>
          : this.renderChildren()
      }
      </div>
    )
  }
}

export default React.forwardRef((props, ref) => {
  return (
    <ReflexElement innerRef={ref} {...props}/>
  )
})
