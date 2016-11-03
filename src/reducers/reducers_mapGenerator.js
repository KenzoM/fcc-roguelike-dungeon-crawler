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

const getNewGrid = (grid, row, col) => {
  console.log(row, col)
  return [
    ...grid.slice(0, row), // new row
    [
      ...grid[row].slice(0, col),
      1, // new val
      ...grid[row].slice(col + 1)
    ],
    ...grid.slice(row + 1)
  ]
}

export default function(state = initialState, action){

  //TODO: change grid state, handle out of bounds

  switch (action.type) {
    case PRESS_UP: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow - 1, currCol]
      let thereIsWall = validateWall(state.grid, newCoords);

      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: { ...state.player, coords: newCoords }}
      }
    }

    case PRESS_DOWN: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow + 1, currCol]
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: { ...state.player, coords: newCoords }}
      }
    }

    case PRESS_LEFT: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow, currCol - 1];
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: { ...state.player, coords: newCoords }}
      }
    }

    case PRESS_RIGHT: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow, currCol + 1];
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: { ...state.player, coords: newCoords }}
      }
    }
    default:
      return state;
  }
}
