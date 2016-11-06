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

function attackEnemy(player,enemy){
  let playerDamage = player.attack; //write a function that damage randomly
  let enemyDamage = enemy.strength; //etc
  let playerHealth = player.health - enemyDamage;
  let enemyHealth = enemy.health - playerDamage;
  return([playerHealth, enemyHealth])
}

const updateGameObject = (state, newCoords) =>{
  let thing = state.grid[newCoords[0]][newCoords[1]]
  switch (thing) {
    case 2:{ //engaging with enemy
      let actualPlayer = state.player;
      let actualEnemy = state.enemies.filter( enemy => {
        return enemy.coords[0] === newCoords[0] && enemy.coords[1] === newCoords[1]
      })
      let resultBattle = attackEnemy(actualPlayer,actualEnemy[0])
      //resultBattle[0] = player's Health
      //resultBattle[1] = enemy's Health

      // actualEnemy[0].health = resultBattle[1]; this mutates for some reason...
      //instead I will return the number value of the actualEnemy's health

      if (resultBattle[1] <= 0){  // case1: if player kills an Enemy
        return [{...state.player, health: resultBattle[0], coords: newCoords}, resultBattle[1]]
      } else if (resultBattle[0] <= 0) { // case2: if player dies
        console.log("GAME OVER") //restart the game ... NEED TO UPDATE THIS
        return [{...state.player, health: resultBattle[0], coords: newCoords}, resultBattle[1]]
      }
      else{ //case no one dies -> update their damaged health
        return [{...state.player, health: resultBattle[0]}, resultBattle[1]]
      }
    }
    case 3:{ //item
      let playerHealth = state.player.health;
      let actualItem = state.items.filter( item => {
        return item.coords[0] === newCoords[0] && item.coords[1] === newCoords[1]
      })
      playerHealth += actualItem[0].health;
      return [{...state.player, health: playerHealth, coords: newCoords},null]
    }
    case 4:{ //weapon
      let playerWeapon = state.player.weapon;
      let actualWeapon = state.weapons.filter( weapon => {
        return weapon.coords[0] === newCoords[0] && weapon.coords[1] === newCoords[1]
      })
      playerWeapon = actualWeapon[0].name;
      return [{...state.player, weapon: playerWeapon, coords: newCoords},null]
    }
    default:
      return [{...state.player, coords: newCoords}, null] //nothing to update for Enemy so null
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

const EnemyObjectUpdate = (enemyState, coord, newHealth) => {
  let newEnemyState = enemyState.slice();
  newEnemyState.forEach( enemy =>{
    if (enemy.coords[0] === coord[0] && enemy.coords[1] === coord[1]){
      return enemy.health = newHealth;
    }
  })
  return newEnemyState;
}

export default function(state = initialState, action){
  switch (action.type) {
    case PRESS_UP: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow - 1, currCol];
      //gameUpdate[0] = player's state
      //gameUpdate[1] = enemy's health value (number)
      let gameUpdate = updateGameObject(state, newCoords);
      let newEnemyHealth = gameUpdate[1]
      //we use newEnemyHealth to pass in EnemyObjectUpdate to find
      //the enemy thats in newCoords, change the health of it, and return a new enemyState array.
      let enemyState = EnemyObjectUpdate(state.enemies, newCoords, newEnemyHealth)
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: enemyState
        }
      }
    }
    case PRESS_DOWN: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow + 1, currCol];
      let gameUpdate = updateGameObject(state, newCoords);
      let newEnemyHealth = gameUpdate[1]
      let enemyState = EnemyObjectUpdate(state.enemies, newCoords, newEnemyHealth)
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: enemyState
        }
      }
    }

    case PRESS_LEFT: {
      let currRow = state.player.coords[0];
      let currCol = state.player.coords[1];
      let newGrid = getNewGrid(state.grid, currRow, currCol);

      let newCoords = [currRow, currCol - 1];
      let gameUpdate = updateGameObject(state, newCoords);
      let newEnemyHealth = gameUpdate[1];
      let enemyState = EnemyObjectUpdate(state.enemies, newCoords, newEnemyHealth)
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: enemyState
        }
      }
    }

    case PRESS_RIGHT: {
      let currRow = state.player.coords[0]
      let currCol = state.player.coords[1]
      let newGrid = getNewGrid(state.grid, currRow, currCol)

      let newCoords = [currRow, currCol + 1];
      let gameUpdate = updateGameObject(state, newCoords);
      let newEnemyHealth = gameUpdate[1]
      let enemyState = EnemyObjectUpdate(state.enemies, newCoords, newEnemyHealth)
      let thereIsWall = validateWall(state.grid, newCoords);
      if (thereIsWall){
        return state
      } else{
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: enemyState
        }
      }
    }
    default:
      return state;
  }
}
