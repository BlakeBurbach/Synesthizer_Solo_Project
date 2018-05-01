import React, { Component } from 'react';
import { Paper, Grid } from 'material-ui';
import ColorDisplay from './ColorDisplay/ColorDisplay';
import Synth1 from './InterfaceSynths/Synth1';
import Synth2 from './InterfaceSynths/Synth2';
import Synth3 from './InterfaceSynths/Synth3';
import ButtonsAndDials from './ButtonsAndDials/ButtonsAndDials'
import Tone from 'tone';

class Interface extends Component {
    constructor(){
        super()
        this.state = {
            tempo: 0
        }
    }
    componentDidMount(){
        let tempo = Tone.Transport.bpm.value = 120;
        this.setState({
            tempo: tempo
        })
        Tone.Transport.start();
    }
    render() {
        return (
            <Paper>
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
            </Paper>

        )
    }
}

export default Interface;