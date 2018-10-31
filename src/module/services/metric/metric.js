import React, {Component} from 'react';

//Import FontAwesome module
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//Import Lodash module
import _ from 'lodash';

//Import custom modules
import ModalTable from './modalTable';

import translationIRL from '../../dataTest/translationIRL';

class Metric extends Component {
  state = {
    personalReservations: [],
    modalExtraDetails : false,
    extraDisplay: false
  };

    handleDisplayModal = () => {
    this.setState(prevState => {
      return {
        modalExtraDetails: !prevState.modalExtraDetails
      };
    });
  };

  renderButton = () => {
    if (this.props.buttonable) {
      return (
          <FontAwesomeIcon
              className="fas fa-3x more-stats"
              icon={`${this.props.icon}`}
              // pulse={true}
              spin={true}
              onClick={() => {
                this.setState({extraDisplay: !this.state.extraDisplay});
                this.handleDisplayModal()
              }}
          />
      )
    } else {
      return (
          <FontAwesomeIcon className="fas fa-3x" icon={`${this.props.icon}`}/>
      )
    }
  };

  renderModalExtraDetails = () => {
    if (this.state.modalExtraDetails){
      return (
          <ModalTable
              visible={this.state.modalExtraDetails}
              bookingsFiltered={this.props.bookingsFiltered}
              willClose={() => this.handleDisplayModal()}/>
      )
    }
  };

  renderExtraInfo = () => {
    const array = [];

    if (typeof this.props.more !== "undefined"){
      _.forEach(this.props.more, (info, title) => {
        array.push(
            <div className="extra-info">
              <span>{translationIRL[title]} </span>
              <span className="extra-info-result">{` : ${info}`}</span>
            </div>)
      });
    }

    return array;
  };

  render() {
    return (
        <div className="kpi">
          <div className="kpi-header">
            {this.renderButton()}
            <span className="kpi-title">{this.props.title}</span>
          </div>
          <span className="kpi-result">{`${this.props.result}${this.props.post}`}</span>
          {this.state.extraDisplay? this.renderExtraInfo() : ""}
          {/*{this.renderModalExtraDetails()}*/}
        </div>
    )
  }
}

export default Metric;