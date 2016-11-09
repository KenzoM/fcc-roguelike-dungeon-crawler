//ACTIONS
let TOGGLE_LIGHTS = "TOGGLE_LIGHTS";
let initialState = false

export default function(state = initialState, action){
  switch (action.type) {
    case TOGGLE_LIGHTS:{
      let newLightState = state === true ? false : true
      return newLightState
    }
    default:
      return state;
  }
}
