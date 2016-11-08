//ACTIONS
let TOGGLE_LIGHTS = "TOGGLE_LIGHTS";

export default function(state = false, action){
  switch (action.type) {
    case TOGGLE_LIGHTS:{
      console.log('switch the state light');
      let newLightState = state.lights === true ? false : true
      return {...state, lights: newLightState }
    }
    default:
      return state;
  }
}
