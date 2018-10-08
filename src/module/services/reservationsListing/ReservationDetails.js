import React, {Component} from 'react';

//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';

class ReservationDetails extends Component {
  componentDidMount() {
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);

    const reservations = db.collection("personalReservation");

    reservations.where("reservationID", "==", this.props.groupReservationId)
        .onSnapshot((snapshot) => {
          this.storeReservations(snapshot);
        });
  }

  storeReservations = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  render() {
    return (
        <div>
          Bonjour
        </div>
    )
  }
}

export default ReservationDetails;