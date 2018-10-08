import React, {Component} from 'react';

//Import Customs modules
import ReservationDetails from './ReservationDetails';

//Import Antd module
import 'antd/dist/antd.css';
import {Button, Icon, Modal} from 'antd';

//Import Moment module
import * as moment from 'moment';
import 'moment/locale/fr';

//Import react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

moment.locale('fr');

class TableListReservation extends Component {
  state = {
    displayModal: false,
    currentId : ''
  };

  handleDisplayModal = () => {
    this.setState(prevState => {
      return {
        displayModal: !prevState.displayModal};
    });
  };

  storeCurrentReservationsId = (id) => {
    this.setState({currentId : id});
  };

  render() {
    const columns = [
      {
        Header: 'Jour',
        id: 'GameJour',
        accessor: (date) => {
          return (<a>{moment(date).format('dddd Do MMMM YYYY')}</a>)
        },
      }, {
        Header: 'Horaire',
        accessor: 'GameHoraire',
      }, {
        Header: 'Nom de la salle',
        accessor: 'GameNom',
        filterable: true,
        filterMethod: (filter, row) =>
            row.GameNom.toLowerCase().startsWith(filter.value),
      }, {
        Header: 'VR',
        accessor: 'GameVR',
        filterable: true,
        filterMethod: (filter, row) =>
            row.GameVR.toLowerCase().startsWith(filter.value),
      }, {
        Header: 'Nombre joueur',
        accessor: 'nbSpetateur',
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
                    console.log(reservation);
                    this.storeCurrentReservationsId(reservation.id);
                    this.handleDisplayModal(reservation.id)
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
                 width={"60%"}
                 visible={this.state.displayModal}
                 footer={
                   <Button key="close"
                           onClick={() => {
                             this.handleDisplayModal()
                           }}>Fermer</Button>}
                 closable={false}
          >
            <ReservationDetails groupReservationId={this.state.currentId}/>
          </Modal>
        </div>
    )
  }
}

const style = {
  color: 'green'
};
export default TableListReservation;