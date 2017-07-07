import React, { Component } from 'react';
import MainContainer from './containers/main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h2 className="blue">Who's My Representative?</h2>
          <MainContainer></MainContainer>
      </div>
    );
  }
}

export default App;
