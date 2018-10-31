import React, {Component} from 'react';

//Import Lodash module
import _ from 'lodash';

//Import Custom module
import Metric from './metric';

import kpi from '../../dataTest/kpi';

class Metrics extends Component {
  state = {
    listNameRoom: []
  };

  componentDidMount() {
    this.getUniqRoomName();
  }

  getUniqRoomName = () => {
    const termArray = [];
    const uniqTableBooking = _.uniqBy(this.props.bookingsFiltered, (booking) => {
      return booking["GameName"];
    });

    _.forEach(uniqTableBooking, (booking) => {
      termArray.push(booking["GameName"])
    });

    this.setState({listNameRoom: termArray});
  };

  getBestRoom = () => {
    const occurence = _.pick(_.countBy(this.props.bookingsFiltered, 'GameName'), this.state.listNameRoom);
    let bestRoom = "";
    if (Object.keys(occurence).length > 0) {
      bestRoom = Object.keys(occurence).reduce((a, b) => occurence[a] > occurence[b] ? a : b);
    }

    return bestRoom;
  };

  getWorstRoom = () => {
    const occurence = _.pick(_.countBy(this.props.bookingsFiltered, 'GameName'), this.state.listNameRoom);
    let worstRoom = "";
    if (Object.keys(occurence).length > 0) {
      worstRoom = Object.keys(occurence).reduce((a, b) => occurence[a] > occurence[b] ? b : a);
    }

    return worstRoom;
  };

  getTotal = (keyword) => {
    let total = 0;
    _.forEach(this.props.bookingsFiltered, (bookingFiltered) => {
      total = total + bookingFiltered[keyword];
    });

    return total;
  };

  getAvg = (keyword) => {
    let total = 0;
    let count = 0;
    let average = "X";

    if (Object.keys(this.props.bookingsFiltered).length > 0) {

      _.forEach(this.props.bookingsFiltered, (bookingFiltered) => {
        total = total + bookingFiltered[keyword];
        count++;
      });

      average = Math.floor(total / count);
    }

    return average
  };

  getPercentagePricing = (keyword) => {
    const nbPlayers = this.getTotal("nbSpectators");
    let total = 0;
    let percentage = "X";

    if (Object.keys(this.props.bookingsFiltered).length > 0){
      _.forEach(this.props.bookingsFiltered, (bookingFiltered) => {
        total = total + bookingFiltered[keyword];
      });

      percentage = (total / nbPlayers * 100).toFixed(2);
    }

    return percentage;
  };

  getTotalVR = (keyword) => {
    let total = 0;
    _.forEach(this.props.bookingsFiltered, (bookingFiltered) => {
      if (bookingFiltered["GameVR"] === keyword) {
        total = total + 1;
      }
    });

    return total;
  };

  render() {
    return (
        <div className="stats-metric-container">
          <div className="stats-type-container">
            <Metric title={kpi.popularRoom["name"]} result={this.getBestRoom()} icon={kpi.popularRoom["icon"]} post={kpi.notPopularRoom["post"]}/>
            <Metric title={kpi.notPopularRoom["name"]} result={this.getWorstRoom()} icon={kpi.notPopularRoom["icon"]} post={kpi.notPopularRoom["post"]}/>
            <Metric title={kpi.vrRoom["name"]} result={this.getTotalVR("Oui")} icon={kpi.vrRoom["icon"]} post={kpi.notPopularRoom["post"]}/>
            <Metric title={kpi.notVrRoom["name"]} result={this.getTotalVR("Non")} icon={kpi.notVrRoom["icon"]} post={kpi.notPopularRoom["post"]}/>
            <Metric title={kpi.seeMore["name"]} result="" icon={kpi.seeMore["icon"]} post="" buttonable={true} bookingsFiltered={this.props.bookingsFiltered}/>
          </div>
          <div className="stats-type-container">
            <Metric title={kpi.totalPlayers["name"]} result={this.getTotal("nbSpectators")} icon={kpi.totalPlayers["icon"]} post={kpi.totalPlayers["post"]}/>
            <Metric title={kpi.totalFemalePlayers["name"]} result={this.getTotal("nbWomen")} icon={kpi.totalFemalePlayers["icon"]} post={kpi.totalFemalePlayers["post"]}/>
            <Metric title={kpi.totalMalePlayers["name"]} result={this.getTotal("nbMen")} icon={kpi.totalMalePlayers["icon"]} post={kpi.totalMalePlayers["post"]}/>
            <Metric title={kpi.totalUnderAgePlayer["name"]} result={this.getTotal("UnderAge")} icon={kpi.totalUnderAgePlayer["icon"]} post={kpi.totalMalePlayers["post"]}/>
            <Metric title={kpi.totalYoungPersonPlayers["name"]} result={this.getTotal("YoungPerson")} icon={kpi.totalYoungPersonPlayers["icon"]} post={kpi.totalMalePlayers["post"]}/>
            <Metric title={kpi.totalAdultPlayers["name"]} result={this.getTotal("Adults")} icon={kpi.totalAdultPlayers["icon"]} post={kpi.totalMalePlayers["post"]}/>
            <Metric title={kpi.totalOldAdultPlayers["name"]} result={this.getTotal("OldAdults")} icon={kpi.totalOldAdultPlayers["icon"]} post={kpi.totalMalePlayers["post"]}/>
            <Metric title={kpi.totalSeniorPlayers["name"]} result={this.getTotal("Senior")} icon={kpi.totalSeniorPlayers["icon"]} post={kpi.totalMalePlayers["post"]}/>
          </div>
          <div className="stats-type-container">
            <Metric title={kpi.pricingFull["name"]} result={this.getPercentagePricing("NormalPrice")} icon={kpi.pricingFull["icon"]} post={kpi.pricingFull["post"]}/>
            <Metric title={kpi.pricingStudent["name"]} result={this.getPercentagePricing("StudentPrice")} icon={kpi.pricingStudent["icon"]} post={kpi.pricingStudent["post"]}/>
            <Metric title={kpi.pricingSenior["name"]} result={this.getPercentagePricing("DiscountPrice")} icon={kpi.pricingSenior["icon"]} post={kpi.pricingSenior["post"]}/>
            <Metric title={kpi.pricingReduced["name"]} result={this.getPercentagePricing("SeniorPrice")} icon={kpi.pricingReduced["icon"]} post={kpi.pricingReduced["post"]}/>
            <Metric title={kpi.avgAgeBuyers["name"]} result={this.getAvg("buyerAge")} icon={kpi.avgAgeBuyers["icon"]} post={kpi.avgAgeBuyers["post"]}/>
          </div>
          </div>
    )
  }
}

export default Metrics;
