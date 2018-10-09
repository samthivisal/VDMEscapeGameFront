import React, {Component} from 'react';

//Import Antd module
import {Table} from 'antd';

class ReservationDetails extends Component {

  render() {
    const columns = [
      {
        title: 'Civilité',
        dataIndex: 'Civilite',
        key: 'Civilite',
        // align : 'center'
      },{
        title: 'Age',
        dataIndex: 'Age',
        key: 'Age',
        // align : 'center'
      },{
        title: 'Tarif',
        dataIndex: 'Tarif',
        key: 'Tarif',
        // align : 'center'
      }
    ];

    return (
        <div>
          <Table pagination={true} columns={columns} dataSource={this.props.dataSource}/>
        </div>
    )
  }
}

export default ReservationDetails;