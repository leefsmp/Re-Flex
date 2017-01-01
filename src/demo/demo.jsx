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

ReactDOM.render(
  <ReflexBasicDemo/>,
  document.getElementById('demo-basic'))


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

ReactDOM.render(
  <ReflexBasicSplitterDemo/>,
  document.getElementById('demo-basic-splitter'))


/////////////////////////////////////////////////////////
// vertical re-flex layout with double
// resizable splitter propagation
//
/////////////////////////////////////////////////////////
class ReflexSplitterPropagationDemo
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

ReactDOM.render(
  <ReflexSplitterPropagationDemo/>,
  document.getElementById('demo-splitter-propagation'))


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
      onResize: this.onResizeElement.bind(this),
      forceResize: true
    }
  }

  componentDidMount () {

    this.forceUpdate()
  }

  onResizeElement (e) {

    e.domElement.classList.add('resizing')

    this.forceUpdate()
  }

  onStopResizeElement (e) {

    e.domElement.classList.remove('resizing')

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
                        Left Pane Top
                        <br/>
                        (splitter propagation)
                      </label>
                    </ReflexResizer>
                  </ReflexElement>
                  <ReflexSplitter propagate={true}/>
                  <ReflexElement {...this.elementProps}>
                    <ReflexResizer className="pane-content">
                      <label>
                        Left Pane Middle
                        <br/>
                        (splitter propagation)
                      </label>
                    </ReflexResizer>
                  </ReflexElement>
                  <ReflexSplitter propagate={true}/>
                  <ReflexElement {...this.elementProps}>
                    <ReflexResizer className="pane-content">
                      <label>
                        Left Pane Bottom
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
                          Right Pane Bottom
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

ReactDOM.render(
  <ReflexAdvancedDemo/>,
  document.getElementById('demo-advanced'))
