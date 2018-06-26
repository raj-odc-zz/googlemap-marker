import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MarkerComponent from './MarkerComponent/MarkerComponent.jsx';

class App extends Component {

  render() {
    return (
      <div className="App">
        <MarkerComponent />
      </div>
    );
  }
}

export default App;
