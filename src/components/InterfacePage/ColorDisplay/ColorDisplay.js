import React, { Component } from 'react';
import { Paper, Grid, Button } from 'material-ui';
import Card, { CardContent, CardActions, CardMedia } from 'material-ui/Card';
import { Typography } from 'material-ui';


class ColorDisplay extends Component {
    render() {
        return (
            <Card style={{ maxWidth: "948px", maxHeight: "300px", padding:"20px" }}>
                <Paper>
                    <Typography variant="display4">
                        Here i am
                    </Typography>
                </Paper>
            </Card>
        )
    }
}

export default ColorDisplay;