import React, {Component} from 'react';

//Import Lodash module
import _ from 'lodash';

//Import material icons
import SocialMood from 'material-ui/svg-icons/social/mood';
import SocialMoodBad from 'material-ui/svg-icons/social/mood-bad';
import SocialPeople from 'material-ui/svg-icons/social/people';

class Metric extends Component {
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

    this.setState({listNameRoom: termArray}, () => {
          console.log(this.state.listNameRoom);
        }
    )
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

    return total / count;
  };

  getPercentagePricing = (keyword) => {
    const nbPlayers = this.getTotal("nbSpetateur");
    let total = 0;

    _.forEach(this.props.bookingsFiltered, (bookingFiltered) => {
      total = total + bookingFiltered[keyword];
    });

    console.log(keyword,total);

    return (total / nbPlayers * 100);
  };

  render() {
    return (
        <div className="stats-metric-container">
          <div className="kpi">
            <div>
              <SocialMood />
              {`Salle la plus populaire : `}
            </div>
            <span>{`${this.getBestRoom()}`}</span>
          </div>
          <div className="kpi">
            <div>
              <SocialMoodBad />
              {`Salle la moins populaire : `}
            </div>
            <span>{`${this.getWorstRoom()}`}</span>
          </div>
          <div className="kpi">
            <div>
              <SocialMoodBad />
              {`Nombre total de joueurs (tout sexe confondu) : `}
            </div>
            <span>{`${this.getTotal("nbSpetateur")}`}</span>
          </div>
          <div className="kpi">
            <div>
              <SocialMoodBad />
              {`Nombre total de joueuses durant la période : `}
            </div>
            <span>{`${this.getTotal("spectaeurFemme")}`}</span>
          </div>
          <div className="kpi">
            <div>
              <SocialMoodBad />
              {`Nombre total de joueurs durant la période : `}
            </div>
            <span>{`${this.getTotal("spectateurHomme")}`}</span>
          </div>
          <div className="kpi">
            <div>
              <SocialMoodBad />
              {`Age moyen des acheteurs : `}
            </div>
            <span>{`${Math.floor(this.getAvg("AcheteurAge"))} ans`}</span>
          </div>
          <div className="kpi">{`Pourcentage de plein tarif : ${Math.floor(this.getPercentagePricing("PleinTarif"))}%`}</div>
          <div className="kpi">{`Pourcentage de tarif etudiant : ${Math.floor(this.getPercentagePricing("TarifEtudiant"))}%`}</div>
          <div className="kpi">{`Pourcentage de tarif reduit : ${Math.floor(this.getPercentagePricing("TarifReduit"))}%`}</div>
          <div className="kpi">{`Pourcentage de tarif senior : ${Math.floor(this.getPercentagePricing("Senior"))}%`}</div>
        </div>
    )
  }
}

export default Metric;
