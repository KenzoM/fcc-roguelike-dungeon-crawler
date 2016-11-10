import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tiles from '../components/Tiles';

import { listenToWindowEvent } from '../actions';

class MapGenerator extends Component {
  constructor(props){
    super(props);
    this.renderTiles = this.renderTiles.bind(this);
    this.onClickToggleLights = this.onClickToggleLights.bind(this);
    this.getDarkCoords = this.getDarkCoords.bind(this);
    this.getPeripheral = this.getPeripheral.bind(this);
    this.getViewBox = this.getViewBox.bind(this);
    this.setRowsCols = this.setRowsCols.bind(this);
  }

  componentDidMount(){
    this.props.listenToWindowEvent();
  }

  getPeripheral(playerLocation,randomLocation,celVal){
    if (randomLocation[0] === playerLocation[0] &&
      ((randomLocation[1] >= playerLocation[1] - 2 && randomLocation[1] < playerLocation[1])
      ||(randomLocation[1] <= playerLocation[1] + 2 && randomLocation[1] > playerLocation[1]))){
      return celVal
    } else if (randomLocation[1] === playerLocation[1] &&
      ((randomLocation[0] >= playerLocation[0] - 2 && randomLocation[0] < playerLocation[0])
      ||(randomLocation[0] <= playerLocation[0] + 2 && randomLocation[0] > playerLocation[0]))){
      return celVal
    } else if (playerLocation[0] === randomLocation[0] + 1 && playerLocation[1] === randomLocation[1] + 1){
      return celVal
    } else if (playerLocation[0] === randomLocation[0] - 1 && playerLocation[1] === randomLocation[1] - 1){
      return celVal
    } else if (playerLocation[0] === randomLocation[0] + 1 && playerLocation[1] === randomLocation[1] - 1){
      return celVal
    } else if (playerLocation[0] === randomLocation[0] - 1 && playerLocation[1] === randomLocation[1] + 1){
      return celVal
    } else{
      return 7
    }
  }
  getDarkCoords(dungeonGrid){
    let darkDungeonGrid = dungeonGrid.map((row,rowIndex) =>{
      return row.map((celVal,colIndex) =>{
        return this.getPeripheral(this.props.player.coords, [rowIndex, colIndex], celVal)
      })
    })
    return darkDungeonGrid;
  }
  renderTiles(cellVal,row,column) {
    let player;
    let playerCoords = this.props.player.coords;
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

  getViewBox() {
    let coords = this.props.player.coords
    let width = 1000
    let height = 1000
    let cell = 50
    let minX = coords[1]*cell-width/2
    let minY = coords[0]*cell-height/2

    if (coords[1] < width/cell/2) {
      minX = 0
    } // handles left side

    if (coords[0] < height/cell/2) {
      minY = 0
    }// handles top

    //TODO - handle right side and bottom

    return `${minX} ${minY} ${width} ${height}`
  }

  setRowsCols(row, rowIndex) {
    return row.map( (cellVal, colIndex) => (
        this.renderTiles(cellVal,rowIndex,colIndex)
      ))
  }

  onClickToggleLights(){
    let darkCoords = this.getDarkCoords(this.props.grid);

    return (
      <svg viewBox={this.getViewBox()}>
        {
          this.props.lights
            ? darkCoords.map((row, rowIndex) => this.setRowsCols(row, rowIndex))
            : this.props.grid.map((row, rowIndex) => this.setRowsCols(row, rowIndex))
        }
      </svg>
    )
  }

  render(){
    return (
      <div className="dungeon-map">
        {this.onClickToggleLights()}
      </div>
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
    player: state.mapGenerated.player,
    lights: state.toggleLights
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapGenerator)
