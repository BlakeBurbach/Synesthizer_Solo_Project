import React, { Component } from 'react';
import { Grid, Button, Typography, TextField } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Delete, Edit } from 'material-ui-icons';


class CreationObject extends Component {
    constructor(){
        super()
        this.state = {
            editingTitle: false
        }
    }
    
    // click event to tell ListPage to fire off delete function to tell which object to delete
    handleDeleteClick = () => {
        this.props.deleteCreation(this.props.creationObject);
    } // end handleDeleteClick

    handleTitleChange = creationTitle => (event) => {
        this.setState({
            creationTitle: event.target.value
        });
    }

    // click event to tell ListPage to fire off the updateCreationTitle function to give the object a title
    handleCreateTitle = (event) => {
        event.preventDefault();
        this.props.updateCreationTitle(this.props.creationObject, this.state.creationTitle);
    } // end handleCreationTitleClick

    // click event to tell ListPage to fire off the updateCreationTitle function to update the object's title
    handleEditClick = () => {
        // set editingTitle to true to access the input field to rename an object
        this.setState({
            editingTitle: true
        })
        this.props.updateCreationTitle(this.props.creationObject);
    } // end handleEditClick

    // click event to change editingTitle back to false to cancel the update title request
    cancelEditTitle = () => {
        this.setState({
            editingTitle: false
        })
    } // end handleEditTitle
    render() {
        let creationListObject;
        if (this.state.editingTitle) {
            creationListObject = <div>
                                <Typography variant="title">
                                    Would you like to change the title?
                                </Typography>
                                <TextField label="Title"/>
                                <Button onClick={this.handleCreateTitleClick}>
                                    <Edit />
                                </Button>
                                <Button variant="raised" onClick={this.cancelEditTitle}>
                                    Cancel
                                </Button>
                            </div>
        } else {
            creationListObject = <div>
                            <Typography variant="title">
                                Title: {this.props.creationObject.master_control_params.creationTitle}
                            </Typography>
                            <Button onClick={this.handleDeleteClick}>
                                <Delete />
                            </Button>
                            <Button onClick={this.handleEditClick}>
                                <Edit />
                            </Button>
                            </div>
        }
        return (
            <Grid item xs={6} sm={12}>
                <Card>
                    <CardContent>
                        {creationListObject}
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default CreationObject;