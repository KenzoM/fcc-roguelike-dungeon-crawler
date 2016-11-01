import React, { Component } from 'react';

export default class Tiles extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const tile = this.props.cell === 0 ? "wall" : "floor";
    const row = this.props.row * 100;
    const col = this.props.column * 100;
    console.log(row)

    return(
      <rect x={row} y={col} width="100" height="100" className={tile}/>
    )
  }
}
