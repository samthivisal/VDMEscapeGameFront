import React, {Component} from 'react';

//Import Lodash module
import _ from 'lodash';

//Import Firebase module
import * as firebase from 'firebase';
import 'firebase/firestore';

//Import Antd module
import 'antd/dist/antd.css';
import {Button, Modal} from 'antd';

//Import Custom module
import TableContent from './tableContent';

class ModalTable extends Component {

  componentDidMount(){
    console.log(this.props.bookingsFiltered);
  }

  render () {
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
            COUCOU
          </Modal>
        </div>
    )
  }
}

export default ModalTable;