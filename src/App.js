import React, {Component} from 'react';
import './App.css';

//Import Customs modules
import MainPage from './module/services/MainPage';
import LoginPage from './module/login/LoginPage';

//Import fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFemale, faMale, faFire, faUsers, faHandHoldingUsd, faSnowflake, faTree, faPlus, faGamepad, faAtom, faTrophy} from '@fortawesome/free-solid-svg-icons';

library.add(faFemale, faMale, faFire, faUsers, faHandHoldingUsd, faSnowflake, faTree, faPlus, faGamepad, faAtom, faTrophy);

class App extends Component {
  state = {
    isLoginPage: true,
  };

  handleIsLoginPage = () => {
    this.setState({
      isLoginPage: !this.state.isLoginPage
    })
  };

  render() {
    return (
        <div>
          {this.state.isLoginPage ? <LoginPage handleIsLoginPage={() => {this.handleIsLoginPage()} }/> : <MainPage/>}
        </div>
    );
  }
}

export default App;
