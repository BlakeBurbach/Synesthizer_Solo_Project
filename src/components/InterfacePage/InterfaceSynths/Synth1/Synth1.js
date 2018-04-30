import React, { Component } from 'react';
import { Grid, Button } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Typography } from 'material-ui';
import InterfaceSwitch from '../../../InterfaceSwitch/InterfaceSwitch';
import InterfaceSlider from '../../../InterfaceSlider/InterfaceSlider';
import Tone from 'tone';

class Synth1 extends Component {

    startLoop = (loop) => {
        loop.start();
    }
    stopLoop = (loop) => {
        loop.stop();
    }
    getWet = (event, delay) => {
        delay.wet.value = event.target.value
        console.log(event.target.value);
    }
 
    render() {
        const delay = new Tone.FeedbackDelay(0.2, 0.7);
        delay.toMaster();
        const synth = new Tone.Synth().connect(delay).toMaster();
        const loop = new Tone.Loop(function (time) {
            synth.triggerAttackRelease("C2", "8n", time);
        }, "4n");
        Tone.Transport.start();
        return (
            <Card style={{ maxWidth: "350px", padding: "20px" }} xs={3}>
                <CardContent>
                    <Typography variant="display2">
                        Synth 1
                </Typography>
                </CardContent>
                <Grid container alignItems="center"
                    justify="center"
                    direction="row">
                    <InterfaceSwitch />
                    <InterfaceSwitch />
                </Grid>
                <div style={{ padding: "10px" }}>
                    <InterfaceSlider defaultValue={40} min={0.2} max={0.7} value={delay.wet} onChange={()=>this.getWet}/>
                </div>
                <Button variant="raised" onClick={()=>this.startLoop(loop)}>Engage</Button>
                <Button variant="raised" onClick={()=>this.stopLoop(loop)}>Disengage</Button>
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
                <Button variant="raised"></Button>
            </Card>
        )
    }
}

export default Synth1;