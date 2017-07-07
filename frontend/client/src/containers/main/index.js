import React, { Component } from 'react';
import Options from '../../components/options';
import Master from '../../components/master';
import Detail from '../../components/detail';
import axios from 'axios';
import './style.css';

const url = "/"

class MainContainer extends Component {
  constructor() {
    super();

    this.repHandler = this.repHandler.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      rep: true,
      state: "UT",
      data: [],
      selected: null
    }

    this.senators = {};
    this.representatives = {};
  }

  render() {
    return (
      <div className="mainContainer">
        <Options
          rep={this.state.rep}
          state={this.state.state}
          stateHandler={this.stateHandler}
          repHandler={this.repHandler} />
        <div className={"viewContainer"}>
          <div className="masterDetail">

            <Master 
              data={this.state.data} 
              rep={this.state.rep} 
              handleSelect={this.handleSelect} 
              selected={this.state.selected}/>
              
            <Detail 
              data={this.state.selected} 
              rep={this.state.rep}/>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.update();
  }

  repHandler() {
    this.setState({
      rep: !this.state.rep
    }, this.update)

  }

  stateHandler(state) {
    this.setState({
      state: state.value
    }, this.update(state.value))

  }

  handleSelect(entity){
    this.setState({
      selected: entity
    })
  }

  update(state) {
    this.getData(state)
      .then(res => {
        this.setState({
          data: res,
          selected:null
        })
      })
      .catch(err => console.log(`ERROR GETTING DATA`, err))
  }

  getData(state) {
    return new Promise((resolve, reject) => {
      let endpoint = this.state.rep ? 'representatives' : 'senators';
      state = !state ? this.state.state : state;
      if (this[endpoint][state])
        return resolve(this[endpoint][state])

      axios.get(`${url}${endpoint}/${state}`)
        .then(res => {
          let data = res.data.results;
          this[endpoint][state] = data;
          return resolve(data);
        })
        .catch(reject)

    })
  }
}

export default MainContainer;
