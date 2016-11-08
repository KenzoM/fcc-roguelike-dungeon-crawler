import { combineReducers } from 'redux';
import mapGenerated from './reducers_mapGenerator';
import ToggleLights from './reducers_toggleLights';

const rootReducer = combineReducers({
  mapGenerated: mapGenerated,
  ToggleLights: ToggleLights
});

export default rootReducer;
