import React, { Component } from 'react';
import DetailItem from './detailItem'
import './style.css';

class Detail extends Component {
  render() {
    let details;
    if(this.props.data){
      details = Object.keys(this.props.data).map((key, i)=>{
        return <DetailItem key={i} label={key} value={this.props.data[key]} isLink={key=="link"}/>;
      });

    }
    else{
      details = <div className="placeholder Detail">Select a {this.props.rep ? 'representative' : 'senator'}</div>;

    }


    console.log(`details`,details);
    return (
      <div className={"Detail"}>
        <h3>Info</h3>
        <div className="infoSection">
          {details}
        </div>
      </div>
    );
  }
}

export default Detail;
