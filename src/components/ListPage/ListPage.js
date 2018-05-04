import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Grid } from 'material-ui';
import CreationObject from './CreationObject';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  state
});

class InfoPage extends Component {

  componentDidMount() {
    // if (!this.props.user.isLoading && this.props.user.userName === null) {
    //   this.props.history.push('home');
    // }
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER && 'FETCH_ALL_CREATION_DATA'
    });
  }

  deleteCreation = (creationObject) => {
    console.log('clicking delete', creationObject._id);
    this.props.dispatch({
      type: 'DELETE_CREATION_OBJECT',
      payload: creationObject
    })
  }

  updateCreationTitle = (creationObject) => {
    console.log('clicking edit', creationObject._id, creationObject.master_control_params.creationTitle);
    this.props.dispatch({
      type: 'UPDATE_CREATION_TITLE', 
      payload: creationObject
    })
  }


  render() {

    let creationListItems = this.props.state.synthInterface.setupListPage.map((creationObject) => {
      return (<CreationObject key={creationObject._id} creationObject={creationObject} deleteCreation={this.deleteCreation} updateCreationTitle={this.updateCreationTitle}/>)
    })
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Typography variant="display1" style={{ float: "left", paddingRight: "10px" }}>
            Welcome, {this.props.user.userName}!
          </Typography>
          <Button variant="raised" onClick={this.logout} style={{ float: "right" }}>
            Log Out
          </Button>
        </div>
      );
    }

    return (
      <div>
        <div style={{ float: "right", padding: "5px" }}>
          {content}
        </div>
        <Nav />
        <Typography variant="display2" style={{ textAlign: "center" }}>
          List of Creations
        </Typography>
        <Grid container spacing={16} direction="column" justify="center" alignItems="center">
          {creationListItems}
        </Grid>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
