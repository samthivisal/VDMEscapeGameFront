import React, {Component} from 'react';
import firebase from "firebase";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './signup.css';

class Signup extends Component {
  state = {
    email: "",
    password: "",
    passwordSecond: ""
  };

  handleChange = (state, typed) => {
    this.setState({
      [state]: typed.target.value
    });
  };

  handleSubmit() {
    if (this.state.password === this.state.passwordSecond){
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((response) => {
            this.props.history.push("/");
          })
          .catch(function (error) {
            alert(error.message);
            console.log(error);
          });
    } else {
      alert("Password does not match with the second password");
      this.setState({
        password : "",
        passwordSecond : ""
      })
    }
  }

  redirectLogin = () => {
    this.props.history.push("/");
  };

  render() {
    return (
        <div className="form-container">
          <form className="signup-form">
            <span className='signup-title'>Register</span>
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
            <TextField
                label="Password verification"
                type="password"
                value={this.state.passwordSecond}
                onChange={(e) => {
                  this.handleChange("passwordSecond", e)
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
              Sign up
            </Button>
            <Button
                className="button-signup"
                color="primary"
                onClick={() => {
                  this.redirectLogin()
                }}
            >
              Have an account ?
            </Button>
          </form>
        </div>
    )
  }
}


export default Signup;