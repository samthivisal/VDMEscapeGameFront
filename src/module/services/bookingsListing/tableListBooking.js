import React, {Component} from 'react';

//Import Customs modules
import BookingDetails from './bookingDetails';

//Import Antd module
import 'antd/dist/antd.css';
import {Button, Icon, Modal} from 'antd';

//Import Moment module
import * as moment from 'moment';
import 'moment/locale/fr';

//Import react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';

moment.locale('fr');

class TableListBooking extends Component {
  state = {
    displayModal: false,
    currentId: '',
    personalReservations : []
  };

  handleDisplayModal = () => {
    this.setState(prevState => {
      return {
        displayModal: !prevState.displayModal
      };
    });
  };

  getPersonalReservations = (id) => {
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);

    const reservations = db.collection("personalReservation");

    reservations.where("reservationID", "==", id)
        .onSnapshot((snapshot) => {
          this.storeReservations(snapshot);
        });
  };

  storeReservations = (querySnapshot) => {
    const personalReservationsArray = [];

    querySnapshot.forEach((snapshot) => {
      personalReservationsArray.push(snapshot.data());
    });

    this.setState({personalReservations : personalReservationsArray});
  };

  render() {
    const columns = [
      {
        Header: 'Jour',
        accessor: 'GameDay',
        Cell: (date) => {
          return (<span>{moment(date["value"]).format('dddd Do MMMM YYYY')}</span>)
        },
      }, {
        Header: 'Horaire',
        accessor: 'GameHour',
      }, {
        Header: 'Nom de la salle',
        accessor: 'GameName',
        filterable: true,
        filterMethod: (filter, row) =>
            row.GameNom.toLowerCase().startsWith(filter.value.toLowerCase()),
      }, {
        Header: 'VR',
        accessor: 'GameVR',
        filterable: true,
        filterMethod: (filter, row) =>
            row.GameVR.toLowerCase().startsWith(filter.value.toLowerCase()),
      }, {
        Header: 'Nombre joueur',
        accessor: 'nbSpectators',
        filterable: true,
      }, {
        Header: 'Plus de détails',
        id: 'id',
        accessor: (reservation) => {
          return (
              <Icon
                  type="zoom-in"
                  theme="outlined"
                  style={style}
                  onClick={(event) => {
                    console.log(reservation.id);
                    this.getPersonalReservations(reservation.id);
                    this.handleDisplayModal()
                  }}
              />
          )
        },
      },
    ];

    return (
        <div className="reservations-container">
          <ReactTable
              data={this.props.reservations}
              columns={columns}
          />
          <Modal className="display-room-details"
                 width={"30%"}
                 visible={this.state.displayModal}
                 footer={
                   <Button key="close"
                           onClick={() => {
                             this.handleDisplayModal()
                           }}>Fermer</Button>}
                 closable={false}
          >
            <BookingDetails groupReservationId={this.state.currentId} dataSource={this.state.personalReservations}/>
          </Modal>
        </div>
    )
  }
}

const style = {
  color: 'green'
};
export default TableListBooking;