import React, {Component} from 'react';

//Import Moment module
import * as moment from 'moment';
import 'moment/locale/fr';

//Import react-table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

moment.locale('fr');

class TableListReservation extends Component {
  render(){
    const columns = [
      {
        Header: 'Civilité',
        accessor: 'acheteurCivilite',
      },{
        Header: 'Age de l\'acheteur',
        accessor: 'spectaeurInconnu',
      },{
        Header: 'Jour',
        id:'GameNom',
        accessor: (date) => <a>{moment(date).format('dddd Do MMMM YYYY')}</a>,
      },{
        Header: 'Horaire',
        accessor: 'GameJour',
      },
    ];

    return (
        <div className="reservations-container">
          <ReactTable
              data={this.props.reservations}
              columns={columns}
          />
        </div>
    )
  }
}

export default TableListReservation;