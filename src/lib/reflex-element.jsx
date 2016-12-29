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
      /* OLD - iOS 6-, Safari 3.1-6 */
      WebkitBoxFlex: this.props.flex,
      /* OLD - Firefox 19- */
      MozBoxFlex: this.props.flex,
      /* Chrome */
      WebkitFlex: this.props.flex,
      /* IE 10 */
      FlexElement: this.props.flex,
      flex: this.props.flex
    })

    return (
      <div className={classNames.join(' ')} style={style}>
        { children }
      </div>
    )
  }
}
