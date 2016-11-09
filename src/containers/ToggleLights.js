import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchLight } from '../actions';

class ToggleLights extends Component {
  constructor(props){
    super(props);
    this.onClickToggle = this.onClickToggle.bind(this);
  }
  onClickToggle(){
    this.props.switchLight();
  }
  render(){
    return (
      <button onClick={this.onClickToggle}>Toggle Lights</button>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({switchLight}, dispatch)
}

export default connect(null, mapDispatchToProps )(ToggleLights)
