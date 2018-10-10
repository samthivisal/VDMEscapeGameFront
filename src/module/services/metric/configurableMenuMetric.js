import React, {Component} from 'react';

//Import Antd module
import 'antd/dist/antd.css';
import {Button, DatePicker} from 'antd';

//Import Lodash module
import _ from 'lodash';

//Import Moment module
import * as moment from 'moment';

//Import Customs modules
import Metrics from './metrics';

class ConfigurableMenuMetric extends Component {
  state ={
    specificReservation : [],
    displayMetric : false,
    startDate : "",
    endDate: ""
  };

  handleOnChangeDatePickerStart = (dateString) => {
    this.setState({startDate: dateString});
  };

  handleOnChangeDatePickerEnd = (dateString) => {
    this.setState({endDate: dateString});
  };

  getReservationsBetweenDate = (reservations, startDate, endDate) => {
    const specificReservation= [];

    const startDateTs = parseInt(moment(startDate).format("X"), 10);
    const endDateTs = parseInt(moment(endDate).format("X"), 10);

    _.forEach(reservations, (reservation) => {
      const dateReservation = parseInt(moment(reservation["GameJour"]).format("X"), 10);
      if (_.inRange(dateReservation, startDateTs, endDateTs)){
        specificReservation.push(reservation);
      }
    });
    this.setState({specificReservation: specificReservation});
    this.setState({displayMetric : true});
  };

  displayMetric = (reservationsFiltered) => {
    if (this.state.displayMetric){
      return (
          <Metrics bookingsFiltered={reservationsFiltered}/>
      )
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
            <DatePicker
                onChange={(date, dateString) => this.handleOnChangeDatePickerEnd(dateString)}
                placeholder="Date fin période"
                format="DD MMMM YYYY"
            />
            <Button
                onClick={() => this.getReservationsBetweenDate(this.props.reservations, this.state.startDate, this.state.endDate)}> Go
            </Button>
          </div>
          {this.displayMetric(this.state.specificReservation)}
        </div>
    )
  }
}

export default ConfigurableMenuMetric;