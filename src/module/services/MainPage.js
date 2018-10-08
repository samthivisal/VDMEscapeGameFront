import React, {Component} from 'react';

//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';
import config from '../config/config';

//Import Material UI module
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';

//Import Customs modules
import TableListReservation from './reservationsListing/TableListReservation';

//Import Lodash module
import _ from 'lodash';

class MainPage extends Component {
  state = {
    reservations : []
  };

  componentDidMount() {
    firebase.initializeApp(config);

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
                children={<TableListReservation reservations={this.state.reservations}/>}
            />
            <Tab
                value="charts"
                icon={<ActionAssessment/>}
            />
          </Tabs>
        </MuiThemeProvider>
    )
  }
}

export default MainPage;
