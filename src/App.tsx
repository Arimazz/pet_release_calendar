import React, { Component } from 'react';

import Calendar from './components/Calendar';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              react<b>calendar</b>
            </span>
          </div>
        </header>
        <div className="calendar-wrap">
          <Calendar />
        </div>
      </div>
    );
  }
}

export default App;
