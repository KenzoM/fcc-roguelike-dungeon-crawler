import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tiles from '../components/Tiles';

import { listenToWindowEvent } from '../actions';

class MapGenerator extends Component {
  constructor(props){
    super(props);
    this.renderTiles = this.renderTiles.bind(this);
    this.getCoords = this.getCoords.bind(this);
    // this.playerMove = this.playerMove.bind(this);
  }

  componentDidMount(){
    this.props.listenToWindowEvent();
    // window.addEventListener('keydown', this.playerMove, false);
  }

  getCoords(things) {
    if (this.props.hasOwnProperty(things)) {
      return this.props[things].map((thing) => (
        thing.coords[0]+"-"+thing.coords[1]
      ))
    }
  }

  renderTiles(cellVal,row,column) {

    let player;

    let playerCoords = this.props.player.coords

    playerCoords[0] === row && playerCoords[1] === column ? player = 1 : player = 0;

    return (
      <Tiles
        cell={cellVal}
        row={row}
        column={column}
        player={player}
      />
    )
  };

  render(){
    return (
      <svg viewBox="0 0 1000 1000">
        {this.props.grid.map( (row, rowIndex) =>(
          row.map( (cellVal, colIndex) => (
            this.renderTiles(cellVal,rowIndex,colIndex)
          ))
        ))}
      </svg>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({listenToWindowEvent}, dispatch)
}

function mapStateToProps(state) {
  return {
    grid: state.mapGenerated.grid,
    enemies: state.mapGenerated.enemies,
    weapons: state.mapGenerated.weapons,
    items: state.mapGenerated.items,
    player: state.mapGenerated.player
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapGenerator)
