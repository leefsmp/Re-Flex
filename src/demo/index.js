import ReactDOM from 'react-dom'
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from '../../dist/lib'

import './demo.scss'

class ReflexDemo extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor () {

    super()

    this.elementProps = {
      onStopResize: this.onStopResizeElement.bind(this),
      onResize: this.onResizeElement.bind(this)
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onResizeElement (e) {

    e.domElement.classList.add('resizing')
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onStopResizeElement (e) {

    e.domElement.classList.remove('resizing')
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    return (
      <ReflexContainer orientation="horizontal">
        <ReflexElement className="header" flex={0.1}>
          <div className="pane-content">Header (fixed)</div>
        </ReflexElement>
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement {...this.elementProps}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement {...this.elementProps}>
                  <div className="pane-content">Left Pane Top</div>
                </ReflexElement>
                <ReflexSplitter/>
                <ReflexElement {...this.elementProps}>
                  <div className="pane-content">Left Pane Middle</div>
                </ReflexElement>
                <ReflexSplitter/>
                <ReflexElement {...this.elementProps}>
                  <div className="pane-content">Left Pane Bottom</div>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            <ReflexSplitter/>
            <ReflexElement flex={0.5} {...this.elementProps}>
              <div className="pane-content">Middle Pane</div>
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
                  <div className="pane-content">Right Pane Bottom</div>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexElement className="footer" flex={0.1}>
          <div className="pane-content">Footer (fixed)</div>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

ReactDOM.render(<ReflexDemo/>, document.getElementById('root'))
