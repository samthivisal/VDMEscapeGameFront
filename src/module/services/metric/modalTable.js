import React, {Component} from 'react';

//Import Lodash module
import _ from 'lodash';

//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';

//Import Antd module
import 'antd/dist/antd.css';
import {Button, Modal} from 'antd';

class ModalTable extends Component {
  state = {
    personalReservations: [],
  };

  componentDidMount() {
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);

    const reservations = db.collection("personalReservation");

    if (typeof this.props.bookingsFiltered !== "undefined") {
      const personalReservationsArray = [];
      _.forEach(this.props.bookingsFiltered, (booking) => {
        reservations.where("reservationID", "==", booking.id)
            .onSnapshot((snapshot) => {
              snapshot.forEach((snapshot) => {
                personalReservationsArray.push(snapshot.data());
              });
            });
      });

      this.setState({personalReservations: personalReservationsArray}, () => {
        this.storeStatistics();
      });
    }
  }

  storeStatistics =() => {
    console.log(this.state.personalReservations);
  };

  render(){
    return (
        <div>
          <Modal className="display-room-details"
                 width={"90%"}
                 visible={this.props.visible}
                 footer={
                   <Button key="close"
                           onClick={() => {
                             this.props.willClose()
                           }}>Fermer</Button>}
                 closable={false}
          >

          </Modal>
        </div>
    )
  }
}

export default ModalTable;