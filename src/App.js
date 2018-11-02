import React, {Component} from 'react';
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import firebase from 'firebase';

//Import Customs modules
import MainPage from './module/services/MainPage';
import LoginPage from './module/login/LoginPage';
import SignUp from './module/signup/Signup';

//Import fontAwesome
import {library} from '@fortawesome/fontawesome-svg-core';

import {
  faAtom,
  faFemale,
  faFire,
  faGamepad,
  faHandHoldingUsd,
  faMale,
  faPlus,
  faSnowflake,
  faTree,
  faTrophy,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

library.add(faFemale, faMale, faFire, faUsers, faHandHoldingUsd, faSnowflake, faTree, faPlus, faGamepad, faAtom, faTrophy);

class App extends Component {
  componentDidMount() {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: "vdm-escape-game",
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
    });
  }

  render() {
    return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LoginPage}/>
              <Route path='/Main' component={MainPage}/>
              <Route path='/SignUp' component={SignUp}/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
