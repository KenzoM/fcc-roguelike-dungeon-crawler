import { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import StatusBar from '../components/StatusBar'

function mapStateToProps(state) {
  return {
    player: state.mapGenerated.player
  };
}

export default connect(mapStateToProps)(StatusBar)
