import React, { Component } from 'react';
import { Grid, Button } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Typography } from 'material-ui';
import InterfaceSwitch from '../../InterfaceSwitch/InterfaceSwitch';
import Tone from 'tone';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Knob from 'react-canvas-knob';


class Synth1 extends Component {
    constructor(){
        super()
        this.state = {
            synth: {},
            delay: {},
            loop: {},
            delayTime: 0,
            volume: -6,
            looping: false, 
            chord: ["C3", "E3", "G3"]
        }
    }
    
// ["C3", "E3", "G3"]

    componentDidMount(){
        //create the synth, delay, and loop objects and set them as their correlating state objects
        let synth = new Tone.PolySynth(4, Tone.Synth);
        let delay = new Tone.FeedbackDelay(0, 0.7);
        let loop = new Tone.Loop(function (time) {
            synth.triggerAttackRelease(["C3", "E3", "G3"], "8n", time);
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
    // click handler function to start and stop loop based on whether or not looping is true or false
    handleLoop = () => {
        this.setState({
            looping: !this.state.looping
        })
        if(this.state.looping === false){
            this.state.loop.start();
        } else {
            this.state.loop.stop();
        } // end if
    } // end handleLoop

    // onChange function to deal with delay time value with a slider
    handleDelay = (value) => {
        this.state.delay.delayTime.rampTo(value);
        this.setState({
            delayTime: value
        })
    } // end handleDelay

    // onChange function to deal with volume of synth with a dial component
    handleVolume = (value) => {
        this.state.synth.volume.rampTo(value);
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
                    <Slider min={0} max={0.7} step={0.01} value={this.state.delayTime} onChange={this.handleDelay}/>
                    <Knob min={-60} max={5} step={1} value={this.state.volume} onChange={this.handleVolume}/>
                </div>
                <Button variant="raised" onClick={this.handleLoop}>Loop</Button>
            </Card>
        )
    }
}

export default Synth1;