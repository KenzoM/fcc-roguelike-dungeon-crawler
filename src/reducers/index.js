import { combineReducers } from 'redux';
import mapGenerated from './reducers_mapGenerator'

const rootReducer = combineReducers({
  mapGenerated: mapGenerated
});

export default rootReducer;
