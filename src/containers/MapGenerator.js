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

  onClickToggleLights(){
    let darkCoords = this.getDarkCoords(this.props.grid);
    if (this.props.lights){
      return (
        <svg viewBox={`${this.props.player.coords[1]*50-500} ${this.props.player.coords[0]*50-500} 1000 1000`}>
          {darkCoords.map( (row, rowIndex) =>(
            row.map( (cellVal, colIndex) => (
              this.renderTiles(cellVal,rowIndex,colIndex)
            ))
          ))}
        </svg>
      )
    } else{
      return (
        <svg viewBox={`${this.props.player.coords[1]*50-500} ${this.props.player.coords[0]*50-500} 1000 1000`}>
          {this.props.grid.map( (row, rowIndex) =>(
            row.map( (cellVal, colIndex) => (
              this.renderTiles(cellVal,rowIndex,colIndex)
            ))
          ))}
        </svg>
      )
    }
  }

  render(){
    return (
      <div>
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
