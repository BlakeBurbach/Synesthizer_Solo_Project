import React, { Component } from 'react';
import Card from 'material-ui/Card';
import ReactKnob from '../../ReactKnob/ReactKnob';
import Button from 'material-ui/Button';
import { CardActions } from 'material-ui';
import InterfaceSlider from '../../InterfaceSlider/InterfaceSlider';

class ButtonsAndDials extends Component {
    render() {
        return (
            <Card style={{ maxWidth: "350px", maxHeight: "500px", padding: "20px" }} xs={3}>
                <CardActions>
                    <Button variant="raised">x</Button>
                    <Button variant="raised">x</Button>
                </CardActions>
                <ReactKnob />
                <ReactKnob />
                <InterfaceSlider />
                <InterfaceSlider />
            </Card>
        )
    }
}

export default ButtonsAndDials;