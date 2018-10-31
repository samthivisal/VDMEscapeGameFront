import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import 'firebase/auth';

import './login.css';

class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    firebase.initializeApp({
      apiKey: process.env.REACT_FIREBASE_API_KEY,
      authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_FIREBASE_DATABASE_URL,
      projectId: "vdm-escape-game",
      storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDER_ID
    });
  }

  handleChange = (state, typed) => {
    this.setState({
      [state]: typed.target.value
    });
  };

  handleSubmit(event) {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
          this.props.handleIsLoginPage();
        })
        .catch(function (error) {
          alert(error.message);
          console.log("caca");
          console.log(error);
        });
  }

  render() {
    return (
        <div className="form-container">
          <form className="login-form">
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
          </form>
        </div>
    )
  }
}

export default LoginPage;
