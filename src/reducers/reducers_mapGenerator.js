import { initialState } from '../preload/initialState'
import { updateGrid, updateGameObject, reachedGoal, newGame } from './helpers'

//ACTIONS
let PRESS_UP = "PRESS_UP";
let PRESS_DOWN = "PRESS_DOWN";
let PRESS_LEFT = "PRESS_LEFT";
let PRESS_RIGHT = "PRESS_RIGHT";

export default function(state = initialState, action){
  let { coords } = state.player
  // updates current player coords to floor (1)
  let newGrid = updateGrid(state.grid, coords[0], coords[1])

  switch (action.type) {
    case PRESS_UP: {
      let newCoords = action.payload.newCoords

      let gameUpdate = updateGameObject(state, newCoords);
      //gameUpdate[0] = player's new state
      //gameUpdate[1] = enemies's new state

      if (reachedGoal(state.grid, newCoords)){
        let nextDungeon = state.dungeon + 1
        let newMap = newGame(nextDungeon)
        return {
          ...newMap,
          player: {...state.player, coords: newMap.player.coords},
          dungeon: nextDungeon
        }

      } else if(gameUpdate[0]){
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: gameUpdate[1] || state.enemies,
          boss: gameUpdate[2] || state.boss,
          message: gameUpdate[3] || state.message
        }
      } else{
        return newGame();
      }
    }
    case PRESS_DOWN: {
      let newCoords = action.payload.newCoords

      let gameUpdate = updateGameObject(state, newCoords);

      if (reachedGoal(state.grid, newCoords)){
        let nextDungeon = state.dungeon + 1
        let newMap = newGame(nextDungeon)
        return {
          ...newMap,
          player: {...state.player, coords: newMap.player.coords},
          dungeon: nextDungeon
        }
      } else if(gameUpdate[0]){
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: gameUpdate[1] || state.enemies,
          boss: gameUpdate[2] || state.boss,
          message: gameUpdate[3] || state.message
        }
      } else{
        return newGame();
      }
    }

    case PRESS_LEFT: {
      let newCoords = action.payload.newCoords

      let gameUpdate = updateGameObject(state, newCoords);

      if (reachedGoal(state.grid, newCoords)){
        let nextDungeon = state.dungeon + 1
        let newMap = newGame(nextDungeon)
        return {
          ...newMap,
          player: {...state.player, coords: newMap.player.coords},
          dungeon: nextDungeon
        }
      } else if(gameUpdate[0]){
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: gameUpdate[1] || state.enemies,
          boss: gameUpdate[2] || state.boss,
          message: gameUpdate[3] || state.message
        }
      } else{
        return newGame();
      }
    }

    case PRESS_RIGHT: {
      let newCoords = action.payload.newCoords

      let gameUpdate = updateGameObject(state, newCoords);

      if (reachedGoal(state.grid, newCoords)){
        let nextDungeon = state.dungeon + 1
        let newMap = newGame(nextDungeon)
        return {
          ...newMap,
          player: {...state.player, coords: newMap.player.coords},
          dungeon: nextDungeon
        }
      } else if(gameUpdate[0]){
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: gameUpdate[1] || state.enemies,
          boss: gameUpdate[2] || state.boss,
          message: gameUpdate[3] || state.message
        }
      } else{
        return newGame();
      }
    }
    default:
      return state;
  }
}
