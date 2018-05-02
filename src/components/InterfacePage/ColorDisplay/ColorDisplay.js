import React, { Component } from 'react';
import Card, { CardMedia } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import Scribble from 'scribble-fork';


class ColorDisplay extends Component {
    
    render() {
        return (
            <Card style={{ maxHeight: "300px", padding:"8px" }}>
                <Paper>
                    <Typography variant="display4" style={{textAlign: "center"}}>
                        <P5Wrapper sketch={sketch} Scribble={Scribble}/>
                    </Typography>
                </Paper>
                <CardMedia src="/details/img/random_particles.jpg"/>  
            </Card>
        )
    }
}

export default ColorDisplay;