import React, { Component } from 'react';
import { Paper, Grid } from 'material-ui';
import Card from 'material-ui/Card';
import { Typography } from 'material-ui';
import Knob from 'react-canvas-knob';
import ColorDisplay from './ColorDisplay/ColorDisplay';
import Synth1 from './InterfaceSynths/Synth1';
import Synth2 from './InterfaceSynths/Synth2';
import Synth3 from './InterfaceSynths/Synth3';
import Tone from 'tone';

class Interface extends Component {
    constructor() {
        super()
        this.state = {
            Synth1: Synth1,
            Synth2: Synth2,
            tempo: 120,
            volume: 0
        }
    }
    componentDidMount() {
        Tone.Transport.start();
    }

    handleTempo = (value) => {
        Tone.Transport.bpm.rampTo(value);
        this.setState({
            tempo: value
        })
    }
    handleVolume = (value) => {
        Tone.Master.volume.rampTo(value)
        this.setState({
            volume: value
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
                        <Synth1 Synth1={this.state.Synth1} voleum />
                    </Grid>
                    <Grid item xs={3}>
                        <Synth2 />
                    </Grid>
                    <Grid item xs={3}>
                        <Synth3 />
                    </Grid>
                    <Grid item xs={3}>
                        <Card style={{ maxWidth: "350px", padding: "15px" }}>
                            <Typography variant="headline">
                                Master Control
                            </Typography>
                            <Typography variant="title">
                                Tempo:
                            </Typography>
                            <Knob min={60} max={180} step={1} value={this.state.tempo} onChange={this.handleTempo} />
                            <Typography variant="title">
                                Volume:
                            </Typography>
                            <Knob min={-60} max={10} step={1} value={this.state.volume} onChange={this.handleVolume} />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <Typography variant="display1">
                                Sequencer
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

        )
    }
}

export default Interface;