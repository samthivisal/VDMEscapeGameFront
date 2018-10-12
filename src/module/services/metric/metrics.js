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
      return booking["GameNom"];
    });

    _.forEach(uniqTableBooking, (booking) => {
      termArray.push(booking["GameNom"])
    });

    this.setState({listNameRoom: termArray});
  };

  getBestRoom = () => {
    const occurence = _.pick(_.countBy(this.props.bookingsFiltered, 'GameNom'), this.state.listNameRoom);
    let bestRoom = "";
    if (Object.keys(occurence).length > 0) {
      bestRoom = Object.keys(occurence).reduce((a, b) => occurence[a] > occurence[b] ? a : b);
    }

    return bestRoom;
  };

  getWorstRoom = () => {
    const occurence = _.pick(_.countBy(this.props.bookingsFiltered, 'GameNom'), this.state.listNameRoom);
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

    _.forEach(this.props.bookingsFiltered, (bookingFiltered) => {
      total = total + bookingFiltered[keyword];
      count++;
    });

    return Math.floor(total / count);
  };

  getPercentagePricing = (keyword) => {
    const nbPlayers = this.getTotal("nbSpetateur");
    let total = 0;

    _.forEach(this.props.bookingsFiltered, (bookingFiltered) => {
      total = total + bookingFiltered[keyword];
    });

    return (total / nbPlayers * 100).toFixed(2);
  };

  render() {
    return (
        <div className="stats-metric-container">
          <div className="stats-type-container">
            <Metric title={kpi.popularRoom["name"]} result={this.getBestRoom()} icon={kpi.popularRoom["icon"]} post={kpi.notPopularRoom["post"]}/>
            <Metric title={kpi.notPopularRoom["name"]} result={this.getWorstRoom()} icon={kpi.notPopularRoom["icon"]} post={kpi.notPopularRoom["post"]}/>
            <Metric title={kpi.seeMore["name"]} result="" icon={kpi.seeMore["icon"]} post="" buttonable={true} bookingsFiltered={this.props.bookingsFiltered}/>
          </div>
          <div className="stats-type-container">
            <Metric title={kpi.totalPlayers["name"]} result={this.getTotal("nbSpetateur")} icon={kpi.totalPlayers["icon"]} post={kpi.totalPlayers["post"]}/>
            <Metric title={kpi.totalFemalePlayers["name"]} result={this.getTotal("spectaeurFemme")} icon={kpi.totalFemalePlayers["icon"]} post={kpi.totalFemalePlayers["post"]}/>
            <Metric title={kpi.totalMalePlayers["name"]} result={this.getTotal("spectateurHomme")} icon={kpi.totalMalePlayers["icon"]} post={kpi.totalMalePlayers["post"]}/>
            <Metric title={kpi.avgAgePlayers["name"]} result={this.getAvg("spectateurAgeMoyen")} icon={kpi.avgAgePlayers["icon"]} post={kpi.avgAgePlayers["post"]}/>
          </div>
          <div className="stats-type-container">
            <Metric title={kpi.pricingFull["name"]} result={this.getPercentagePricing("PleinTarif")} icon={kpi.pricingFull["icon"]} post={kpi.pricingFull["post"]}/>
            <Metric title={kpi.pricingStudent["name"]} result={this.getPercentagePricing("TarifEtudiant")} icon={kpi.pricingStudent["icon"]} post={kpi.pricingStudent["post"]}/>
            <Metric title={kpi.pricingSenior["name"]} result={this.getPercentagePricing("TarifReduit")} icon={kpi.pricingSenior["icon"]} post={kpi.pricingSenior["post"]}/>
            <Metric title={kpi.pricingReduced["name"]} result={this.getPercentagePricing("Senior")} icon={kpi.pricingReduced["icon"]} post={kpi.pricingReduced["post"]}/>
            <Metric title={kpi.avgAgeBuyers["name"]} result={this.getAvg("AcheteurAge")} icon={kpi.avgAgeBuyers["icon"]} post={kpi.avgAgeBuyers["post"]}/>
          </div>
          </div>
    )
  }
}

export default Metrics;
