import React, { Component } from 'react';
import { Button } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Typography } from 'material-ui';
import Tone from 'tone';
import Knob from 'react-canvas-knob';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    state
});
// create the drum synth object and connect it to the loop function
let drumSynth = new Tone.MembraneSynth().toMaster();
let loop = new Tone.Loop(function (time) {
    drumSynth.triggerAttackRelease("C2", "2n", time);
});

class Synth2 extends Component {
    constructor() {
        super();
        this.state = {
            drumVolume: 0,
            looping: false
        }
    }
    componentDidMount() {
    }
    // onClick function to tell the drum loop to start or stop based on if looping is true or false
    handleDrums = () => {
        this.setState({
            looping: !this.state.looping
        })
        if (this.state.looping === false) {
            loop.start();
            this.props.dispatch({
                type: 'SYNTH_TWO_PARAMS',
                payload: this.state
            })
        } else {
            loop.stop();
            this.props.dispatch({
                type: 'SYNTH_TWO_PARAMS',
                payload: this.state
            })
        } // end if
    } // end handleDrums

    // dial onChange function to control the volume of the drum loop
    handleVolume = (value) => {
        drumSynth.volume.rampTo(value);
        this.setState({
            drumVolume: value
        }) // end setState
        this.props.dispatch({
            type: 'SYNTH_TWO_PARAMS',
            payload: this.state
        })
    } // end handleVolume
    render() {
        return (
            <Card style={{ maxWidth: "350px", padding: "15px" }} xs={3}>
                <CardContent>
                    <Typography variant="headline">
                        Synth 2
                    </Typography>
                </CardContent>
                <div  style={{ padding: "10px" }}>
                <Typography variant="title">
                    Volume:
                </Typography>
                <Knob min={-60} max={10} step={1} value={this.state.drumVolume} onChange={this.handleVolume} />
                </div>
                <Button variant="raised" onClick={this.handleDrums}>Drums</Button>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Synth2);