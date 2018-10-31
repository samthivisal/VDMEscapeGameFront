import React, {Component} from 'react';

//Import Antd module
import {Table} from 'antd';

class BookingDetails extends Component {

  render() {
    const columns = [
      {
        title: 'Civilité',
        dataIndex: 'Gender',
        key: 'Gender',
        align : 'center'
      },{
        title: 'Age',
        dataIndex: 'Age',
        key: 'Age',
        align : 'center'
      },{
        title: 'Tarif',
        dataIndex: 'Price',
        key: 'Price',
        align : 'center'
      }
    ];

    return (
        <div>
          <Table pagination={true} columns={columns} dataSource={this.props.dataSource}/>
        </div>
    )
  }
}

export default BookingDetails;