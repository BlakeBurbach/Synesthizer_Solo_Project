import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Card, Grid, TextField } from 'material-ui';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const request = new Request('api/user/register', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      // making the request to the server to post the country
      fetch(request)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
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
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        <div style={{ color: 'white' }}>
          {this.renderAlert()}
        </div>
        <Grid container alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={6}>
            <Card style={{ margin: "20px" }}>
              <form className="loginForm" onSubmit={this.registerUser}>
                <Typography variant="display2" color="secondary" style={{ padding: "10px", textAlign: "center" }}>
                  Register User
                </Typography>
                <TextField
                  type="text"
                  name="username"
                  label="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
                <br />
                <TextField
                  type="password"
                  name="password"
                  label="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <div style={{ padding: "20px" }}>
                  <Button
                    type="submit"
                    name="submit"
                    value="Register"
                    variant="raised"
                    color="secondary">
                    Submit
                  </Button>
                  <Button variant="raised" style={{ float: "right" }} color="secondary">
                    <Link to="/home" style={{ textDecoration: "none" }}>Cancel</Link>
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

export default RegisterPage;

