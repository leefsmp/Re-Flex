import ReactDOM from 'react-dom'
import React from 'react'

export default class ReflexElement extends React.Component {

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
  render () {

    const classNames = [
      ...this.props.className.split(' '),
      'reflex-element'
    ]

    const children = React.Children.map(
      this.props.children, (child) => {

        return child
      })

    const style = Object.assign({}, this.props.style, {
      WebkitBoxFlex: this.props.flex, /* OLD - iOS 6-, Safari 3.1-6 */
      MozBoxFlex: this.props.flex,    /* OLD - Firefox 19- */
      WebkitFlex: this.props.flex,    /* Chrome */
      FlexElement: this.props.flex,   /* IE 10 */
      flex: this.props.flex
    })

    return (
      <div className={classNames.join(' ')} style={style}>
        { children }
      </div>
    )
  }
}
