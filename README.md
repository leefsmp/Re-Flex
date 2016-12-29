![re-flex](./re-f%7Cex-banner.png)

# About Re-F|ex

Re-F|ex is a flex-based React layout component library which I created because none of the components I found out there could satisfy my requirements.

It intends to be powerful and address the needs of advanced React Web applications that requires resizable layouts

Here is a basic demo:

```js
import ReactDOM from 'react-dom'
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 're-flex'

import './demo.scss'


class ReflexBasicDemo extends React.Component {

  /////////////////////////////////////////////////////////
  // Basic vertical re-flex layout non-resizable
  //
  /////////////////////////////////////////////////////////
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
```

## Documentation & Samples

[Click here and try the live samples ...](https://leefsmp.github.io/Re-Flex/index.html)

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
