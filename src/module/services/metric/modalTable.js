import React, {Component} from 'react';

//Import Lodash module
import _ from 'lodash';

//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';

//Import Antd module
import 'antd/dist/antd.css';
import {Button, Modal} from 'antd';

//Import Custom module
import TableContent from './tableContent';

class ModalTable extends Component {
  state = {
    personalReservations: [],
    menBooking: [],
    womenBooking: [],
    menUnder18: {}
  };

  componentDidMount() {
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    const personalReservationsArray = [];
    db.settings(settings);

    const reservations = db.collection("personalReservation");

    if (typeof this.props.bookingsFiltered !== "undefined") {
      _.forEach(this.props.bookingsFiltered, (booking) => {
        reservations.where("reservationID", "==", booking.id)
            .onSnapshot((snapshot) => {
              snapshot.forEach((snapshot) => {
                personalReservationsArray.push(snapshot.data());
              });

              this.setState({personalReservations: personalReservationsArray});
              this.storeStatisticsByGender(personalReservationsArray);
              this.storeStatisticsGenderByAge();
            });
      });
    }
  }

  storeStatisticsGenderByAge = () => {
    this.storeStatisticsByAgeByVR(this.state.menBooking, "menUnder18", 0, 17);
    this.storeStatisticsByAgeByVR(this.state.menBooking, "men1825", 18, 24);
    this.storeStatisticsByAgeByVR(this.state.menBooking, "men2539", 25, 39);
    this.storeStatisticsByAgeByVR(this.state.menBooking, "men4054", 40, 54);
    this.storeStatisticsByAgeByVR(this.state.menBooking, "menMore55", 55, 150);
    this.storeStatisticsByAgeByVR(this.state.womenBooking, "womenUnder18", 0, 17);
    this.storeStatisticsByAgeByVR(this.state.womenBooking, "women1825", 18, 24);
    this.storeStatisticsByAgeByVR(this.state.womenBooking, "women2539", 25, 39);
    this.storeStatisticsByAgeByVR(this.state.womenBooking, "women4054", 40, 54);
    this.storeStatisticsByAgeByVR(this.state.womenBooking, "womenMore55", 55, 150);
  };


  storeStatisticsByGender = (personalBookings) => {
    const men = [];
    const women = [];

    _.forEach(personalBookings, (reservation) => {
      if (reservation["Civilite"] === "Madame") {
        women.push(reservation);
      } else {
        men.push(reservation);
      }
    });

    this.setState({
      menBooking: men,
      womenBooking: women
    })
  };

  storeStatisticsByAgeByVR = (arrayToCheck, keyword, age, agelimit) => {
    let array = [];
    let countVR = 0;

    _.forEach(arrayToCheck, (personalReservation) => {
      if (personalReservation["Age"] >= age && personalReservation["Age"] <= agelimit) {
        array.push(personalReservation);
      }
    });

    _.forEach(array, (distinctByAgeBooking) => {
      if (distinctByAgeBooking["VR"] === "Oui") {
        countVR++;
      }
    });

    const stored = {
      playersTotal: Object.keys(array).length,
      vr: countVR,
      notVr: Object.keys(array).length - countVR
    };

    this.setState({
      [keyword]: stored
    })
  };

  renderResults = (data, keyword) => {
    if (typeof data !== "undefined" && Object.keys(data).length > 0) {
      return (data[keyword]);
    }
  };

  renderTotalBookingByGenre = (data) => {
    if (typeof data !== "undefined" && Object.keys(data).length > 0) {
      return (Object.keys(data).length);
    }
  };

  renderTable = () => {
    return (
        <table>
          <thead>
          <tr>
            <th/>
            <th>Homme</th>
            <th>Femme</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>moins de 18 ans</td>
            <td>{this.renderResults(this.state.menUnder18, "playersTotal")}</td>
            <td>{this.renderResults(this.state.womenUnder18, "playersTotal")}</td>
            <td>{this.renderResults(this.state.menUnder18, "playersTotal") + this.renderResults(this.state.womenUnder18, "playersTotal")}</td>
          </tr>
          <tr>
            <td>de 18 à 25 ans</td>
            <td>{this.renderResults(this.state.men1825, "playersTotal")}</td>
            <td>{this.renderResults(this.state.women1825, "playersTotal")}</td>
            <td>{this.renderResults(this.state.men1825, "playersTotal") + this.renderResults(this.state.women1825, "playersTotal")}</td>
          </tr>
          <tr>
            <td>de 25 à 25 ans</td>
            <td>{this.renderResults(this.state.men2539, "playersTotal")}</td>
            <td>{this.renderResults(this.state.women2539, "playersTotal")}</td>
            <td>{this.renderResults(this.state.men2539, "playersTotal") + this.renderResults(this.state.women2539, "playersTotal")}</td>
          </tr>
          <tr>
            <td>de 40 à 25 ans</td>
            <td>{this.renderResults(this.state.men4054, "playersTotal")}</td>
            <td>{this.renderResults(this.state.women4054, "playersTotal")}</td>
            <td>{this.renderResults(this.state.men4054, "playersTotal") + this.renderResults(this.state.women4054, "playersTotal")}</td>
          </tr>
          <tr>
            <td>plus de 55 ans</td>
            <td>{this.renderResults(this.state.menMore55, "playersTotal")}</td>
            <td>{this.renderResults(this.state.womenMore55, "playersTotal")}</td>
            <td>{this.renderResults(this.state.menMore55, "playersTotal") + this.renderResults(this.state.womenMore55, "playersTotal")}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{this.renderTotalBookingByGenre(this.state.menBooking)}</td>
            <td>{this.renderTotalBookingByGenre(this.state.womenBooking)}</td>
            <td>{this.renderTotalBookingByGenre(this.state.menBooking) + this.renderTotalBookingByGenre(this.state.womenBooking)}</td>
          </tr>
          </tbody>
        </table>
    )
  };

  renderTableVR = () => {
    return (
        <table>
          <thead>
          <tr>
            <th/>
            <th>Homme VR</th>
            <th>Homme NON VR</th>
            <th>Femme VR</th>
            <th>Femme NON VR</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>moins de 18 ans</td>
            <td>{this.renderResults(this.state.menUnder18, "vr")}</td>
            <td>{this.renderResults(this.state.menUnder18, "notVr")}</td>
            <td>{this.renderResults(this.state.womenUnder18, "vr")}</td>
            <td>{this.renderResults(this.state.womenUnder18, "notVr")}</td>
            <td>{this.renderResults(this.state.menUnder18, "vr") + this.renderResults(this.state.menUnder18, "notVr")}</td>
          </tr>
          <tr>
            <td>de 18 à 25 ans</td>
            <td>{this.renderResults(this.state.men1825, "vr")}</td>
            <td>{this.renderResults(this.state.men1825, "notVr")}</td>
            <td>{this.renderResults(this.state.women1825, "vr")}</td>
            <td>{this.renderResults(this.state.women1825, "notVr")}</td>
            <td>{this.renderResults(this.state.men1825, "vr") + this.renderResults(this.state.men1825, "notVr")}</td>
          </tr>
          <tr>
            <td>de 25 à 25 ans</td>
            <td>{this.renderResults(this.state.men2539, "vr")}</td>
            <td>{this.renderResults(this.state.men2539, "notVr")}</td>
            <td>{this.renderResults(this.state.women2539, "vr")}</td>
            <td>{this.renderResults(this.state.women2539, "notVr")}</td>
            <td>{this.renderResults(this.state.men2539, "vr") + this.renderResults(this.state.men2539, "notVr")}</td>
          </tr>
          <tr>
            <td>de 40 à 25 ans</td>
            <td>{this.renderResults(this.state.men4054, "vr")}</td>
            <td>{this.renderResults(this.state.men4054, "notVr")}</td>
            <td>{this.renderResults(this.state.women4054, "vr")}</td>
            <td>{this.renderResults(this.state.women4054, "notVr")}</td>
            <td>{this.renderResults(this.state.men4054, "vr") + this.renderResults(this.state.men4054, "notVr")}</td>
          </tr>
          <tr>
            <td>plus de 55 ans</td>
            <td>{this.renderResults(this.state.menMore55, "vr")}</td>
            <td>{this.renderResults(this.state.menMore55, "notVr")}</td>
            <td>{this.renderResults(this.state.womenMore55, "vr")}</td>
            <td>{this.renderResults(this.state.womenMore55, "notVr")}</td>
            <td>{this.renderResults(this.state.menMore55, "vr") + this.renderResults(this.state.menMore55, "notVr")}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{this.renderTotalBookingByGenre(this.state.menBooking)}</td>
            <td>{this.renderTotalBookingByGenre(this.state.womenBooking)}</td>
            <td>{this.renderTotalBookingByGenre(this.state.menBooking) + this.renderTotalBookingByGenre(this.state.womenBooking)}</td>
          </tr>
          </tbody>
        </table>
    )
  };

  render() {
    return (
        <div>
          <Modal className="display-room-details"
                 width={"90%"}
                 visible={this.props.visible}
                 footer={
                   <Button key="close"
                           onClick={() => {
                             this.props.willClose()
                           }}>Fermer</Button>}
                 closable={false}
          >
            {this.renderTable()}
            {this.renderTableVR()}
          </Modal>
        </div>
    )
  }
}

export default ModalTable;