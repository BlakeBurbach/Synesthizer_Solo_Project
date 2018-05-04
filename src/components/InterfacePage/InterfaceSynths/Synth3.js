import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tone from 'tone';
import Knob from 'react-canvas-knob';

const mapStateToProps = state => ({
    state
});

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
).toMaster(); // end bassSynth
let loop;

class Synth3 extends Component {
    constructor() {
        super()
        this.state = {
            note: '',
            volume: 0,
            looping: false
        }
    }

    triggerNote = (note) => {
        if (this.state.looping) {
            loop.stop()
            this.setState({
                note: note,
                looping: !this.state.looping
            })
            loop = new Tone.Loop(function (time) {
                bassSynth.triggerAttackRelease(note, "8n", time)
            }, "4n");
            this.props.dispatch({
                type: 'SYNTH_THREE_PARAMS',
                payload: this.state
            })
        } else {
            this.setState({
                looping: !this.state.looping
            })
            loop = new Tone.Loop(function (time) {
                bassSynth.triggerAttackRelease(note, "8n", time)
            }, "4n");
            loop.start()
            this.props.dispatch({
                type: 'SYNTH_THREE_PARAMS',
                payload: this.state
            })
        }// end if
    } // end triggerNote

    // onChange function to deal with volume of synth with a dial component
    handleVolume = (value) => {
        // console.log(synth)
        bassSynth.volume.rampTo(value);
        this.setState({
            volume: value
        }) // end setState
        this.props.dispatch({
            type: 'SYNTH_THREE_PARAMS',
            payload: this.state
        })
    } // end handleVolume
    render() {
        return (
            <Card style={{ maxWidth: "350px", padding: "15px" }} xs={3}>
                <CardContent>
                    <Typography variant="headline">
                        Synth 3
                </Typography>
                </CardContent>
                <div style={{ padding: "10px" }}>
                    <Slider />
                <Typography variant="title">
                    Volume:
                </Typography>
                <Knob min={-60} max={10} step={1} value={this.state.volume} onChange={this.handleVolume} />
                </div>
                <Button variant="raised" onClick={() => this.triggerNote("C2")}>C</Button>
                <Button variant="raised" onClick={() => this.triggerNote("D2")}>D</Button>
                <Button variant="raised" onClick={() => this.triggerNote("E2")}>E</Button>
                <Button variant="raised" onClick={() => this.triggerNote("F2")}>F</Button>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(Synth3);