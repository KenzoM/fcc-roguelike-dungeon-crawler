import initialState from './initialState'

//ACTIONS
let PRESS_UP = "PRESS_UP";
let PRESS_DOWN = "PRESS_DOWN";
let PRESS_LEFT = "PRESS_LEFT";
let PRESS_RIGHT = "PRESS_RIGHT";

function validateWall(currentGrid,coordinates){
  let x = coordinates[0];
  let y = coordinates[1];
  return currentGrid[x][y] === 0
}


export default function(state = initialState, action){

  //TODO: change grid state, handle out of bounds

  switch (action.type) {
    case PRESS_UP: {
      let newCoords = [state.player.coords[0]-1, state.player.coords[1]]
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          player: { ...state.player, coords: newCoords }}
      }
    }
    case PRESS_DOWN: {
      let newCoords = [state.player.coords[0]+1, state.player.coords[1]]
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          player: { ...state.player, coords: newCoords }}
      }
    }

    case PRESS_LEFT: {
      let newCoords = [state.player.coords[0], state.player.coords[1]-1];
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          player: { ...state.player, coords: newCoords }}
      }
    }

    case PRESS_RIGHT: {
      let newCoords = [state.player.coords[0], state.player.coords[1]+1];
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          player: { ...state.player, coords: newCoords }}
      }
    }

    default:
      return state;
  }
}
