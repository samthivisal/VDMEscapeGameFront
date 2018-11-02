import React, {Component} from 'react';

//Import Lodash module
import _ from 'lodash';

//Import Custom module
import Metric from './metric';

import kpi from '../../dataTest/kpi';

class Metrics extends Component {
  state = {
    listNameRoom: [],
    listPeriodRoom : []
  };

  componentDidMount() {
    console.log(this.props.bookingsFiltered);
    this.getUniqRoomName();
    this.getUniqRoomPeriod();
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

  getUniqRoomPeriod = () => {
    const termArray = [];
    const uniqTableBooking = _.uniqBy(this.props.bookingsFiltered, (booking) => {
      return booking["GameHour"];
    });

    _.forEach(uniqTableBooking, (booking) => {
      termArray.push(booking["GameHour"])
    });

    this.setState({listPeriodRoom: termArray});
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

  getRepartitionByHour = () => {
    const hourRepartition = [];
    const occurence = _.pick(_.countBy(this.props.bookingsFiltered, 'GameHour'), this.state.listPeriodRoom);

    _.forEach(occurence, (result, title) => {
      hourRepartition.push(
          <Metric title={`Horaire : ${title}`} result={result} icon={kpi.pricingFull["icon"]} post={""}/>
      );
    });

    return hourRepartition;
  };

  getRepartitionByRoom = () => {
    const roomRepartition = [];
    const occurence = _.pick(_.countBy(this.props.bookingsFiltered, 'GameName'), this.state.listNameRoom);

    _.forEach(occurence, (result, title) => {
      roomRepartition.push(
          <Metric title={`${title}`} result={result} icon={kpi.pricingFull["icon"]} post={""}/>
      );
    });

    return roomRepartition;
  };

  getTotal = (keyword) => {
    let total = 0;
    _.forEach(this.props.bookingsFiltered, (bookingFiltered) => {
      total = total + bookingFiltered[keyword];
    });

    return total;
  };

  getTotalVR = (keyword) => {
    let total = 0;
    let nbSpectators = 0;
    let nbWomen = 0;
    let nbMen = 0;
    let underAge = 0;
    let youngPerson = 0;
    let adult = 0;
    let oldAdult = 0;
    let senior = 0;

    _.forEach(this.props.bookingsFiltered, (bookingFiltered) => {
      if (bookingFiltered["GameVR"] === keyword) {
        total = total + 1;
        nbSpectators = nbSpectators + bookingFiltered["nbSpectators"];
        nbWomen = nbWomen + bookingFiltered["nbWomen"];
        nbMen = nbMen + bookingFiltered["nbMen"];
        underAge = underAge + bookingFiltered["UnderAge"];
        youngPerson = youngPerson + bookingFiltered["YoungPerson"];
        adult = adult + bookingFiltered["Adults"];
        oldAdult = oldAdult + bookingFiltered["OldAdults"];
        senior = senior + bookingFiltered["Senior"];
      }
    });

    return  ({
      total : total,
      totalSpectators: nbSpectators,
      nbMen : nbMen,
      nbWomen : nbWomen,
      underAge : underAge,
      youngPerson : youngPerson,
      adult : adult,
      oldAdult : oldAdult,
      senior : senior,
    });
  };

  renderTotalRoomBooked = () => {
    return (
        <Metric title={`Total salles réservées`} result={Object.keys(this.props.bookingsFiltered).length} icon={"trophy"} post="" bookingsFiltered={this.props.bookingsFiltered}/>
    )
  };

  render() {
    return (
        <div className="stats-metric-container">
          <div className="stats-type-container">
            {this.renderTotalRoomBooked()}
            <Metric title={kpi.popularRoom["name"]} result={this.getBestRoom()} icon={kpi.popularRoom["icon"]} post={kpi.notPopularRoom["post"]}/>
            <Metric title={kpi.notPopularRoom["name"]} result={this.getWorstRoom()} icon={kpi.notPopularRoom["icon"]} post={kpi.notPopularRoom["post"]}/>
            <Metric
                title={kpi.vrRoom["name"]}
                result={`${this.getTotalVR("Oui")["total"]} réservations avec ${this.getTotalVR("Oui")["totalSpectators"]} joueurs`}
                icon={kpi.vrRoom["icon"]}
                post={kpi.notPopularRoom["post"]}
                more={this.getTotalVR("Oui")}
                buttonable={true}
            />
            <Metric
                title={kpi.notVrRoom["name"]}
                result={`${this.getTotalVR("Non")["total"]} réservations avec ${this.getTotalVR("Non")["totalSpectators"]} joueurs`}
                icon={kpi.notVrRoom["icon"]}
                post={kpi.notPopularRoom["post"]}
                more={this.getTotalVR("Non")}
                buttonable={true}
            />
            {/*<Metric title={kpi.seeMore["name"]} result="" icon={kpi.seeMore["icon"]} post="" buttonable={true} bookingsFiltered={this.props.bookingsFiltered}/>*/}
          </div>
          <div className="stats-type-container">
            {this.getRepartitionByRoom()}
          </div>
          <div className="stats-type-container">
            {this.getRepartitionByHour()}
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
        </div>
    )
  }
}

export default Metrics;
