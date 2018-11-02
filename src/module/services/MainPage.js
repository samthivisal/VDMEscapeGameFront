import React, {Component} from 'react';
//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';
//Import Material UI module
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tab, Tabs} from 'material-ui/Tabs';
import ActionChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
//Import Customs modules
import TableListBooking from './bookingsListing/tableListBooking';
import ConfigurableMenuMetric from './metric/configurableMenuMetric';
import Ranking from './ranking/ranking';
//Import Lodash module
import _ from 'lodash';
//Import FontAwesome module
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class MainPage extends Component {
  state = {
    reservations: [],
    ranking: [],
  };

  componentDidMount() {
    if (firebase.apps.length === 1) {
      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);

      const reservations = db.collection("reservation");
      const ranking = db.collection("themeRanking");

      reservations.onSnapshot((snapshot) => {
            this.storeReservations(snapshot, ranking);
          }
      );
    } else {
      this.props.history.push("/");
    }
  }

  storeReservations = (querySnapshot, ranking) => {
    const reservationsArray = [...this.state.reservations];

    querySnapshot.forEach((doc) => {
      const element = doc.data();
      element.id = doc.id;
      reservationsArray.push(element);
    });

    const uniqTableReservation = _.uniqBy(reservationsArray, (reservation) => {
      return reservation["id"];
    });

    this.setState({reservations: uniqTableReservation}, () => {
      ranking.onSnapshot((snapshot) => {
        this.storeRanking(snapshot);
      });
    });
  };

  storeRanking = (querySnapshot) => {
    const rankingArray = [...this.state.ranking];

    querySnapshot.forEach((doc) => {
      rankingArray.push(doc.data());
    });

    this.setState({ranking: rankingArray});
  };

  render() {
    const icon = (<FontAwesomeIcon className="fas fa-3x" icon={"trophy"}/>);

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
            <Tab
                value="ranking"
                icon={icon}
                children={<Ranking ranking={this.state.ranking}/>}
            />
          </Tabs>
        </MuiThemeProvider>
    )
  }
}

export default MainPage;
