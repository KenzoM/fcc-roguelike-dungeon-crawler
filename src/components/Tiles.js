import React, { Component } from 'react';

export default class Tiles extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const tile = this.props.cell === 0 ? "wall" : "floor";
    const row = this.props.row * 50;
    const col = this.props.column * 50;
    return(
      <rect x={row} y={col} width="50" height="50" className={tile}/>
    )
  }
}
