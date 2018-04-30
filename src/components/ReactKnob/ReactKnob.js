import React, { Component } from 'react';
import Knob from 'react-canvas-knob';
import './index.js'

class ReactKnob extends Component {
  state = {value: 50};

  handleChange = (newValue) => {
    this.setState({value: newValue});
  };

  render() {
    return (
      <Knob
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default ReactKnob;