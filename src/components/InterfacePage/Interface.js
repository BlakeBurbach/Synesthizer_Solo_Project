import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Paper, Grid, TextField } from 'material-ui';
import Card from 'material-ui/Card';
import { Typography } from 'material-ui';
import Knob from 'react-canvas-knob';
import ColorDisplay from './ColorDisplay/ColorDisplay';
import Synth1 from './InterfaceSynths/Synth1';
import Synth2 from './InterfaceSynths/Synth2';
// import Synth3 from './InterfaceSynths/Synth3';
import Tone from 'tone';

const mapStateToProps = state => ({
    state
});

class Interface extends Component {
    constructor() {
        super()
        this.state = {
            songTitle: '',
            tempo: 120,
            volume: 0
        }
    }
    componentDidMount() {
        Tone.Transport.start();
    }
    componentDidUpdate() {
        console.log(this.props.state.synthInterface)
    }

    handleTempo = (value) => {
        Tone.Transport.bpm.rampTo(value);
        this.setState({
            tempo: value
        })
        this.props.dispatch({
            type: 'INTERFACE_MASTER_PARAMS',
            payload: this.state
        })
    }
    handleVolume = (value) => {
        Tone.Master.volume.rampTo(value)
        this.setState({
            volume: value
        })
        this.props.dispatch({
            type: 'INTERFACE_MASTER_PARAMS',
            payload: this.state
        })
    }

    handleChange = songTitle => event => {
        this.setState({
            [songTitle]: event.target.value,
        });
    };

    handleSaveClick = () => {
        this.props.dispatch({
            type: 'GET_ALL_SYNTH_PARAMS',
            payload: [
                this.props.state.synthInterface.synth1,
                this.props.state.synthInterface.synth2,
                this.props.state.synthInterface.interfaceMasterControl
            ]
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
                    {/* <Grid item xs={3}>
                        <Synth3 />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                        <Card style={{ maxWidth: "300px", padding: "15px" }}>
                            <Typography variant="headline">
                                Master Control
                            </Typography>
                            <br />
                            <Button variant="raised" onClick={this.handleSaveClick}>SAVE</Button>
                            <hr />
                            <br />
                            <div style={{ float: "left" }}>
                                <Typography variant="title">
                                    Tempo:
                            </Typography>
                                <Knob min={60} max={180} step={1} value={this.state.tempo} onChange={this.handleTempo} />
                            </div>
                            <div style={{ float: "right" }}>
                                <Typography variant="title">
                                    Volume:
                                </Typography>
                                <Knob min={-60} max={10} step={1} value={this.state.volume} onChange={this.handleVolume} />
                            </div>
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

export default connect(mapStateToProps)(Interface);