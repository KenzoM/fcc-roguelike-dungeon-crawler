import initialState from './initialState'

//ACTIONS
let PRESS_UP = "PRESS_UP"
let PRESS_DOWN = "PRESS_DOWN"
let PRESS_LEFT = "PRESS_LEFT"
let PRESS_RIGHT = "PRESS_RIGHT"


export default function(state = initialState, action){

  //TODO: change grid state, handle out of bounds
  
  switch (action.type) {
    case PRESS_UP: {
      let newCoords = [state.player.coords[0]-1, state.player.coords[1]]
      // let newGrid = grid
      //   .slice()

      return {
        ...state,
        player: { ...state.player, coords: newCoords }
      }
    }
    case PRESS_DOWN: {
      let newCoords = [state.player.coords[0]+1, state.player.coords[1]]
      return {
        ...state,
        player: { ...state.player, coords: newCoords }
      }
    }

    case PRESS_LEFT: {
      let newCoords = [state.player.coords[0], state.player.coords[1]-1]
      return {
        ...state,
        player: { ...state.player, coords: newCoords }
      }
    }

    case PRESS_RIGHT: {
      let newCoords = [state.player.coords[0], state.player.coords[1]+1]
      return {
        ...state,
        player: { ...state.player, coords: newCoords }
      }
    }

    default:
      return state;
  }
}
