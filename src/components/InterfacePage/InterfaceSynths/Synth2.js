import React, { Component } from 'react';
import {Grid, Button } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Typography } from 'material-ui';
import InterfaceSwitch from '../../InterfaceSwitch/InterfaceSwitch';
import InterfaceSlider from '../../InterfaceSlider/InterfaceSlider';
import Tone from 'tone';

class Synth2 extends Component {
    constructor(){
        super();
        this.state = {
            drumSynth: {},
            loop: {},
            looping: false
        }
    }
    componentDidMount(){
        let drumSynth = new Tone.MembraneSynth().toMaster();
        let loop = new Tone.Loop(function(time){
            drumSynth.triggerAttackRelease("C2", "2n", time);
        });
        this.setState({
            drumSynth: drumSynth,
            loop: loop
        });    
    }
    handleDrums = () => {
        this.setState({
            looping: !this.state.looping
        })
        if(this.state.looping === false){
            this.state.loop.start();
        } else {
            this.state.loop.stop();
        }
    }
    render() {
        return (
            <Card style={{ maxWidth: "350px", padding: "20px" }} xs={3}>
                <CardContent>
                    <Typography variant="display2">
                        Synth 2
                </Typography>
                </CardContent>
                {/* <Grid container alignItems="center"
                    justify="center"
                    direction="row">
                    <InterfaceSwitch />
                    <InterfaceSwitch />
                </Grid> */}
                {/* <div style={{ padding: "10px" }}>
                    <InterfaceSlider />
                </div> */}
                <Button variant="raised" onClick={this.handleDrums}>Drums</Button>
            </Card>
        )
    }
}

export default Synth2;