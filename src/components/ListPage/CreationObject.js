import React, { Component } from 'react';
import { Grid, Button, Typography } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Delete, Edit } from 'material-ui-icons';


class CreationObject extends Component {

    handleDeleteClick = () => {
        this.props.deleteCreation(this.props.creationObject);
    }
    handleEditClick = () => {
        this.props.updateCreationTitle(this.props.creationObject);
    }
    render() {
        return (
            <Grid item xs={6} sm={12}>
                
                <Card>
                    <CardContent>
                        <Typography variant="title">
                            Creation
                        </Typography>
                        tempo: {this.props.creationObject.master_control_params.tempo},
                        volume: {this.props.creationObject.master_control_params.volume}
                    </CardContent>
                    <Button onClick={this.handleDeleteClick}>
                        <Delete/>
                    </Button>
                    <Button onClick={this.handleEditClick}>
                        <Edit />
                    </Button>
                </Card>
            </Grid>
        )
    }
}

export default CreationObject;