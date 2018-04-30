import React, { Component } from 'react';
import { Paper, Grid, Button } from 'material-ui';
import Card, { CardContent, CardActions, CardMedia } from 'material-ui/Card';
import { Typography } from 'material-ui';
import InterfaceSwitch from '../../InterfaceSwitch/InterfaceSwitch';
import InterfaceSlider from '../../InterfaceSlider/InterfaceSlider';
import { typography } from 'material-ui/styles';

class Synth3 extends Component {
    render() {
        return (
            <Card style={{ maxWidth: "375px", padding: "20px" }} xs={3}>
                <CardContent>
                    <Typography variant="display2">
                        Synth 3
                </Typography>
                </CardContent>
                <Grid container
                        alignItems="center"
                        justify="center"
                        direction="row">
                <InterfaceSwitch />
                <InterfaceSwitch />
                </Grid>
                <InterfaceSlider />
                {/* <CardActions> */}
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
                {/* </CardActions> */}
            </Card>
        )
    }
}

export default Synth3;