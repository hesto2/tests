import React, { Component } from 'react';
import './style.css';

class Options extends Component {
  render() {
    return (
      <div className="DetailItem">
          <label>{this.props.label}:</label>
          <div className="value"> {this.props.value}</div>
      </div>
    );
  }
}

export default Options;
