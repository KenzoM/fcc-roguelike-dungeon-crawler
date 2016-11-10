import 'react';
import { connect } from 'react-redux';
import MessageBoard from '../components/MessageBoard'

const mapStateToProps = (state) => {
  return {
    message: state.mapGenerated.message
  };
}

export default connect(mapStateToProps)(MessageBoard)
