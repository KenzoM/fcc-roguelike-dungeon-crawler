import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Tiles from '../components/Tiles';

class MapGenerator extends Component {
  constructor(props){
    super(props);
    this.renderTiles = this.renderTiles.bind(this);
  }
  componentDidMount(){

  }
  renderTiles(cell,row,column){
    return (
       <Tiles cell={cell} row={row} column={column} />
    )
  }
  render(){
    return (
      <svg width="500" height="500">
        {this.props.mapGenerated.grid.map( (row,rowIndex) =>{
          return row.map( (cell, colIndex) => {
            return this.renderTiles(cell,rowIndex,colIndex)
          })
        })}
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
