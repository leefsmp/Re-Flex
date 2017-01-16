import ReactDOM from 'react-dom'
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement,
  ReflexResizer
} from '../../src/lib'

import './demo.scss'

/////////////////////////////////////////////////////////
// Re-flex Basic vertical layout non-resizable
//
/////////////////////////////////////////////////////////
class ReflexBasicDemo
  extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement className="left-pane">
          <div className="pane-content">
            <label>
              Left Pane (fixed)
            </label>
          </div>
        </ReflexElement>

        <ReflexElement className="right-pane">
          <div className="pane-content">
            <label>
              Right Pane (fixed)
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-flex basic vertical layout with resizable splitter
//
/////////////////////////////////////////////////////////
class ReflexBasicSplitterDemo
  extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement className="left-pane">
          <div className="pane-content">
            <label>
              Left Pane (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement className="right-pane"
          minSize="200"
          maxSize="800">
          <div className="pane-content">
            <label>
              Right Pane (resizable)
              <br/>
              <br/>
              minSize = 200px
              <br/>
              maxSize = 800px
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-flex vertical layout with double
// resizable splitter propagation
//
/////////////////////////////////////////////////////////
class ReflexSplitterPropagationDemo2x
  extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement className="left-pane">
          <div className="pane-content">
            <label>
              Left Pane (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="middle-pane"
          minSize="200"
          maxSize="800">
          <div className="pane-content">
            <label>
              Middle Pane (resizable)
              <br/>
              <br/>
              minSize = 200px
              <br/>
              maxSize = 400px
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="right-pane">
          <div className="pane-content">
            <label>
              Right Pane (resizable)
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-flex vertical layout with double
// resizable splitter propagation
//
/////////////////////////////////////////////////////////
class ReflexSplitterPropagationDemo3x
extends React.Component {

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement className="left-pane">
          <div className="pane-content">
            <label>
            Left Pane (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="middle-pane">
          <div className="pane-content">
            <label>
            Middle Pane 1 (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="middle-pane">
          <div className="pane-content">
            <label>
            Middle Pane 2 (resizable)
            </label>
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="right-pane">
          <div className="pane-content">
            <label>
            Right Pane (resizable)
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-flex advanced multi-nested resizable layout
// with event listeners
//
/////////////////////////////////////////////////////////
class ReflexAdvancedDemo
  extends React.Component {

  constructor () {

    super()

    this.containerProps = {
      onResize: this.onResizeContainer.bind(this)
    }

    this.elementProps = {
      onStopResize: this.onStopResizeElement.bind(this),
      onResize: this.onResizeElement.bind(this)
    }

    this.onResizeWindow =
      this.onResizeWindow.bind(this)
  }

  componentDidMount () {

    window.addEventListener('resize',
      this.onResizeWindow)

    // fix for safari compatibility
    this.forceUpdate()
  }

  componentWillUnmount () {

    window.removeEventListener('resize',
      this.onResizeWindow)
  }

  onResizeContainer (e) {

    // fix for safari compatibility
    this.forceUpdate()
  }

  onResizeElement (e) {

    e.domElement.classList.add('resizing')
  }

  onStopResizeElement (e) {

    e.domElement.classList.remove('resizing')
  }

  onResizeWindow () {

    this.forceUpdate()
  }

  render () {

    return (
      <ReflexContainer orientation="horizontal" {...this.containerProps}>
        <ReflexElement className="header" flex={0.1}>
          <ReflexResizer className="pane-content">
            <label>
              Header (fixed)
            </label>
          </ReflexResizer>
        </ReflexElement>
        <ReflexElement>
          <ReflexResizer>
            <ReflexContainer orientation="vertical" {...this.containerProps}>
              <ReflexElement {...this.elementProps}>
                <ReflexContainer orientation="horizontal" {...this.containerProps}>
                  <ReflexElement {...this.elementProps}>
                    <ReflexResizer className="pane-content">
                      <label>
                        Left Pane <br/> Top
                        <br/>
                        (splitter propagation)
                      </label>
                    </ReflexResizer>
                  </ReflexElement>
                  <ReflexSplitter propagate={true}/>
                  <ReflexElement {...this.elementProps}>
                    <ReflexResizer className="pane-content">
                      <label>
                        Left Pane <br/> Middle
                        <br/>
                        (splitter propagation)
                      </label>
                    </ReflexResizer>
                  </ReflexElement>
                  <ReflexSplitter propagate={true}/>
                  <ReflexElement {...this.elementProps}>
                    <ReflexResizer className="pane-content">
                      <label>
                        Left Pane <br/> Bottom
                        <br/>
                        (splitter propagation)
                      </label>
                    </ReflexResizer>
                  </ReflexElement>
                </ReflexContainer>
              </ReflexElement>
              <ReflexSplitter/>
              <ReflexElement flex={0.5} {...this.elementProps}>
                <ReflexResizer className="pane-content">
                  <label>
                    Middle Pane
                  </label>
                </ReflexResizer>
              </ReflexElement>
              <ReflexSplitter/>
              <ReflexElement {...this.elementProps}>
                <ReflexResizer>
                  <ReflexContainer orientation="horizontal" {...this.containerProps}>
                    <ReflexElement {...this.elementProps}>
                      <ReflexResizer>
                        <ReflexContainer orientation="vertical" {...this.containerProps}>
                          <ReflexElement {...this.elementProps}>
                            <ReflexResizer className="pane-content">
                              <label>
                                Right Pane <br/> Upper-Left
                              </label>
                            </ReflexResizer>
                          </ReflexElement>
                          <ReflexSplitter/>
                          <ReflexElement {...this.elementProps}>
                            <ReflexResizer className="pane-content">
                              <label>
                                Right Pane <br/> Upper-Right
                              </label>
                            </ReflexResizer>
                          </ReflexElement>
                        </ReflexContainer>
                      </ReflexResizer>
                    </ReflexElement>
                    <ReflexSplitter/>
                    <ReflexElement {...this.elementProps}>
                      <ReflexResizer className="pane-content">
                        <label>
                          Right Pane <br/> Bottom
                        </label>
                      </ReflexResizer>
                    </ReflexElement>
                  </ReflexContainer>
                </ReflexResizer>
              </ReflexElement>
            </ReflexContainer>
          </ReflexResizer>
        </ReflexElement>
        <ReflexElement className="footer" flex={0.1}>
          <ReflexResizer className="pane-content">
            <label>
              Footer (fixed)
            </label>
          </ReflexResizer>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-flex Controlled element demo
//
/////////////////////////////////////////////////////////
class ControlledElement
  extends React.Component {

  constructor () {

    super()

    this.onLockSizeClicked =
      this.onLockSizeClicked.bind(this)

    this.onMinimizeClicked =
      this.onMinimizeClicked.bind(this)

    this.onMaximizeClicked =
      this.onMaximizeClicked.bind(this)

    this.state = {
      size: -1
    }
  }

  onLockSizeClicked () {

    this.props.onLockSize({
      locked: this.props.sizeLocked,
      paneId: this.props.id,
      size: this.getSize()
    })
  }

  onMinimizeClicked () {

    const currentSize = this.getSize()

    const update = (size) => {

      return new Promise((resolve) => {

        this.setState(Object.assign({},
          this.state, {
            size: size < 25 ? 25 : size
          }), () => resolve())
      })
    }

    const done = (from, to) => {

      return from < to
    }

    this.animate (
      currentSize, 25, -8,
      done, update)
  }

  onMaximizeClicked () {

    const currentSize = this.getSize()

    const update = (size) => {

      return new Promise((resolve) => {

        this.setState(Object.assign({},
          this.state, {
            size
          }), () => resolve())
      })
    }

    const done = (from, to) => {

      return from > to
    }

    this.animate (
      currentSize, 400, 8,
      done, update)
  }

  getSize () {

    const domElement = ReactDOM.findDOMNode(this)

    switch (this.props.orientation) {

      case 'horizontal':
        return domElement.offsetHeight

      case 'vertical':
        return domElement.offsetWidth

      default:
        return 0
    }
  }

  animate (from, to, step, done, fn) {

    const stepFn = () => {

      if (!done(from, to)) {

        fn(from += step).then(() => {

          setTimeout(stepFn, 8)
        })
      }
    }

    stepFn ()
  }

  render () {

    const lockStyle = this.props.sizeLocked ?
      { color: '#FF0000' } : {}

    return (
      <ReflexElement size={this.state.size} {...this.props}>
        <ReflexResizer className="pane-content">
          <div className="pane-control">
            <label>
              {this.props.name}  Controls
            </label>
            <button onClick={this.onMaximizeClicked}>
              <label> + </label>
            </button>
            <button onClick={this.onMinimizeClicked}>
              <label> - </label>
            </button>
            <button onClick={this.onLockSizeClicked}>
              <label style={lockStyle} > = </label>
            </button>
          </div>
          <div className="ctrl-pane-content">
            <label>
              {this.props.name}
            </label>
          </div>
        </ReflexResizer>
      </ReflexElement>
    )
  }
}

class ReflexControlsDemo
  extends React.Component {

  constructor () {

    super()

    this.containerProps = {
      onResize: this.onResizeContainer.bind(this)
    }

    this.onResizeWindow =
      this.onResizeWindow.bind(this)

    this.onLockSize =
      this.onLockSize.bind(this)

    this.state = {
      pane1: {
        onLockSize: this.onLockSize,
        sizeLocked: false,
        name: 'Pane 1',
        direction: 1,
        id: 'pane1',
        minSize: 25
      },
      pane2: {
        onLockSize: this.onLockSize,
        sizeLocked: false,
        name: 'Pane 2',
        direction: [1, -1],
        id: 'pane2',
        minSize: 25
      },
      pane3: {
        onLockSize: this.onLockSize,
        sizeLocked: false,
        name: 'Pane 3',
        direction:-1,
        id: 'pane3',
        minSize: 25
      }
    }
  }

  componentDidMount () {

    window.addEventListener('resize',
      this.onResizeWindow)

    // fix for safari compatibility
    this.forceUpdate()
  }

  componentWillUnmount () {

    window.removeEventListener('resize',
      this.onResizeWindow)
  }

  onResizeWindow () {

    this.forceUpdate()
  }

  onResizeContainer (e) {

    // fix for safari compatibility
    this.forceUpdate()
  }

  onLockSize (data) {

    const locked = !this.state[data.paneId].sizeLocked

    this.state[data.paneId].sizeLocked = locked

    if (locked) {

      this.state[data.paneId].minSize = data.size
      this.state[data.paneId].maxSize = data.size

    } else {

      this.state[data.paneId].minSize = 25
      this.state[data.paneId].maxSize = Number.MAX_VALUE
    }

    this.setState(Object.assign({},
      this.state))
  }

  render () {

    return (
      <ReflexContainer orientation="vertical" {...this.containerProps}>

        <ReflexElement flex={0.4}>
          <ReflexResizer className="pane-content">
            <ReflexContainer orientation="horizontal" {...this.containerProps}>

              <ControlledElement {...this.state.pane1}/>

              <ReflexSplitter propagate={true}/>

              <ControlledElement {...this.state.pane2}/>

              <ReflexSplitter propagate={true}/>

              <ControlledElement {...this.state.pane3}/>

            </ReflexContainer>
          </ReflexResizer>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement onResize={this.onResizeElement}>
          <ReflexResizer className="pane-content">
            <label>
            App Pane
            </label>
          </ReflexResizer>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Render all demos
//
/////////////////////////////////////////////////////////
ReactDOM.render(<ReflexBasicDemo/>,
  document.getElementById('demo-basic'))

ReactDOM.render(<ReflexBasicSplitterDemo/>,
  document.getElementById('demo-basic-splitter'))

ReactDOM.render(<ReflexSplitterPropagationDemo2x/>,
  document.getElementById('demo-splitter-propagation-2x'))

ReactDOM.render(<ReflexSplitterPropagationDemo3x/>,
  document.getElementById('demo-splitter-propagation-3x'))

ReactDOM.render(<ReflexAdvancedDemo/>,
  document.getElementById('demo-advanced'))

ReactDOM.render(<ReflexControlsDemo/>,
  document.getElementById('demo-controls'))
