import React, { Component } from 'react';
import { Button } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Typography } from 'material-ui';
import Tone from 'tone';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Knob from 'react-canvas-knob';

//create the synth, delay, and loop objects
let synth = new Tone.PolySynth(4, Tone.Synth);
let delay = new Tone.FeedbackDelay(0, 0.7);
let loop = new Tone.Loop(function (time) {
    synth.triggerAttackRelease(["C3", "E3", "G3", "B3"], "8n", time);
}, "4n");
//route delay to Master output and then connect delay to synth output chain 
// that will go to master. 
delay.toMaster();
synth.connect(delay);

class Synth1 extends Component {
    constructor() {
        super()
        this.state = {
            delayTime: 0,
            volume: -6,
            looping: false,
            chord: []
        }
    }

    // ["C3", "E3", "G3", "B3"] CMaj7
    // ["D3", "F3", "A3", "C3"] Dmin7
    // ["F3", "A3", "C4", "E4"] Fmaj7
    // ["E3", "G3", "B4", "D4"] Emin7

    componentDidMount() {
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
        } else {
            this.setState({
                looping: !this.state.looping
            })
            loop = new Tone.Loop(function (time) {
                synth.triggerAttackRelease(chord, "8n", time)
            }, "4n");
            loop.start()
        }// end if
        // console.log(chord);
    }


    // onChange function to deal with delay time value with a slider
    handleDelay = (value) => {
        delay.delayTime.rampTo(value);
        this.setState({
            delayTime: value
        })
    } // end handleDelay

    // onChange function to deal with volume of synth with a dial component
    handleVolume = (value) => {
        // console.log(synth)
        synth.volume.rampTo(value);
        this.setState({
            volume: value
        }) // end setState
    } // end handleVolume

    render() {
        return (
            <Card style={{ maxWidth: "350px", padding: "20px" }} xs={3}>
                <CardContent>
                    <Typography variant="display2">
                        Synth 1
                    </Typography>
                </CardContent>
                <div style={{ padding: "10px" }}>
                    <Slider min={0} max={0.7} step={0.01} value={this.state.delayTime} onChange={this.handleDelay} />
                    <Knob min={-60} max={5} step={1} value={this.state.volume} onChange={this.handleVolume} />
                </div>
                <Button variant="raised" onClick={() => this.handleChordChange(["C3", "E3", "G3", "B3"])}>CMaj7</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(["D3", "F3", "A3", "C3"])}>Dmin7</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(["F3", "A3", "C4", "E4"])}>Fmaj7</Button>
                <Button variant="raised" onClick={() => this.handleChordChange(["E3", "G3", "B4", "D4"])}>Emin7</Button>
            </Card>
        )
    }
}

export default Synth1;