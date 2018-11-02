import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import firebase from 'firebase';
import 'firebase/auth';

import Logo from '../../logo.png';

import './login.css';

class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = (state, typed) => {
    this.setState({
      [state]: typed.target.value
    });
  };

  handleSubmit(event) {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
          this.props.history.push("/Main");
        })
        .catch(function (error) {
          alert(error.message);
          console.log(error);
        });
  }

  redirectSignUp = () => {
    this.props.history.push("/SignUp");
  };

  render() {
    return (
        <div className="form-container">
          <form className="login-form">
            <img alt="logo-vdm" src={Logo}/>
            <TextField
                label="Email"
                value={this.state.email}
                onChange={(e) => {
                  this.handleChange("email", e)
                }}
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={this.state.password}
                onChange={(e) => {
                  this.handleChange("password", e)
                }}
                margin="normal"
            />
            <Button
                className="button-login"
                color="primary"
                onClick={() => {
                  this.handleSubmit()
                }}
            >
              Sign in
            </Button>
            <Button
                className="button-signup"
                color="primary"
                onClick={() => {
                  this.redirectSignUp()
                }}
            >
              Don't have account ? Sign up
            </Button>
          </form>
        </div>
    )
  }
}

export default LoginPage;
