import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Typography, TextField, Button } from 'material-ui';
import Knob from 'react-canvas-knob';
import Tone from 'tone';

const mapStateToProps = state => ({
    state
});

class MasterControlPanel extends Component {
    constructor(){
        super()
        this.state = {
            creationTitle: '',
            tempo: 120,
            volume: 0
        }
    }
    // onChange function to create a title for our creation
    createTitle = creationTitle => event => {
        this.setState({
            [creationTitle]: event.target.value
        })
        // send title to Redux State as it's being created
        this.props.dispatch({
            type: 'INTERFACE_MASTER_PARAMS',
            payload: {...this.state, [creationTitle]: event.target.value}
        }) // end dispatch
    } // end createTitle

    // onChange function to update Tempo with corresponding Knob
    handleTempo = (value) => {
        Tone.Transport.bpm.rampTo(value);
        this.setState({
            tempo: value
        }) // end setState
        // send tempo value to redux state as it changes
        this.props.dispatch({
            type: 'INTERFACE_MASTER_PARAMS',
            payload: {...this.state, tempo: value}
        }) // end dispatch
    } // end handleTempo

    // onChange function to update volume data with corresponding knob
    handleVolume = (value) => {
        Tone.Master.volume.rampTo(value)
        this.setState({
            volume: value
        }) // end setState
        // send updated volume data to redux state as it changes
        this.props.dispatch({
            type: 'INTERFACE_MASTER_PARAMS',
            payload: {...this.state, volume: value}
        }) // end dispatch
    } // end handleVolume

    // click function to tell interface to gather all info from all components and send to database
    handleSaveClick = () => {
        this.props.handleSaveClick()
    } // end handleSaveClick

    render(){
        return (
            <Card style={{ maxWidth: "300px", padding: "15px" }}>
            {/* <Typography variant="headline">
                Master Control
            </Typography> */}
            <TextField label="Title" value={this.state.creationTitle} onChange={this.createTitle('creationTitle')} style={{padding: "10px"}}/>
            <Button variant="raised" onClick={this.handleSaveClick}>SAVE</Button>
            <hr />
            <br />
            <div style={{ float: "left" }}>
                {/* <Typography variant="title">
                    Tempo:
            </Typography> */}
                <Knob min={60} max={180} step={1} value={this.state.tempo} onChange={this.handleTempo} />
            </div>
            <div style={{ float: "right" }}>
                {/* <Typography variant="title">
                    Volume:
                </Typography> */}
                <Knob min={-60} max={10} step={1} value={this.state.volume} onChange={this.handleVolume} />
            </div>
        </Card>
        )
    }
}

export default connect(mapStateToProps)(MasterControlPanel)