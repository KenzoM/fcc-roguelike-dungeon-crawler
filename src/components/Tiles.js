import React, { Component } from 'react';

export default class Tiles extends Component {
  constructor(props){
    super(props);
  }
  render(){
    // let tile = this.props.cell === 0 ? "wall" : "floor";
    let tile
    switch(this.props.cell) {
      case 0:
        tile = "wall"
        break;
      case 1:
        tile = "floor"
        break;
      case 2:
        tile = "weapon"
        break;
      case 3:
        tile = "item"
        break;
      case 4:
        tile = "enemy"
        break;
    }

    const row = this.props.row * 50;
    const col = this.props.column * 50;

    if (this.props.player === 1) { tile = "player" }

    return (
      <rect x={col} y={row} width="50" height="50" className={tile}/>
    )
  }
}
