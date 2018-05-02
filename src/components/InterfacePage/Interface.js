import React, { Component } from 'react';
import { Paper, Grid } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Typography } from 'material-ui';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Knob from 'react-canvas-knob';
import ColorDisplay from './ColorDisplay/ColorDisplay';
import Synth1 from './InterfaceSynths/Synth1';
import Synth2 from './InterfaceSynths/Synth2';
import Synth3 from './InterfaceSynths/Synth3';
import Tone from 'tone';

class Interface extends Component {
    constructor(){
        super()
        this.state = {
            tempo: 120
        }
    }
    componentDidMount(){
        Tone.Transport.start();
    }

    handleTempo = (value) => {
        Tone.Transport.bpm.rampTo(value);
        this.setState({
            tempo: value
        })
    }
    render() {
        return (
            <Paper>
                <Grid container spacing={8}
                    justify="center"
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
                        <Card>
                            <Typography variant="display2">
                                Master Control
                            </Typography>
                            <Knob min={60} max={180} step={1} value={this.state.tempo} onChange={this.handleTempo} />
                        </Card>    
                    </Grid>
                </Grid>
            </Paper>

        )
    }
}

export default Interface;