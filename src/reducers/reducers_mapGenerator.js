import initialState from './initialState'

//ACTIONS
let PRESS_UP = "PRESS_UP"
let PRESS_DOWN = "PRESS_DOWN"
let PRESS_LEFT = "PRESS_LEFT"
let PRESS_RIGHT = "PRESS_RIGHT"


export default function(state = initialState, action){
  switch (action.type) {
    case PRESS_UP:
      console.log('press up')
      return {...state}
      break;
    case PRESS_DOWN:
      console.log('press down')
      return {...state}
      break;

    case PRESS_LEFT:
      console.log('press left')
      return {...state}
      break;
    case PRESS_RIGHT:
      console.log('press right')
      return {...state}
      break;

    default:
      return state;
  }
}
