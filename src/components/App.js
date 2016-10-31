import React, { Component } from 'react';
import MapGenerator from '../containers/MapGenerator';
import style from '../stylesheets/styles.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <MapGenerator />
      </div>
    );
  }
}
