import ReactDOM from 'react-dom'
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from '../../src/lib'

import './demo.scss'

/////////////////////////////////////////////////////////
// Re-Flex Basic vertical layout non-resizable
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
// Re-Flex basic vertical layout with resizable splitter
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
// Re-Flex vertical layout with double
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
// Re-Flex vertical layout with triple
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
// Re-Flex advanced multi-nested resizable layout
// with event listeners
//
/////////////////////////////////////////////////////////
class ReflexAdvancedDemo
  extends React.Component {

  constructor () {

    super()

    this.resizeProps = {
      onStopResize: this.onStopResize.bind(this),
      onResize: this.onResize.bind(this)
    }
  }

  onResize (e) {

    if (e.domElement) {

      e.domElement.classList.add('resizing')
    }
  }

  onStopResize (e) {

    if (e.domElement) {

      e.domElement.classList.remove('resizing')
    }
  }

  render () {

    return (
      <ReflexContainer orientation="horizontal">
        <ReflexElement className="header" flex={0.1}>
          <div className="pane-content">
            <label>
              Header (fixed)
            </label>
          </div>
        </ReflexElement>
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement {...this.resizeProps}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement {...this.resizeProps}>
                  <div className="pane-content">
                    <div style={{height: '30%'}}/>
                    <label style={{height: '0%'}}>
                      Left Pane <br/> Top
                      <br/>
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
                <ReflexSplitter propagate={true} {...this.resizeProps}/>
                <ReflexElement {...this.resizeProps}>
                  <div className="pane-content">
                    <div style={{height: '30%'}}/>
                    <label style={{height: '0%'}}>
                      Left Pane <br/> Middle
                      <br/>
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
                <ReflexSplitter propagate={true} {...this.resizeProps}/>
                <ReflexElement {...this.resizeProps}>
                  <div className="pane-content">
                    <div style={{height: '30%'}}/>
                    <label style={{height: '0%'}}>
                      Left Pane <br/> Bottom
                      <br/>
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            <ReflexSplitter {...this.resizeProps}/>
            <ReflexElement flex={0.5} {...this.resizeProps}>
              <div className="pane-content">
                <label>
                  Middle Pane
                </label>
              </div>
            </ReflexElement>
            <ReflexSplitter{...this.resizeProps}/>
            <ReflexElement {...this.resizeProps}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement {...this.resizeProps}>
                  <div>
                    <ReflexContainer orientation="vertical">
                      <ReflexElement {...this.resizeProps}>
                        <div className="pane-content">
                          <label>
                            Right Pane <br/> Upper-Left
                          </label>
                        </div>
                      </ReflexElement>
                      <ReflexSplitter/>
                      <ReflexElement {...this.resizeProps}>
                        <div className="pane-content">
                          <label>
                            Right Pane <br/> Upper-Right
                          </label>
                        </div>
                      </ReflexElement>
                    </ReflexContainer>
                  </div>
                </ReflexElement>
                <ReflexSplitter {...this.resizeProps}/>
                <ReflexElement {...this.resizeProps}>
                  <div className="pane-content">
                    <label>
                      Right Pane <br/> Bottom
                    </label>
                  </div>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexElement className="footer" flex={0.1}>
          <div className="pane-content">
            <label>
              Footer (fixed)
            </label>
          </div>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

/////////////////////////////////////////////////////////
// Re-Flex Controlled element demo
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
        <div className="pane-content">
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
        </div>
      </ReflexElement>
    )
  }
}

class ReflexControlsDemo
  extends React.Component {

  constructor () {

    super()

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

    this.setState(Object.assign({}, this.state))
  }

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement flex={0.4}>
          <div className="pane-content">
            <ReflexContainer orientation="horizontal">

              <ControlledElement {...this.state.pane1}/>

              <ReflexSplitter propagate={true}/>

              <ControlledElement {...this.state.pane2}/>

              <ReflexSplitter propagate={true}/>

              <ControlledElement {...this.state.pane3}/>

            </ReflexContainer>
          </div>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement>
          <div className="pane-content">
            <label>
            App Pane
            </label>
          </div>
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
