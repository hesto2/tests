import React, { Component } from 'react';
import './style.css';

class Entry extends Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  
  render() {
    return (
      <tr className={ this.props.active ? "active Entity" : "Entity"} onClick={this.handleClick}>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.party[0]}</td>
      </tr>
    );
  }

  handleClick(){
    this.props.handleSelect(this.props.data);
  }
}

export default Entry;
