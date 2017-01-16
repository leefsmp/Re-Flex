///////////////////////////////////////////////////////////
// ReflexElement
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReactDOM from 'react-dom'
import React from 'react'

export default class ReflexElement
  extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    className: React.PropTypes.string
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
    className: ''
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super (props)

    this.state = {
      style: {}
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
      <div className={classNames.join(' ')} style={style}>
        { this.props.children }
      </div>
    )
  }
}
