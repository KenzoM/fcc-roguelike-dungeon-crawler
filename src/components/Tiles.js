import React, { Component } from 'react';

export default class Tiles extends Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props)
    return(
      <rect x="10" y="10" width="100" height="100"/>
    )
  }
}
