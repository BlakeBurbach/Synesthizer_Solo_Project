import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';
import Card from 'material-ui/Card';
import Tone from 'tone';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Knob from 'react-canvas-knob';

const mapStateToProps = state => ({
    state
});
//create the synth, delay, reverb, and loop objects
let synth = new Tone.PolySynth(4, Tone.Synth);
let delay = new Tone.FeedbackDelay(0, 0.7);
let loop;
//route delay to Master output and then connect them to synth output chain 
// that will go to master. 
delay.toMaster();
synth.chain(delay);
synth.volume.rampTo(-10);

class Synth1 extends Component {
    constructor() {
        super()
        this.state = {
            delayTime: 0,
            volume: -10,
            looping: false,
            chord: {
                chord: [],
                colorNum: 0
            }
        };
    };
    componentDidMount(){
        this.props.dispatch({
            type: "SYNTH_ONE_PARAMS",
            payload: this.state.chord
        })
    }

    // function to watch which chord button is being pushed. Change the state chord to that button's
    // chord value, and then update the loop to play the loop with that chord.
    handleChordChange = (chordColor) => {
    // If the loop has already been started by another button, stop the loop, change the chord, 
    // then start the loop back up with the new chord.
        if (this.state.looping) {
            loop.stop()
            this.setState({
                looping: !this.state.looping
            }); // end setState
            // send updated chord and looping values to redux state
            this.props.dispatch({
                type: 'SYNTH_ONE_PARAMS',
                payload: {...this.state, chord: chordColor, looping: !this.state.looping}
            }); // end dispatch
    // If not looping, start the loop with the new chord button that has been pushed
        } else {
            this.setState({
                chord: chordColor,
                looping: !this.state.looping
            }); // end setState
            loop = new Tone.Loop(function (time) {
                synth.triggerAttackRelease(chordColor.chord, "8n", time)
            }, "4n");
            loop.start()
            this.props.dispatch({
                type: 'SYNTH_ONE_PARAMS',
                payload: {...this.state, chord: chordColor ,looping: !this.state.looping}
            }); // end dispatch
        }// end if
    }; // end handleChordChange


    // onChange function to deal with delay time value with a slider
    handleDelay = (value) => {
        delay.delayTime.rampTo(value);
        this.setState({
            delayTime: value
        }); // end setState
        // dispatch the new delay value to redux state
        this.props.dispatch({
            type: 'SYNTH_ONE_PARAMS',
            payload: {...this.state, delayTime: value}
        }); // end dispatch
    }; // end handleDelay

    // onChange function to deal with volume of synth with a dial component
    handleVolume = (value) => {
        synth.volume.rampTo(value);
        this.setState({
            volume: value
        }); // end setState
        this.props.dispatch({
            type: 'SYNTH_ONE_PARAMS',
            payload: {...this.state, volume: value}
        }); // end dispatch
    }; // end handleVolume

    render() {
        let chordColor = {
            chord: this.state.chord,
            colorNum: 0
        };
        return (
            <Card style={{ maxWidth: "400px", padding: "15px" }} xs={3}>
                <div style={{ padding: "10px" }}>
                    <Slider min={0} max={0.7} step={0.01} value={this.state.delayTime} onChange={this.handleDelay} />
                    <Knob min={-60} max={10} step={1} value={this.state.volume} onChange={this.handleVolume} />
                </div>
                <Button variant="raised" onClick={() => this.handleChordChange(chordColor = {chord:["A3", "C3", "E4", "G4"], colorNum: 0})}>bleep</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(chordColor = {chord:["B3", "D3", "F#4", "A4"], colorNum: 1})}>bloop</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(chordColor = {chord:["C3", "E3", "G3", "B3"], colorNum: 2})}>dorp</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(chordColor = {chord: ["D3", "F3", "A3", "C3"], colorNum: 3})}>vip</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(chordColor = {chord: ["E3", "G3", "B4", "D4"], colorNum: 4})}>zoop</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(chordColor = {chord: ["F3", "A3", "C4", "E4"], colorNum: 5})}>zim</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(chordColor = {chord: ["G3", "B3", "D4", "F#4"], colorNum: 6})}>worlp</Button>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Synth1);