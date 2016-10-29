import { combineReducers } from 'redux';
import map from './reducer_map'

const rootReducer = combineReducers({
  map: map
});

export default rootReducer;
