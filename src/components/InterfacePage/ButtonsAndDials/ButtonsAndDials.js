import React, { Component } from 'react';
import Card from 'material-ui/Card';
import ReactKnob from '../../ReactKnob/ReactKnob'

class ButtonsAndDials extends Component {
    render() {
        return (
            <Card style={{ maxWidth: "350px", maxHeight: "500px", padding: "20px" }} xs={3}>
                <ReactKnob />
                <ReactKnob />
            </Card>
        )
    }
}

export default ButtonsAndDials;