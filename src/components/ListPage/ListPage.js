import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Grid, Paper } from 'material-ui';
import CreationObject from './CreationObject';
import swal from 'sweetalert';
import './ListPage.css';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  state
});

class InfoPage extends Component {

  componentDidMount() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER && 'FETCH_ALL_CREATION_DATA'
    });
  }

  deleteCreation = (creationObject) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((deleteCreation) => {
      if (deleteCreation) {
        swal({
          title: "Deleted",
        });
        this.props.dispatch({
          type: 'DELETE_CREATION_OBJECT',
          payload: creationObject
        })
      } else {
        swal({
          title:"Saved"
        });
      }
    });
  }

  render() {

    let creationListItems = this.props.state.synthInterface.setupListPage.map((creationObject) => {
      return (<CreationObject
        key={creationObject._id}
        creationObject={creationObject}
        deleteCreation={this.deleteCreation}/>)
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
        <Paper>
          <Typography variant="display2" style={{ textAlign: "center", padding: "20px" }}>
            List of Creations
          </Typography>
          <Grid container spacing={16} direction="column" justify="center" alignItems="center">
            {creationListItems}
          </Grid>
        </Paper>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
