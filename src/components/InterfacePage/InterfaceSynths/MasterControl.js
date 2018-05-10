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
    createTitle = creationTitle => event => {
        this.setState({
            [creationTitle]: event.target.value
        })
        this.props.dispatch({
            type: 'INTERFACE_MASTER_PARAMS',
            payload: {...this.state, [creationTitle]: event.target.value}
        })
    }

    handleTempo = (value) => {
        Tone.Transport.bpm.rampTo(value);
        this.setState({
            tempo: value
        })
        this.props.dispatch({
            type: 'INTERFACE_MASTER_PARAMS',
            payload: {...this.state, tempo: value}
        })
    }
    handleVolume = (value) => {
        Tone.Master.volume.rampTo(value)
        this.setState({
            volume: value
        })
        this.props.dispatch({
            type: 'INTERFACE_MASTER_PARAMS',
            payload: {...this.state, volume: value}
        })
    }

    handleSaveClick = () => {
        this.props.handleSaveClick()
    }

    render(){
        return (
            <Card style={{ maxWidth: "300px", padding: "15px" }}>
            <Typography variant="headline">
                Master Control
            </Typography>
            <TextField label="Title" value={this.state.creationTitle} onChange={this.createTitle('creationTitle')} style={{padding: "10px"}}/>
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
        )
    }
}

export default connect(mapStateToProps)(MasterControlPanel)