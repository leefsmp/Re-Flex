import Reflex from '../lib/reflex'
import React from 'react/addons'

describe('Re-flex Basic Test', function() {

  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <Reflex/>
    )
  })

  it('should render', function() {

    expect(component.getDOMNode().className).toEqual(
      ' reflex-layout reflex-container vertical')
  })
})
