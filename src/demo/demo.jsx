import ReactDOM from 'react-dom'
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from '../../dist/lib'


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
            Left Pane (fixed)
          </div>
        </ReflexElement>

        <ReflexElement className="right-pane">
          <div className="pane-content">
            Right Pane (fixed)
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
            Left Pane (resizable)
          </div>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement className="right-pane"
          minSize="200"
          maxSize="800">
          <div className="pane-content">
            Right Pane (resizable)
            <br/>
            <br/>
            minSize = 200px
            <br/>
            maxSize = 800px
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
          Left Pane (resizable)
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="middle-pane"
          minSize="200"
          maxSize="800">
          <div className="pane-content">
            Middle Pane (resizable)
            <br/>
            <br/>
            minSize = 200px
            <br/>
            maxSize = 400px
          </div>
        </ReflexElement>

        <ReflexSplitter propagate={true}/>

        <ReflexElement className="right-pane">
          <div className="pane-content">
          Right Pane (resizable)
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
      onResize: this.onResizeElement.bind(this)
    }
  }

  onResizeElement (e) {

    e.domElement.classList.add('resizing')
  }

  onStopResizeElement (e) {

    e.domElement.classList.remove('resizing')
  }

  render () {

    return (
      <ReflexContainer orientation="horizontal">
        <ReflexElement className="header" flex={0.1}>
          <div className="pane-content">
            Header (fixed)
          </div>
        </ReflexElement>
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement {...this.elementProps}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement {...this.elementProps}>
                  <div className="pane-content">
                    Left Pane Top
                    <br/>
                    (splitter propagation)
                  </div>
                </ReflexElement>
                <ReflexSplitter propagate={true}/>
                <ReflexElement {...this.elementProps}>
                  <div className="pane-content">
                    Left Pane Middle
                    <br/>
                   (splitter propagation)
                  </div>
                </ReflexElement>
                <ReflexSplitter propagate={true}/>
                <ReflexElement {...this.elementProps}>
                  <div className="pane-content">
                    Left Pane Bottom
                    <br/>
                    (splitter propagation)
                  </div>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            <ReflexSplitter/>
            <ReflexElement flex={0.5} {...this.elementProps}>
              <div className="pane-content">
                Middle Pane
              </div>
            </ReflexElement>
            <ReflexSplitter/>
            <ReflexElement {...this.elementProps}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement {...this.elementProps}>
                  <ReflexContainer orientation="vertical">
                    <ReflexElement {...this.elementProps}>
                      <div className="pane-content">
                        Right Pane <br/>Upper-Left
                      </div>
                    </ReflexElement>
                    <ReflexSplitter/>
                    <ReflexElement {...this.elementProps}>
                      <div className="pane-content">
                        Right Pane <br/>Upper-Right
                      </div>
                    </ReflexElement>
                  </ReflexContainer>
                </ReflexElement>
                <ReflexSplitter/>
                <ReflexElement {...this.elementProps}>
                  <div className="pane-content">
                    Right Pane Bottom
                  </div>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexElement className="footer" flex={0.1}>
          <div className="pane-content">
            Footer (fixed)
          </div>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

ReactDOM.render(
  <ReflexAdvancedDemo/>,
  document.getElementById('demo-advanced'))
