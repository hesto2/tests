import React, { Component } from 'react';
import './style.css';

class Options extends Component {
  render() {
    let value = this.props.value;
    if(this.props.isLink)
      value = <a href={value} target="_blank">{value}</a>;

    return (
      <div className="DetailItem">
          <label>{this.props.label}:</label>
          <div className="value"> {value} </div>
      </div>
    );
  }
}

export default Options;
