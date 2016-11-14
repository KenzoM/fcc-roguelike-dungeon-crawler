import React, { Component } from 'react';
import MapGenerator from '../containers/MapGenerator';
import StatusBarContainer from '../containers/StatusBarContainer';
import ToggleLights from '../containers/ToggleLights';
import Message from '../containers/MessageContainer';
import '../stylesheets/styles.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <StatusBarContainer />
        <div className="container">
          <MapGenerator />
          <Message />
        </div>
        <ToggleLights />
      </div>
    );
  }
}
