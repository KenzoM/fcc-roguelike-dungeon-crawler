import { combineReducers } from 'redux';
import mapGenerated from './reducers_mapGenerator';
import toggleLights from './reducers_toggleLights';

const rootReducer = combineReducers({
  mapGenerated: mapGenerated,
  toggleLights: toggleLights
});

export default rootReducer;
