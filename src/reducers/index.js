import { combineReducers } from 'redux';
import map from './reducers_map'

const rootReducer = combineReducers({
  map: map
});

export default rootReducer;
