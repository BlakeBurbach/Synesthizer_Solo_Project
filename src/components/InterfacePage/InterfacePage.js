import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';
import Button from 'material-ui/Button'
import Interface from './Interface.js';
import Typography from 'material-ui/Typography'


const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
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

  logout = () => {
    this.props.dispatch({
      type: LOGIN_ACTIONS.LOGOUT
    });
    // this.props.history.push('home');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Typography variant="display2">
            Welcome, { this.props.user.userName }!
          </Typography>
          <Button variant="raised" onClick={this.logout}>
            Log Out
          </Button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        <Interface />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

