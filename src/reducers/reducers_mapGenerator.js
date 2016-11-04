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

const updatePlayerObject = (state, newCoords) =>{
  let thing = state.grid[newCoords[0]][newCoords[1]]
  switch (thing) {
    case 2:{
      break;
    }
    case 3:{ //item
      let playerHealth = state.player.health;
      let actualItem = state.items.filter( item => {
        return item.coords[0] === newCoords[0] && item.coords[1] === newCoords[1]
      })
      playerHealth += actualItem[0].health;
      return {...state.player, health: playerHealth, coords: newCoords}
    }
    case 4:{
      let playerWeapon = state.player.weapon;
      let actualWeapon = state.weapons.filter( weapon => {
        return weapon.coords[0] === newCoords[0] && weapon.coords[1] === newCoords[1]
      })
      playerWeapon = actualWeapon[0].name;
      return {...state.player, weapon: playerWeapon, coords: newCoords}
    }
    default:
      return {...state.player, coords: newCoords}

  }
}


const getNewGrid = (grid, row, col) => {
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

      let newCoords = [currRow - 1, currCol];
      let playerUpdate = updatePlayerObject(state, newCoords);
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: playerUpdate
        }
      }
    }
    case PRESS_DOWN: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow + 1, currCol];
      let playerUpdate = updatePlayerObject(state, newCoords);
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: playerUpdate
        }
      }
    }

    case PRESS_LEFT: {
      let currRow = state.player.coords[0];
      let currCol = state.player.coords[1];
      let newGrid = getNewGrid(state.grid, currRow, currCol);

      let newCoords = [currRow, currCol - 1];
      let playerUpdate = updatePlayerObject(state, newCoords);
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: playerUpdate
        }
      }
    }

    case PRESS_RIGHT: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow, currCol + 1];
      let playerUpdate = updatePlayerObject(state, newCoords);
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: playerUpdate
        }
      }
    }
    default:
      return state;
  }
}
