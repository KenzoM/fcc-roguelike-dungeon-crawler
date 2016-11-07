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

const getPlayerAttack = (level, weaponDamage) => {
  let damage = (level * 40) + (weaponDamage * 30)
  return damage;
}

const randPlayerDamage = (damage) => {
  // randomizes attack damage + or - 20%
  let max = damage + damage * 0.2
  let min = damage - damage * 0.2
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function attackEnemy(player,enemy){
  let playerDamage = randPlayerDamage(getPlayerAttack(player.weapon, weapon[0].damage)); //write a function that damage randomly
  let enemyDamage = enemy.strength; //etc
  let playerHealth = player.health - enemyDamage;
  let enemyHealth = enemy.health - playerDamage;
  return([playerHealth, enemyHealth])
}

const updateGameObject = (state, newCoords) =>{
  let thing = state.grid[newCoords[0]][newCoords[1]]
  switch (thing) {
    case 2:{ //engaging with enemy
      let stateEnemies = state.enemies.map(enemy => Object.assign({}, enemy)); //MAKE SHALLOW COPY
      let actualPlayer = state.player;
      let actualEnemy = stateEnemies.filter( enemy => {
        return enemy.coords[0] === newCoords[0] && enemy.coords[1] === newCoords[1]
      })
      let resultBattle = attackEnemy(actualPlayer,actualEnemy[0])
      //resultBattle[0] = player's Health
      //resultBattle[1] = enemy's Health
      actualEnemy[0].health = resultBattle[1];

      if (resultBattle[1] <= 0){  // case1: if player kills an Enemy
        return [{...state.player, health: resultBattle[0], coords: newCoords}, stateEnemies]
      } else if (resultBattle[0] <= 0) { // case2: if player dies
        console.log("GAME OVER") //restart the game ... NEED TO UPDATE THIS
        return [{...state.player, health: resultBattle[0], coords: newCoords}, stateEnemies]
      }
      else{ //case no one dies -> update their damaged health
        return [{...state.player, health: resultBattle[0]}, stateEnemies]
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
      return [{...state.player, coords: newCoords}, null]
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
      } else{
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: gameUpdate[1] || state.enemies
        }
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
      } else{
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: gameUpdate[1] || state.enemies
        }
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
      } else{
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: gameUpdate[1] || state.enemies
        }
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
      } else{
        return{
          ...state,
          grid: newGrid,
          player: gameUpdate[0],
          enemies: gameUpdate[1] || state.enemies
        }
      }
    }
    default:
      return state;
  }
}
