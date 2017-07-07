import React, { Component } from 'react';
import './style.css';
import ToggleButton from 'react-toggle-button';
import Select from 'react-select';
import * as states from './states.json';

class Options extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="optionsBar">
        
        <div className="toggle">
          <div className={!this.props.rep ? 'selected option' : 'option'}>Senators</div>
          <ToggleButton
            inactiveLabel=""
            activeLabel=""
            colors={{
              activeThumb: {
                base: 'rgb(250,250,250)',
              },
              inactiveThumb: {
                base: 'rgb(250,250,250)',
              },
              active: {
                base: '#0093ff',
                hover: '#0093ff',
              },
              inactive: {
                base: '#0093ff',
                hover: '#0093ff',
              }
            }}
            trackStyle={{ "height": "6px" }}
            value={this.props.rep}
            onToggle={this.props.repHandler} />
          <div className={this.props.rep ? 'selected option' : 'option'}>Representatives</div>
        </div>

        <div className="dropdown">
          <Select
            name="form-field-name"
            clearable={false}
            value={this.props.state}
            options={states}
            onChange={this.props.stateHandler}
          />
        </div>

      </div>
    );
  }
}

export default Options;
