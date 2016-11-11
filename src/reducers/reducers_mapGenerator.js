import { initialState } from '../preload/initialState'
import { getNewGrid, updateGameObject, validateWall, reachedGoal, newGame } from './helpers'

//ACTIONS
let PRESS_UP = "PRESS_UP";
let PRESS_DOWN = "PRESS_DOWN";
let PRESS_LEFT = "PRESS_LEFT";
let PRESS_RIGHT = "PRESS_RIGHT";

export default function(state = initialState, action){
  switch (action.type) {
    case PRESS_UP: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow - 1, currCol];
      let gameUpdate = updateGameObject(state, newCoords);
      //gameUpdate[0] = player's new state
      //gameUpdate[1] = enemies's new state
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else if (reachedGoal(state.grid, newCoords)){
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
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow + 1, currCol];
      let gameUpdate = updateGameObject(state, newCoords);
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else if (reachedGoal(state.grid, newCoords)){
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
      let currRow = state.player.coords[0];
      let currCol = state.player.coords[1];
      let newGrid = getNewGrid(state.grid, currRow, currCol);

      let newCoords = [currRow, currCol - 1];
      let gameUpdate = updateGameObject(state, newCoords);
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else if (reachedGoal(state.grid, newCoords)){
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
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow, currCol + 1];
      let gameUpdate = updateGameObject(state, newCoords);
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else if (reachedGoal(state.grid, newCoords)){
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
