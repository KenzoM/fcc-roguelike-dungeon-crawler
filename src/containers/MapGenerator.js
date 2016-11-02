import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Tiles from '../components/Tiles';

class MapGenerator extends Component {
  constructor(props){
    super(props);
    this.renderTiles = this.renderTiles.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.playerMove = this.playerMove.bind(this)
  }

  componentDidMount(){
    window.addEventListener('keydown', this.playerMove, false);
  }

  playerMove(event){
    const arrowKeyCode = [37, 38, 39, 40];
    if (arrowKeyCode.includes(event.keyCode)){
      switch (event.keyCode){
        case 37: //left
          console.log('move left');
          break;
        case 38: //up
          console.log('move up')
          break;
        case 39: //right
          console.log('move right')
          break;
        case 40: //down
          console.log('move down')
          break;
      }
    } else{
      event.preventDefault();
    }
  }

  getCoords(things) {
    if (this.props.hasOwnProperty(things)) {
      return this.props[things].map((thing) => (
        thing.coords[0]+"-"+thing.coords[1]
      ))
    }
  }

  renderTiles(cellVal,row,column) {
    let enemyCoords = this.getCoords("enemies")
    let weaponCoords = this.getCoords("weapons")
    let itemCoords = this.getCoords("items")

    let enemy, weapon, item, player;

    enemyCoords.indexOf(row+"-"+column) > -1 ? enemy = 1 : enemy = 0;
    itemCoords.indexOf(row+"-"+column) > -1 ? item = 1 : item = 0;
    weaponCoords.indexOf(row+"-"+column) > -1 ? weapon = 1 : weapon = 0;

    let playerCoords = this.props.player.coords

    playerCoords[0] === row && playerCoords[1] === column ?
      player = 1 : player = 0;

    return (
      <Tiles
        cell={cellVal}
        row={row}
        column={column}
        enemy={enemy}
        weapon={weapon}
        item={item}
        player = {player}
      />
    )
  };

  render(){
    return (
      <svg width="500" height="500">
        {this.props.grid.map( (row, rowIndex) =>(
          row.map( (cellVal, colIndex) => (
            this.renderTiles(cellVal,rowIndex,colIndex)
          ))
        ))}
      </svg>
    )
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({onCellClick}, dispatch)
// }

function mapStateToProps(state) {
  return {
    grid: state.mapGenerated.grid,
    enemies: state.mapGenerated.enemies,
    weapons: state.mapGenerated.weapons,
    items: state.mapGenerated.items,
    player: state.mapGenerated.player
  };
}

export default connect(mapStateToProps)(MapGenerator)
