import React, { Component } from 'react';
import Card, { CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Knob from 'react-canvas-knob';

class ButtonsAndDials extends Component {
    render() {
        return (
            <Card style={{ maxWidth: "350px", maxHeight: "500px", padding: "20px" }} xs={3}>
                <CardActions>
                    <Button variant="raised">x</Button>
                    <Button variant="raised">x</Button>
                </CardActions>
                <Knob onChage={this.handleChange}/>
                <Knob onChange={this.handleChange}/>
                <Slider onChange={this.handleChange}/>
                <Slider onChange={this.handleChange}/>
            </Card>
        )
    }
}

export default ButtonsAndDials;