import React, {Component} from 'react';
//Import Antd module
import 'antd/dist/antd.css';
import {Button, DatePicker, TimePicker} from 'antd';
//Import Lodash module
//Import Moment module
import * as moment from 'moment';
//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';
//Import Customs modules
import Metrics from './metrics';
//Import Lodash module
import _ from 'lodash';

import Unicorn from '../../../unicornRunning.gif';

class ConfigurableMenuMetric extends Component {
  state = {
    specificReservation: [],
    displayMetric: false,
    startDate: "empty",
    startTime: "",
    endDate: "empty",
    endTime: "",
    displayPoney: false
  };

  handleOnChangeDatePickerStart = (dateString) => {
    this.setState({startDate: dateString});
  };

  handleOnChangeDatePickerEnd = (dateString) => {
    this.setState({endDate: dateString});
  };

  handleOnChangeTimePickerStart = (dateString) => {
    this.setState({startTime: dateString});
  };

  handleOnChangeTimePickerEnd = (dateString) => {
    this.setState({endTime: dateString});
  };

  getReservationsBetweenDate = (reservations, startDate, endDate, startTime, endTime) => {
    const specificReservation = [];

    const startDateTs = parseInt(moment(`${startDate}, ${startTime}`).format("X"), 10);
    const endDateTs = parseInt(moment(`${endDate}, ${endTime}`).format("X"), 10);

    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
    const bookings = db.collection("reservation");

    bookings.where("Timestamp", ">=", startDateTs).where("Timestamp", "<=", endDateTs)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            const element = doc.data();
            element.id = doc.id;

            specificReservation.push(element);
          });

          const uniqTableReservation = _.uniqBy(specificReservation, (reservation) => {
            return reservation["id"];
          });

          if (Object.keys(specificReservation).length === 0) {
            this.setState({displayMetric: false, displayPoney: true});
          } else {
            this.setState({specificReservation: uniqTableReservation});
            this.setState({displayMetric: true, displayPoney: false});
          }
        });
  };

  displayMetric = (reservationsFiltered) => {
    if (this.state.displayMetric) {
      return (
          <Metrics bookingsFiltered={reservationsFiltered}/>
      )
    }
  };

  displayPoney = () => {
    if (this.state.displayPoney) {
      return (
          <div className="poney-container">
            <img src={Unicorn}/>
          </div>
      );
    }
  };

  render() {
    return (
        <div className="stats-container">
          <div className="menu-container">
            <DatePicker
                onChange={(date, dateString) => this.handleOnChangeDatePickerStart(dateString)}
                placeholder="Date début période"
                format="DD MMMM YYYY"
            />
            <TimePicker
                onChange={(date, dateString) => this.handleOnChangeTimePickerStart(dateString)}
                placeholder="Heure début"
                format="HH:mm"
                defaultValue={moment('00:00', 'HH:mm')}
            />
            <DatePicker
                onChange={(date, dateString) => this.handleOnChangeDatePickerEnd(dateString)}
                placeholder="Date fin période"
                format="DD MMMM YYYY"
            />
            <TimePicker
                onChange={(date, dateString) => this.handleOnChangeTimePickerEnd(dateString)}
                placeholder="Heure fin"
                format="HH:mm"
                defaultValue={moment('00:00', 'HH:mm')}
            />
            <Button
                onClick={
                  () => {
                    if (this.state.startDate !== "empty" && this.state.endDate !== "empty") {
                      this.getReservationsBetweenDate(this.props.reservations, this.state.startDate, this.state.endDate, this.state.startTime, this.state.endTime);

                    } else {
                      alert("Merci de bien remplir tous les champs du formulaire!");
                    }
                  }
                }
            > Go
            </Button>
          </div>
          {this.displayMetric(this.state.specificReservation)}
          {this.displayPoney()}
        </div>
    )
  }
}

export default ConfigurableMenuMetric;