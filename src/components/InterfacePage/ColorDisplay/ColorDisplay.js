import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardMedia } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
// import * as p5 from './p5.js';



const mapStateToProps = state => ({
    state
});

class ColorDisplay extends Component {

    render() {
        return (
            <Card style={{ maxHeight: "300px", padding:"8px" }}>
                <Paper>
                    <Typography variant="display4" style={{textAlign: "center"}}>
                        {/* <P5Wrapper sketch={sketch} mapStateToProps={mapStateToProps}/> */}
                    </Typography>
                </Paper>
                <CardMedia src="/details/img/random_particles.jpg"/>  
            </Card>
        )
    }
}

export default connect(mapStateToProps)(ColorDisplay);