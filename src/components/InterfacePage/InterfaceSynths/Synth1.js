import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from 'material-ui';
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
//route delay and reverb to Master output and then connect them to synth output chain 
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
            chord: []
        }
    }
    
    handleChordChange = (chord) => {
        if (this.state.looping) {
            loop.stop()
            this.setState({
                chord: chord,
                looping: !this.state.looping
            })
            loop = new Tone.Loop(function (time) {
                synth.triggerAttackRelease(chord, "8n", time)
            }, "4n");
            this.props.dispatch({
                type: 'SYNTH_ONE_PARAMS',
                payload: this.state
            })
        } else {
            this.setState({
                looping: !this.state.looping
            })
            loop = new Tone.Loop(function (time) {
                synth.triggerAttackRelease(chord, "8n", time)
            }, "4n");
            loop.start()
            this.props.dispatch({
                type: 'SYNTH_ONE_PARAMS',
                payload: this.state
            })
        }// end if
    }


    // onChange function to deal with delay time value with a slider
    handleDelay = (value) => {
        delay.delayTime.rampTo(value);
        this.setState({
            delayTime: value
        })
        this.props.dispatch({
            type: 'SYNTH_ONE_PARAMS',
            payload: this.state
        })
    } // end handleDelay

    // onChange function to deal with volume of synth with a dial component
    handleVolume = (value) => {
        synth.volume.rampTo(value);
        this.setState({
            volume: value
        }) // end setState
        this.props.dispatch({
            type: 'SYNTH_ONE_PARAMS',
            payload: this.state
        })
    } // end handleVolume

    render() {
        return (
            <Card style={{ maxWidth: "350px", padding: "15px" }} xs={3}>
                <div style={{ padding: "10px" }}>
                    <Typography variant="title">
                        Delay:
                    </Typography>
                    <Slider min={0} max={0.7} step={0.01} value={this.state.delayTime} onChange={this.handleDelay} />
                    <Typography variant="title">
                        Volume:
                    </Typography>
                    <Knob min={-60} max={10} step={1} value={this.state.volume} onChange={this.handleVolume} />
                </div>
                <Button variant="raised" onClick={() => this.handleChordChange(["A3", "C3", "E4", "G4"])}>Amin7</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(["B3", "D3", "F#4", "A4"])}>Bmin7</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(["C3", "E3", "G3", "B3"])}>CMaj7</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(["D3", "F3", "A3", "C3"])}>Dmin7</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(["E3", "G3", "B4", "D4"])}>Emin7</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(["F3", "A3", "C4", "E4"])}>Fmaj7</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(["G3", "B3", "D4", "F#4"])}>Gmaj7</Button>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Synth1);