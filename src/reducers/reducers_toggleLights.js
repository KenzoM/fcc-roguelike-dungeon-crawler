import {initialState} from '../preload/initialState'
//ACTIONS
let TOGGLE_LIGHTS = "TOGGLE_LIGHTS";

export default function(state = initialState, action){
  switch (action.type) {
    case TOGGLE_LIGHTS:{
      console.log('switch the state light')
      return state
    }
    default:
      return state;
  }
}
