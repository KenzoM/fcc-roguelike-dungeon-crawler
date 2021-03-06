import React, { Component } from 'react';

export default class Tiles extends Component {

  render(){
    let tile
    switch(this.props.cell) {
      case 0:
        tile = "wall"
        break;
      case 1:
        tile = "floor"
        break;
      case 2:
        tile = "enemy"
        break;
      case 3:
        tile = "item"
        break;
      case 4:
        tile = "weapon"
        break;
      case 5:
        tile = "goal"
        break;
      case 6:
        tile = "boss"
        break;
      case 7:
        tile = "dark"
        break;
      default:
        break;
    }
    const row = this.props.row * 40;
    const col = this.props.column * 40;

    if (this.props.player === 1) { tile = "player" }
    return (
      <rect x={col} y={row} width="40" height="40" className={tile}/>
    )
  }
}
