import React, { Component } from 'react';

export default class MessageBoard extends Component {
  render(){
    let message = this.props.message;
    return (
      <p>{message}</p>
    );
  }
}
