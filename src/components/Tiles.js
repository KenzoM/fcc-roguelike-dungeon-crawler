import React, { Component } from 'react';

export default class Tiles extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let tile = this.props.cell === 0 ? "wall" : "floor";
    const row = this.props.row * 50;
    const col = this.props.column * 50;

    if (this.props.enemy === 1) { tile = "enemy" }
    if (this.props.weapon === 1) { tile = "weapon" }
    if (this.props.item === 1) { tile = "item" }
    if (this.props.player === 1) { tile = "player" }

    return (
      <rect x={col} y={row} width="50" height="50" className={tile}/>
    )
  }
}
