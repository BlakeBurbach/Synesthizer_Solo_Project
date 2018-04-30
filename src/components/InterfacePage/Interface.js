import React, { Component } from 'react';
import { Paper, Grid } from 'material-ui';
import ColorDisplay from './ColorDisplay/ColorDisplay';
import Synth1 from './InterfaceSynths/Synth1';
import Synth2 from './InterfaceSynths/Synth2';
import Synth3 from './InterfaceSynths/Synth3';
import ButtonsAndDials from './ButtonsAndDials/ButtonsAndDials'

class Interface extends Component {
    render() {
        return (
            <Paper>
                <Grid>
                    <Grid container spacing={8}
                        justify="space-around"
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
                        <Grid item xs={3}>
                            <ButtonsAndDials />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

        )
    }
}

export default Interface;