import React, { Component } from 'react';
import { Paper, Grid, Button } from 'material-ui';
import Card, { CardContent, CardActions, CardMedia } from 'material-ui/Card';
import { Typography } from 'material-ui';
import InterfaceSwitch from '../../InterfaceSwitch/InterfaceSwitch';
import InterfaceSlider from '../../InterfaceSlider/InterfaceSlider';
import Divider from 'material-ui/Divider'

class Synth1 extends Component {
    render() {
        return (
            <Card style={{ maxWidth: "350px", padding: "10px" }}>
                <CardContent>
                    <Typography variant="display2">
                        Here is the first thing
                </Typography>
                </CardContent>
                <InterfaceSlider />
                <CardActions>
                    <Grid container spacing={8}
                    >
                        <InterfaceSwitch />
                        <InterfaceSwitch />
                        <br />
                        <Button variant="raised"></Button>
                        <Button variant="raised"></Button>

                    </Grid>
                </CardActions>
            </Card>
        )
    }
}

export default Synth1;