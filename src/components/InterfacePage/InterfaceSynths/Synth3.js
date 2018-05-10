import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from 'material-ui';
import Card from 'material-ui/Card';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tone from 'tone';
import Knob from 'react-canvas-knob';

const mapStateToProps = state => ({
    state
});
// define the chorus and bassSynth components
let chorus = new Tone.Chorus(4, 2.5, 0.5);
let bassSynth = new Tone.FMSynth(
    {
        harmonicity: 3,
        modulationIndex: 10,
        detune: 0,
        oscillator: {
            type: 'sine'
        },
        envelope: {
            attack: 0.01,
            decay: 0.01,
            sustain: 1,
            release: 0.5
        },
        modulation: {
            type: 'square'
        },
        modulationEnvelope: {
            attack: 0.5,
            decay: 0,
            sustain: 1,
            release: 0.5
        }
    }
); // end bassSynth
let loop;

// connect chorus to master output. Connect it to bassSynth's output so whatever is output
// from bassSynth goes through the chorus and then to master output
chorus.toMaster();
bassSynth.connect(chorus);

class Synth3 extends Component {
    constructor() {
        super()
        this.state = {
            note: '',
            volume: 0,
            chorusModulation: 0,
            looping: false
        }
    }

    // function to change the note being played by the bass and loop that note over
    triggerNote = (note) => {
        // if it's looping, stop it
        if (this.state.looping) {
            loop.stop();
            this.setState({
                looping: !this.state.looping
            }); // end setState
            // send the stopped looping value to redux state
            this.props.dispatch({
                type: 'SYNTH_THREE_PARAMS',
                payload: {...this.state, looping: !this.state.looping}
            }) // end dispatch
        } else {
            // if not looping, change the note to the button's chord value and start looping with
            // that chord
            this.setState({
                note: note,
                looping: !this.state.looping
            }); // end setState
            loop = new Tone.Loop(function (time) {
                bassSynth.triggerAttackRelease(note, "8n", time)
            }, "4n");
            loop.start();
            // send the note and the changed looping value to redux state
            this.props.dispatch({
                type: 'SYNTH_THREE_PARAMS',
                payload: {...this.state, note: note, looping: !this.state.looping}
            }); // end dispatch
        } // end if
    }; // end triggerNote

    // change the chorus's modulation value with the slider
    handleChorus = (value) => {
        chorus.frequency.rampTo(value);
        this.setState({
            chorusModulation: value
        }); // end setState
        // send chorus info to redux state
        this.props.dispatch({
            type: 'SYNTH_THREE_PARAMS',
            payload: {...this.state, chorusModulation: value}
        }); // end dispatch
    }; // end handleChorus

    // onChange function to deal with volume of synth with a dial component
    handleVolume = (value) => {
        bassSynth.volume.rampTo(value);
        this.setState({
            volume: value
        }); // end setState
        // send volume value for synth2 to redux state
        this.props.dispatch({
            type: 'SYNTH_THREE_PARAMS',
            payload: {...this.state, volume: value}
        }); // end dispatch
    }; // end handleVolume
    render() {
        return (
            <Card style={{ maxWidth: "350px", padding: "15px" }} xs={3}>
                <div style={{ padding: "10px" }}>
                {/* <Typography variant="title">
                    Chorus:
                </Typography> */}
                    <Slider min={0} max={10} step={1} value={this.state.chorusModulation} onChange={this.handleChorus} />
                {/* <Typography variant="title">
                    Volume:
                </Typography> */}
                <Knob min={-60} max={10} step={1} value={this.state.volume} onChange={this.handleVolume} />
                </div>
                <Button variant="raised" onClick={() => this.triggerNote("A1")}>A</Button>
                <Button variant="raised" onClick={() => this.triggerNote("B1")}>B</Button>
                <Button variant="raised" onClick={() => this.triggerNote("C2")}>C</Button>
                <Button variant="raised" onClick={() => this.triggerNote("D2")}>D</Button>
                <Button variant="raised" onClick={() => this.triggerNote("E2")}>E</Button>
                <Button variant="raised" onClick={() => this.triggerNote("F2")}>F</Button>
                <Button variant="raised" onClick={() => this.triggerNote("G2")}>G</Button>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Synth3);