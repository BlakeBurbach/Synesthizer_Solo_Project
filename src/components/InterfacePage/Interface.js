import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid } from 'material-ui';
import { Typography } from 'material-ui';
import ColorDisplay from './ColorDisplay/ColorDisplay';
import Synth1 from './InterfaceSynths/Synth1';
import Synth2 from './InterfaceSynths/Synth2';
import Synth3 from './InterfaceSynths/Synth3';
import Tone from 'tone';
import MasterControlPanel from './InterfaceSynths/MasterControl';

const mapStateToProps = state => ({
    state
});

class Interface extends Component {
    constructor() {
        super()
        this.state = {
            creationTitle: '',
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

    handleSaveClick = () => {
        this.props.dispatch({
            type: 'POST_ALL_SYNTH_PARAMS',
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
                    <Grid item xs={3}>
                        <Synth3 />
                    </Grid>
                    <Grid item xs={3}>
                        <MasterControlPanel handleSaveClick={this.handleSaveClick}/>
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