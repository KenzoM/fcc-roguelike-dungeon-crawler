import React, { Component } from 'react';
import MapGenerator from '../containers/MapGenerator';
import StatusBarContainer from '../containers/StatusBarContainer';
import Message from '../containers/MessageContainer';
import '../stylesheets/styles.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
      <header>RogueLike Dungeon Crawler</header>
        <StatusBarContainer />
        <div className="container">
          <MapGenerator />
          <Message />
        </div>
      </div>
    );
  }
}
