import React, { Component } from 'react';
import { Grid, Button } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Typography } from 'material-ui';
import InterfaceSwitch from '../../InterfaceSwitch/InterfaceSwitch';
import Tone from 'tone';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Knob from 'react-canvas-knob';
// import './index.js'

class Synth1 extends Component {
    constructor(){
        super()
        this.state = {
            synth: {},
            delay: {},
            loop: {},
            delayTime: 0,
            frequency: 200
        }
    }
    

    componentDidMount(){
        //create the synth, delay, and loop objects and set them as their correlating state objects
        let synth = new Tone.PolySynth(4, Tone.Synth);
        let delay = new Tone.FeedbackDelay(0, 0.7);
        let loop = new Tone.Loop(function (time) {
            synth.triggerAttackRelease(["C3", "E3", "A3", "C4"], "8n", time);
        }, "4n");
        //route delay to Master output and then connect delay to synth output chain 
        // that will go to master. 
        delay.toMaster();
        synth.connect(delay);
        console.log(synth)
        this.setState({
            synth: synth,
            delay: delay,
            loop: loop,
        })
    }

    startLoop = (loop) => {
        this.state.loop.start();
    }
    stopLoop = (loop) => {
        this.state.loop.stop();
    }
    handleDelay = (value) => {
        this.state.delay.delayTime.rampTo(value);
        this.setState({
            delayTime: value
        })
    }
    handleFreq = (value) => {
        this.state.synth.detune.rampTo(value);
        this.setState({
            frequency: value
        })
        this.state.synth.triggerAttackRelease(this.state.frequency)
    }

    render() {
        return (
            <Card style={{ maxWidth: "350px", padding: "20px" }} xs={3}>
                <CardContent>
                    <Typography variant="display2">
                        Synth 1
                    </Typography>
                </CardContent>
                {/* <Grid container alignItems="center"
                    justify="center"
                    direction="row">
                    <InterfaceSwitch />
                    <InterfaceSwitch />
                </Grid> */}
                <div style={{ padding: "10px" }}>
                    <Slider min={0} max={0.7} step={0.01} value={this.state.delayTime} onChange={this.handleDelay}/>
                    <Knob min={200} max={210} step={0.5} value={this.state.frequency} onChange={this.handleFreq}/>
                </div>
                <Button variant="raised" onClick={() => this.startLoop(this.state.loop)}>Start</Button>
                <Button variant="raised" onClick={() => this.stopLoop(this.state.loop)}>Stop</Button>

            </Card>
        )
    }
}

export default Synth1;