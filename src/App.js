import React, {Component} from 'react';
import './App.css';

//Import Customs modules
import MainPage from './module/services/MainPage';
import LoginPage from './module/login/LoginPage';

class App extends Component {
  state = {
    isLoginPage: false,
  };

  render() {
    return (
        <div>
          {this.state.isLoginPage ? <LoginPage/> : <MainPage/>}
        </div>
    );
  }
}

export default App;
