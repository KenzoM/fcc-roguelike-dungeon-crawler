import initialState from './initialState'

//ACTIONS
let CELL_CLICK = "CELL_CLICK"
let GLOBAL_KEY_PRESS = "GLOBAL_KEY_PRESS"

export default function(state = initialState, action){
  switch (action.type) {
    case CELL_CLICK:
      console.log(JSON.stringify(state.occupiedCoordinates))
      break;
    case GLOBAL_KEY_PRESS:
      console.log('global key press', action.keyCode)
      return {...state}
      break;
    default:
      return state;
  }
}
