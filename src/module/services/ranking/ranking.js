import React, {Component} from 'react';
//Import Lodash module
import _ from 'lodash';
//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';

class Ranking extends Component {
  state = {
    rankings: [],
    displayRankings: false
  };

  componentDidMount() {
    this.getRankingFromFirebase();
  };

  getRankingFromFirebase = () => {
    if (firebase.apps.length === 1) {
      let rankingArray = [];

      const db = firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      db.settings(settings);
      const rankings = db.collection("themeRanking");

      rankings.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          rankingArray = (change.doc.data());
        });

        this.setState({
          rankings: rankingArray
        });
      });
    } else {
      window.location.assign("/");
    }
  };

  renderRanks = () => {
    const rankingRender = [];

    if (Object.keys(this.state.rankings).length !== 0) {
      _.forEach(this.state.rankings, (rank, rankKey) => {
        rankingRender.push(
            <div className="ranking-span">
              <span className="ranking-key">{`${rankKey} :`}</span>
              <span className="ranking-result">{` ${rank} points `}</span>
            </div>
        );
      });

      return (rankingRender);
    }
  };

  render() {
    return (
        <div className="ranking-span-container">
          {this.renderRanks()}
        </div>
    )
  }
}

export default Ranking;