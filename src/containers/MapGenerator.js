import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Tiles from '../components/Tiles';

class MapGenerator extends Component {
  constructor(props){
    super(props);
    this.renderTiles = this.renderTiles.bind(this);
    this.getCoords = this.getCoords.bind(this);
  }


  renderTiles(cellVal,row,column,enemy,weapon,item) {
    return (
      <Tiles
        cell={cellVal}
        row={row}
        column={column}
        enemy={enemy}
        weapon={weapon}
        item={item}
      />
    )
  };

  getCoords(things) {
    if (this.props.hasOwnProperty(things)) {
      return this.props[things].map((thing) => (
        thing.coords[0]+"-"+thing.coords[1]
      ))
    }
  }

  render(){
    let enemyCoords = this.getCoords("enemies")
    let weaponCoords = this.getCoords("weapons")
    let itemCoords = this.getCoords("items")

    return (
      <svg width="500" height="500">
        {this.props.grid.map( (row, rowIndex) =>(
          row.map( (cellVal, colIndex) => {

            let enemy, weapon, item;
            enemyCoords.indexOf(rowIndex+"-"+colIndex) > -1 ? enemy = 1 : enemy = 0;
            itemCoords.indexOf(rowIndex+"-"+colIndex) > -1 ? item = 1 : item = 0;
            weaponCoords.indexOf(rowIndex+"-"+colIndex) > -1 ? weapon = 1 : weapon = 0;

            return this.renderTiles(cellVal,rowIndex,colIndex,enemy,weapon,item)
          })
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
    items: state.mapGenerated.items
  };
}

export default connect(mapStateToProps)(MapGenerator)
