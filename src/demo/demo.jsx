import ReactDOM from 'react-dom'
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement,
  ReflexResizer
} from '../../src/lib'


/////////////////////////////////////////////////////////
// Basic vertical re-flex layout non-resizable
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
// Basic vertical re-flex layout with resizable splitter
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
// vertical re-flex layout with double
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
// vertical re-flex layout with double
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
// Advanced re-flex multi-nested resizable layout
// with event listeners
//
/////////////////////////////////////////////////////////
class ReflexAdvancedDemo
  extends React.Component {

  constructor () {

    super()

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

  onResizeElement (e) {

    e.domElement.classList.add('resizing')

    // fix for safari compatibility
    this.forceUpdate()
  }

  onStopResizeElement (e) {

    e.domElement.classList.remove('resizing')

    // fix for safari compatibility
    this.forceUpdate()
  }

  onResizeWindow () {

    this.forceUpdate()
  }

  render () {

    return (
      <ReflexContainer orientation="horizontal">
        <ReflexElement className="header" flex={0.1}>
          <ReflexResizer className="pane-content">
            <label>
              Header (fixed)
            </label>
          </ReflexResizer>
        </ReflexElement>
        <ReflexElement>
          <ReflexResizer>
            <ReflexContainer orientation="vertical">
              <ReflexElement {...this.elementProps}>
                <ReflexContainer orientation="horizontal">
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
                  <ReflexContainer orientation="horizontal">
                    <ReflexElement {...this.elementProps}>
                      <ReflexResizer>
                        <ReflexContainer orientation="vertical">
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
// Controlled re-flex element demo
//
/////////////////////////////////////////////////////////
class ControlledElement
  extends React.Component {

  constructor () {

    super()

    this.onMinimizeClicked =
      this.onMinimizeClicked.bind(this)

    this.onMaximizeClicked =
      this.onMaximizeClicked.bind(this)

    this.state = {}
  }

  onMinimizeClicked () {

    const currentSize = this.getSize ()

    const update = (size) => {

      this.setState(Object.assign({},
        this.state, {
          size: size < 25 ? 25 : size
        }))
    }

    const done = (from, to) => {

      return from < to
    }

    this.animate (
      currentSize, 25, -8,
      done, update)
  }

  onMaximizeClicked () {

    const currentSize = this.getSize ()

    const update = (size) => {

      this.setState(Object.assign({},
        this.state, {
          size
        }))
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

        fn (from += step)

        requestAnimationFrame (stepFn)
      }
    }

    stepFn ()
  }

  render () {

    return (
      <ReflexElement size={this.state.size} {...this.props}>
        <ReflexResizer className="pane-content">
          <div className="pane-control">
            <label>
              {this.props.name}  Controls
            </label>
            <button onClick={this.onMinimizeClicked}/>
            <button onClick={this.onMaximizeClicked}/>
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

    this.onResizeElement =
      this.onResizeElement.bind(this)

    this.onResizeWindow =
      this.onResizeWindow.bind(this)

    this.ctrlProps = {
      onResize: this.onResizeElement,
      minSize: 25
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

  onResizeElement (e) {

    // fix for safari compatibility
    this.forceUpdate()
  }

  render () {

    return (
      <ReflexContainer orientation="vertical">

        <ReflexElement flex={0.4}>
          <ReflexResizer className="pane-content">
            <ReflexContainer orientation="horizontal">

              <ControlledElement name="Pane 1"
                shrinkDirection={-1} {...this.ctrlProps}/>

              <ReflexSplitter propagate={true}/>

              <ControlledElement name="Pane 2"
                shrinkDirection={-1} {...this.ctrlProps}/>

              <ReflexSplitter propagate={true}/>

              <ControlledElement name="Pane 3"
                shrinkDirection={1} {...this.ctrlProps}/>

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
