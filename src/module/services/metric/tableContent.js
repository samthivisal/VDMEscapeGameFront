import React, {Component} from 'react';
import './table.css';

class TableContent extends Component {
  componentDidMount() {
    console.log(this.props.dataFiltered);
  };

  render() {
    return (
        <table>
          <thead>
          <tr>
            <th/>
            <th>Homme</th>
            <th>Femme</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>moins de 18 ans</td>
            {/*<td>{this.props.dataFiltered["men1825"].playersTotal}</td>*/}
          </tr>
          <tr>
            <td>de 18 à 25 ans</td>
          </tr>
          <tr>
            <td>de 25 à 25 ans</td>
          </tr>
          <tr>
            <td>de 40 à 25 ans</td>
          </tr>
          <tr>
            <td>plus de 55 ans</td>
          </tr>
          </tbody>
        </table>
    );
  }
}

export default TableContent;