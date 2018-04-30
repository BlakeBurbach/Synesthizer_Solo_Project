import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
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
        <Typography variant="display2" style={{textAlign: "center"}}>
            List of Songs
          </Typography>  
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
