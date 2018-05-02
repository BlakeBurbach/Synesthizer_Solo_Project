import React, { Component } from 'react';
import { Button } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Typography } from 'material-ui';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Synth3 extends Component {
    render() {
        return (
            <Card style={{ maxWidth: "350px", padding: "20px" }} xs={3}>
                <CardContent>
                    <Typography variant="display2">
                        Synth 3
                </Typography>
                </CardContent>
                <div style={{ padding: "10px" }}>
                    <Slider />
                </div>
                <Button variant="raised">x</Button>
                <Button variant="raised">x</Button>
            </Card>
        )
    }
}

export default Synth3;