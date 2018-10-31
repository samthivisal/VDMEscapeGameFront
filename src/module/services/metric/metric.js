import React, {Component} from 'react';

//Import FontAwesome module
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//Import custom modules
import ModalTable from './modalTable';

class Metric extends Component {
  state = {
    personalReservations: [],
    modalExtraDetails : false
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

  render() {
    return (
        <div className="kpi">
          <div className="kpi-header">
            {this.renderButton()}
            {this.props.title}
          </div>
          <span className="kpi-result">{`${this.props.result}${this.props.post}`}</span>
          {/*{this.renderModalExtraDetails()}*/}
        </div>
    )
  }
}

export default Metric;