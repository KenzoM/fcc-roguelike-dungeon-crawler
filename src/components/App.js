import React, { Component } from 'react';
import MapGenerator from '../containers/MapGenerator';
import '../stylesheets/styles.css';

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <MapGenerator />
      </div>
    );
  }
}
