import React, { Component } from 'react';
import Entry from './entry';
import './style.css';

class Master extends Component {
  constructor(){
    super();

  }

  render() {
    let rows = this.props.data.map((row,i)=>{
      return <Entry key={i} data={row} active={this.props.selected == row} handleSelect={this.props.handleSelect}/>
    })

    return (
      <div className="Master">
        <h3>List / <span className="blue">{this.props.rep ? 'Representatives' : 'Senators'}</span></h3>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Party</td>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
      </div>
    );
  }
}

export default Master;
