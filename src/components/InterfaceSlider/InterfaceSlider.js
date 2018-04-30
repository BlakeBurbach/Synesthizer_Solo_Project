import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class InterfaceSlider extends Component {
    render() {
        return (
            <div style={{padding: "10px"}}>
                <Slider defaultValue={this.props.defaultValue}/>
            </div>
        )
    }
}

export default InterfaceSlider;