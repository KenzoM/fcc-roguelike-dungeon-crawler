import 'react';
import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar'

const mapStateToProps = (state) => {
  return {
    player: state.mapGenerated.player
  };
}

export default connect(mapStateToProps)(StatusBar)
