import React, { Component } from 'react';
import { Paper, Grid, Button } from 'material-ui';
import Card, { CardContent, CardActions, CardMedia } from 'material-ui/Card';
import ColorDisplay from './ColorDisplay/ColorDisplay';
import Synth1 from './InterfaceSynths/Synth1';
import Synth2 from './InterfaceSynths/Synth2';
import Synth3 from './InterfaceSynths/Synth3';

class Interface extends Component {
    render() {
        return (
            <Paper>
                <Grid container spacing={12}
                    justify="flex-start"
                    alignItems="flex-start"
                    direction="row">
                    <Grid item xs={12}>
                        <ColorDisplay />
                    </Grid>
                    <Grid item xs={3}>
                        <Synth1 />
                    </Grid>
                    <Grid item xs={3}>
                        <Synth2 />
                    </Grid>
                    <Grid item xs={3}>
                        <Synth3 />
                    </Grid>
                </Grid>
            </Paper>
            
        )
    }
}

export default Interface;