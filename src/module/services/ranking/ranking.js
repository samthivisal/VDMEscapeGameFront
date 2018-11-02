import React, {Component} from 'react';
//Import Lodash module
import _ from 'lodash';

class Ranking extends Component {

  renderRanking = () => {
    const rankingArray = [];

    if (Object.keys(this.props.ranking).length !== 0) {
      _.forEach(this.props.ranking[0], (rank, rankKey) => {
        rankingArray.push(
            <div className="ranking-span">
              <span className="ranking-key">{`${rankKey} :`}</span>
              <span className="ranking-result">{` ${rank} points `}</span>
            </div>
        );
      });
    }

    return (rankingArray);
  };

  render() {
    return (
        <div className="ranking-span-container">
          {this.renderRanking()}
        </div>
    )
  }
}

export default Ranking;