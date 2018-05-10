import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { Button, Typography, Card, Grid, TextField } from 'material-ui';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('/interface');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  renderAlert = () => {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.props.login.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        <div style={{color: 'white'}}>
        {this.renderAlert()}
        </div>
        <Grid container alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={6}>
            <Card style={{margin: "20px"}}>
              <form className="loginForm" onSubmit={this.login}>
                <Typography variant="display2" color="secondary" style={{ padding: "10px", textAlign: "center" }}>
                  Login
                </Typography>
                    <TextField
                      type="username"
                      name="username"
                      label="Username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      color="secondary"
                    />
                    <br />
                  <TextField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    color="secondary"
                  />
                <div style={{padding: "20px"}}>
                  <Button
                    type="submit"
                    name="submit"
                    value="Log In"
                    variant="raised"
                    color="secondary">
                    Login
                  </Button>
                  <Button variant="raised" style={{ float: "right" }} color="secondary">
                    <Link to="/register" style={{ textDecoration: "none" }}>Register</Link>
                  </Button>
                </div>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default connect(mapStateToProps)(LoginPage);
