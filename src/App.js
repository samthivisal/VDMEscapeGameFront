import React, {Component} from 'react';
import './App.css';

//Import Customs modules
import MainPage from './module/services/MainPage';
import LoginPage from './module/login/LoginPage';

//Import fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFemale, faMale, faFire, faUsers, faHandHoldingUsd, faSnowflake, faTree} from '@fortawesome/free-solid-svg-icons';

library.add(faFemale, faMale, faFire, faUsers, faHandHoldingUsd, faSnowflake, faTree);

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
