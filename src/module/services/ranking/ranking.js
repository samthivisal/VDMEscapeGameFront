import React, {Component} from 'react';

//Import Lodash module
import _ from 'lodash';

class Ranking extends Component {

  renderRanking = () => {
    const rankingArray = [];

    if (Object.keys(this.props.ranking).length !== 0) {
      _.forEach(this.props.ranking[0], (rank, rankKey) => {
        rankingArray.push(
          <span>{`${rankKey} : ${rank} points `}</span>
        );
      });
    }

    return (rankingArray);
  };

  render() {
    return (
        <div>{this.renderRanking()}</div>
    )
  }
}

export default Ranking;