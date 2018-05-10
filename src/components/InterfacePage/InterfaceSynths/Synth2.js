import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from 'material-ui';
import Card from 'material-ui/Card';
import Tone from 'tone';
import Knob from 'react-canvas-knob';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const mapStateToProps = state => ({
    state
});
// create the drum synth object and connect it to the loop function
let drumSynth = new Tone.MembraneSynth();
let delay = new Tone.FeedbackDelay(0.7);
let loop = new Tone.Loop(function (time) {
    drumSynth.triggerAttackRelease("C2", "2n", time);
});

// connect delay to master output. Connect it to drumSynth's output so whatever is output
// from drumSynth goes through the delay and then to master output
delay.toMaster();
drumSynth.connect(delay);

class Synth2 extends Component {
    constructor() {
        super();
        this.state = {
            drumVolume: 0,
            delayTime: 0,
            looping: false, 
            clicked: false
        }
    }
    // onClick function to tell the drum loop to start or stop based on if looping is true or false
    handleDrums = () => {
        this.setState({
            looping: !this.state.looping,
            clicked: !this.state.clicked
        }); // end setState
        if (this.state.looping === false) {
            loop.start();
            // send updated looping value to redux state
            this.props.dispatch({
                type: 'SYNTH_TWO_PARAMS',
                payload: {...this.state, looping: !this.state.looping}
            }); // end dispatch
        } else {
            loop.stop();
            // send updated looping value to redux state
            this.props.dispatch({
                type: 'SYNTH_TWO_PARAMS',
                payload: {...this.state, looping: !this.state.looping}
            }); // end dispatch
        } // end if
    }; // end handleDrums

    // dial onChange function to control the volume of the drum loop
    handleVolume = (value) => {
        drumSynth.volume.rampTo(value);
        this.setState({
            drumVolume: value
        }); // end setState
        // send updated volume data to redux state as it changes
        this.props.dispatch({
            type: 'SYNTH_TWO_PARAMS',
            payload: {...this.state, drumVolume: value}
        }); // end dispatch
    }; // end handleVolume

    // onChange function to deal with delay time value with a slider
    handleDelay = (value) => {
        delay.delayTime.rampTo(value);
        this.setState({
            delayTime: value
        }); // end setState
        // send updated delayTime to reduxState as it changes
        this.props.dispatch({
            type: 'SYNTH_TWO_PARAMS',
            payload: {...this.state, delayTime: value}
        }); // end dispatch
    } // end handleDelay
    render() {
        let coolButton;
        if(this.state.clicked){
            coolButton = <Button color="primary" variant="raised" onClick={this.handleDrums}>dum</Button>
        } else {
            coolButton = <Button variant="raised" onClick={this.handleDrums}>dum</Button>
        }
        return (
            <Card style={{ maxWidth: "400px", padding: "15px" }} xs={3}>
                <div style={{ padding: "10px" }}>
                    {/* <Typography variant="title">
                        Delay:
                    </Typography> */}
                    <Slider min={0} max={0.7} step={0.01} value={this.state.delayTime} onChange={this.handleDelay} />
                    {/* <Typography variant="title">
                        Volume:
                </Typography> */}
                    <Knob min={-60} max={10} step={1} value={this.state.drumVolume} onChange={this.handleVolume} />
                </div>
                {coolButton}
                {/* <Button variant="raised" onClick={this.handleDrums}>Drums</Button> */}
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Synth2);