import React, {Component} from 'react';

//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';

//Import Material UI module
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';

//Import Customs modules
import TableListBooking from './bookingsListing/tableListBooking';
import ConfigurableMenuMetric from './metric/configurableMenuMetric';

//Import Lodash module
import _ from 'lodash';

import testJson from '../dataTest/test';

class MainPage extends Component {
  state = {
    reservations : []
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

    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);

    const reservations = db.collection("reservation");
    reservations.onSnapshot((snapshot) => {
      this.storeReservations(snapshot);
    });
  }

  storeReservations = (querySnapshot) => {
    const reservationsArray = [...this.state.reservations];
    querySnapshot.forEach((doc) => {
      const element = doc.data();
      element.id = doc.id;
      reservationsArray.push(element);
    });

    const uniqTableReservation = _.uniqBy(reservationsArray, (reservation) => {
      return reservation["id"];
    });

    this.setState({reservations : uniqTableReservation});

  };

  render() {
    return (
        <MuiThemeProvider>
          <Tabs contentContainerClassName="tabs-content"
                className="nav-bar"
          >
            <Tab
                value="reservations"
                icon={<ActionChromeReaderMode/>}
                children={<TableListBooking reservations={this.state.reservations}/>}
            />
            <Tab
                value="charts"
                icon={<ActionAssessment/>}
                children={<ConfigurableMenuMetric reservations={this.state.reservations}/>}
            />
          </Tabs>
        </MuiThemeProvider>
    )
  }
}

export default MainPage;
