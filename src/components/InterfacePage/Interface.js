import React, { Component } from 'react';
import { Paper, Grid, Button } from 'material-ui';
import Card, { CardContent, CardActions, CardMedia } from 'material-ui/Card';
import ColorDisplay from './ColorDisplay/ColorDisplay';
import Synth1 from './InterfaceSynths/Synth1';
import Synth2 from './InterfaceSynths/Synth2';
import Synth3 from './InterfaceSynths/Synth3';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
}

class Interface extends Component {
    render() {
        return (
            <Paper>
                <Grid container spacing={0}
                    justify="center">
                    <Grid item>
                        <ColorDisplay />
                    </Grid>
                    <Grid item>
                        <Synth1 />
                    </Grid>
                    <Grid item>
                        <Synth2 />
                    </Grid>
                    <Grid item>
                        <Synth3 />
                    </Grid>
                </Grid>
            </Paper>
            
        )
    }
}

export default Interface;