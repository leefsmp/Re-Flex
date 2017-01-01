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
  render () {

    const classNames = [
      ...this.props.className.split(' '),
      'reflex-element'
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
