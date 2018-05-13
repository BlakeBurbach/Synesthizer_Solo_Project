import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid } from 'material-ui';
import ColorDisplay from './ColorDisplay/ColorDisplay';
import Synth1 from './InterfaceSynths/Synth1';
import Synth2 from './InterfaceSynths/Synth2';
import Synth3 from './InterfaceSynths/Synth3';
import Tone from 'tone';
import MasterControlPanel from './InterfaceSynths/MasterControl';
import './Interface.css';
import swal from 'sweetalert';

const mapStateToProps = state => ({
    state
});

class Interface extends Component {
    componentDidMount() {
        Tone.Transport.start();
    }

    handleSaveClick = () => {
        this.props.dispatch({
            type: 'POST_ALL_SYNTH_PARAMS',
            payload: [
                this.props.state.synthInterface.synth1,
                this.props.state.synthInterface.synth2,
                this.props.state.synthInterface.synth3,
                this.props.state.synthInterface.interfaceMasterControl,
                this.props.state.synthInterface.captureDisplayColor,
            ]
        })
        swal({
            title: "Saved!",
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
                </Grid>
            </Paper>
        )
    }
}

export default connect(mapStateToProps)(Interface);