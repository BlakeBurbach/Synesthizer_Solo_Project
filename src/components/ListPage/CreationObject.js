import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Typography, TextField, Paper, IconButton } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import { Delete, Edit, Cancel } from 'material-ui-icons';
import ColorStreamList from './ColorStreamList';

const mapStateToProps = state => ({
    state
});

class CreationObject extends Component {
    constructor() {
        super()
        // editingTitle will determine whether or not to show and give the user an input
        // to change the title of a creation object or not
        this.state = {
            editingTitle: false, 
            creationTitle: '',
        }
    }

    // click event to tell ListPage to fire off delete function to tell which object to delete
    handleDeleteClick = () => {
        this.props.deleteCreation(this.props.creationObject);
    } // end handleDeleteClick

    // function to watch for any changes to this.state.creationTitle by way of input field
    handleTitleChange = (event) => {
        this.setState({
            creationTitle: event.target.value
        }); // end setState
        this.props.dispatch({
            type: 'UPDATE_CREATION_TITLE', 
            payload: {...this.state, creationTitle: event.target.value }
        })
    } // end handleTitleChange

    // click event to tell ListPage to fire off the updateCreationTitle function to give the object a title
    updateCreationTitle = (event, creationTitle) => {
        event.preventDefault();
        console.log('clicking edit', this.props.creationObject._id, creationTitle);
        this.props.dispatch({
          type: 'UPDATE_CREATION_TITLE',
          payload: {
            id: this.props.creationObject._id,
            newTitle: this.state.creationTitle
          }
        })
      }

    // click event to tell ListPage to fire off the updateCreationTitle function to update the object's title
    handleEditClick = () => {
        // set editingTitle to true to access the input field to rename an object
        this.setState({
            editingTitle: true
        })
    } // end handleEditClick

    // click event to change editingTitle back to false to cancel the update title request
    cancelEditTitle = () => {
        this.setState({
            editingTitle: false
        })
    } // end handleEditTitle
    render() {
        let creationListObject;
        // if statement to give the user an option to edit the title of each creation object.
        // if this is true, give them an input, an edit button to save change, or a cancel button
        if (this.state.editingTitle) {
            creationListObject = <div>
                <Typography variant="headline" style={{float: "left"}}>
                    Would you like to change the title?
                </Typography>
                <form onSubmit={this.updateCreationTitle}>
                <TextField label="Title" color="secondary" value={this.state.creationTitle} onChange={this.handleTitleChange}/>
                <IconButton variant="fab" type="submit" style={{float: "right"}}>
                    <Edit />
                </IconButton>
                <IconButton onClick={this.cancelEditTitle} style={{float: "right"}}>
                    <Cancel />
                </IconButton>
                </form>
            </div>
            // if false, just show the default creation object.
            // Original title, edit button to give you the option to change title, and a delete button
            // to delete the creation object.
        } else {
            creationListObject = <div>
                <div>
                <Typography variant="display1" style={{float: "left", padding: "8px"}}>
                    {this.props.creationObject.master_control_params.creationTitle}
                </Typography>
                <IconButton onClick={this.handleDeleteClick} style={{float: "right"}}>
                    <Delete />
                </IconButton>
                <IconButton onClick={this.handleEditClick} style={{float: "right"}}>
                    <Edit />
                </IconButton>
                </div>
            </div>
        }
        return (
            <Grid item xs={6} sm={12}>
                <Paper>
                    <Card>
                        {/* ColorStreamList is a copy of the ColorStream graph from
                        the interface */}
                        <ColorStreamList />
                    </Card>
                </Paper>
                <Card>
                    <CardContent>
                        <div style={{ textAlign: "center" }}>
                            {creationListObject}
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(CreationObject);