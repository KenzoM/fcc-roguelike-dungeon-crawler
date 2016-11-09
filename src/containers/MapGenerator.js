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
    this.onClickToggleLights = this.onClickToggleLights.bind(this);
    this.getDarkCoords = this.getDarkCoords.bind(this);
  }

  componentDidMount(){
    this.props.listenToWindowEvent();
  }

  getCoords(things) {
    if (this.props.hasOwnProperty(things)) {
      return this.props[things].map((thing) => (
        thing.coords[0]+"-"+thing.coords[1]
      ))
    }
  }

  getDarkCoords(playerLocation, dungeonGrid){
    let darkDungeonGrid = dungeonGrid.map((row,rowIndex) =>{
      return row.map((celVal,colIndex) =>{
        if (rowIndex === playerLocation[0] || colIndex === playerLocation[1]){
          return celVal
        } else{
          return 6
        }
      })
    })
    return darkDungeonGrid;
  }
  renderTiles(cellVal,row,column) {
    let player;
    let playerCoords = this.props.player.coords; //here it tell us the exact location of the player
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
    let darkCoords = this.getDarkCoords(this.props.player.coords,this.props.grid);
    if (this.props.lights){
      return (
        <svg viewBox="0 0 1000 1000">
          {darkCoords.map( (row, rowIndex) =>(
            row.map( (cellVal, colIndex) => (
              this.renderTiles(cellVal,rowIndex,colIndex)
            ))
          ))}
        </svg>
      )
    } else{
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
