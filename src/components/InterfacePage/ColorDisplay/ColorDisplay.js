import React, { Component } from 'react';
import Card, { CardMedia } from 'material-ui/Card';


class ColorDisplay extends Component {
    render() {
        return (
            <Card style={{ maxWidth: "948px", maxHeight: "300px", padding:"20px" }}>
                {/* <Paper>
                    <Typography variant="display4">
                        Here i am
                    </Typography>
                </Paper> */}
                <CardMedia src="/details/img/random_particles.jpg"/>  
            </Card>
        )
    }
}

export default ColorDisplay;