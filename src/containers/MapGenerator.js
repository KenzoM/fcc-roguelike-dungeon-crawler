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
        {this.props.mapGenerated.grid.map( (row,rowIndex) =>{
          row.map( (cell, colIndex) =>{
            console.log(cell, rowIndex, colIndex)
          })
        })}
        <rect x="10" y="10" width="200" height="100"/>
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
