import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class MapGenerator extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  render(){

    return (
      <svg width="500" height="500">
        ///cell componeont here
      </svg>
    )
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({onCellClick}, dispatch)
// }
function mapStateToProps(state) {
  return {
    mapGenerated: state.mapGenerated
  };
}

export default connect(mapStateToProps)(MapGenerator)
