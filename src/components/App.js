import React, { Component } from 'react';
import MapGenerator from '../containers/MapGenerator';
import StatusBarContainer from '../containers/StatusBarContainer'
import '../stylesheets/styles.css';

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <StatusBarContainer />
        <MapGenerator />
      </div>
    );
  }
}
