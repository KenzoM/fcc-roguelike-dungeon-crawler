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
    let corners = 5;
    let allNeighbors = [];
    for(let i = 1; i <= corners; i++){
      for (let j = 1; j <= corners; j++){
        allNeighbors.push([playerLocation[0] + i, playerLocation[1] + j]);
        allNeighbors.push([playerLocation[0] - i, playerLocation[1] - j]);
        allNeighbors.push([playerLocation[0] + i, playerLocation[1] - j]);
        allNeighbors.push([playerLocation[0] - i, playerLocation[1] + j]);
        allNeighbors.push([playerLocation[0] + i, playerLocation[1]]);
        allNeighbors.push([playerLocation[0] - i, playerLocation[1]]);
        allNeighbors.push([playerLocation[0], playerLocation[1] + j]);
        allNeighbors.push([playerLocation[0], playerLocation[1] - j]);
      }
    }

    for(let i = 0; i < allNeighbors.length; i++){
      if (allNeighbors[i][0] === randomLocation[0] && allNeighbors[i][1] === randomLocation[1]){
        return celVal;
      }
    }
    return 7;
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
    let coords = this.props.player.coords;
    let width = 1000; // svg width
    let height = 1000; // svg height
    let cell = 40;

    let minX, minY;

    if (coords[1] < width/cell/2) {
      minX =  0 // stops left side
    } else if (coords[1] > this.props.gridWidth - width/cell/2) {
      minX = width/2 // right side
    } else {
      minX = coords[1]*cell-width/2 // default (middle of grid)
    }

    if (coords[0] < height/cell/2) {
      minY = 0 // top
    } else if (coords[0] > this.props.gridHeight - height/cell/2) {
      minY = height/2 // bottom
    } else {
      minY = coords[0]*cell-height/2 // default
    }

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
    lights: state.toggleLights,
    gridWidth: state.mapGenerated.gridWidth,
    gridHeight: state.mapGenerated.gridHeight
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapGenerator)
