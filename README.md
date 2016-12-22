# reflex

Get the AMD module located at `reflex.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'Reflex': 'reflex'
  }
});

require(['react', 'Reflex'], function(React, Reflex) {

  React.render(React.createElement(Reflex), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
