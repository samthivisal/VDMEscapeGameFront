import React, {Component} from 'react';

//Import FontAwesome module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Metric extends Component {
  render() {
    return (
        <div className="kpi">
          <div className="kpi-header">
            <FontAwesomeIcon className="fas fa-3x" icon={`${this.props.icon}`} />
            {this.props.title}
          </div>
          <span className="kpi-result">{`${this.props.result}${this.props.post}`}</span>
        </div>
    )
  }
}

export default Metric;