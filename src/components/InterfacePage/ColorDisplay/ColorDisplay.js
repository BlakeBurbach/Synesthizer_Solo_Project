import React, { Component } from 'react';
import Card, { CardMedia } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography'


class ColorDisplay extends Component {
    render() {
        return (
            <Card style={{ maxHeight: "300px", padding:"8px" }}>
                <Paper>
                    <Typography variant="display4" style={{textAlign: "center"}}>
                        Sick Display
                    </Typography>
                </Paper>
                <CardMedia src="/details/img/random_particles.jpg"/>  
            </Card>
        )
    }
}

export default ColorDisplay;