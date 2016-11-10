import 'react';
import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';

const mapStateToProps = (state) => {
  return {
    player: state.mapGenerated.player,
    dungeon: state.mapGenerated.dungeon
  };
}

export default connect(mapStateToProps)(StatusBar)
