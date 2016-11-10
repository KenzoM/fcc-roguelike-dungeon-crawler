import {initialState, Game }from '../preload/initialState'
import { items, enemies, weapons } from '../preload/gameObjects';
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

function reachedGoal(grid,coords){
  return grid[coords[0]][coords[1]] === 5
}

function getPlayerAttack(level, weaponDamage){
  let damage = (level * 40) + (weaponDamage * 30)
  return damage;
}

function randDamage(damage, limit){
  // randomizes attack damage + or - limit %
  let max = damage + damage * limit
  let min = damage - damage * limit
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function attackEnemy(player,enemy){
  let playerDamage = randDamage(player.attack, 0.2);
  let enemyDamage = randDamage(enemy.strength, 0.1);
  let playerHealth = player.health - enemyDamage;
  let enemyHealth = enemy.health - playerDamage;
  return([playerHealth, enemyHealth])
}

function didReachNewLevel(statePlayer, expPoints){
  let diffExp = statePlayer - expPoints;
  return (diffExp <= 0)
}

function levelUpPlayer(statePlayer){
  let newStatePlayer = {...statePlayer};
  newStatePlayer.level++; //level up the player
  newStatePlayer.attack += 5; //level attack 5 points
  newStatePlayer.exp = 100; //reset back to 100 exp
  return [newStatePlayer.attack, newStatePlayer.exp, newStatePlayer.level];
}

function newGame(nextDungeon){
  let dungeon = nextDungeon ? nextDungeon : 1
  let newInitialGame = new Game();
  newInitialGame.mapGenerator(50,50);

  newInitialGame.weapons = weapons[dungeon - 1]
    .map( weapon => newInitialGame.placeThing("weapon", weapon))

  newInitialGame.items = items[dungeon - 1]
    .map( item => newInitialGame.placeThing("item", item))

  newInitialGame.enemies = enemies[dungeon - 1]
    .map( enemy => newInitialGame.placeThing("enemy", enemy))

  newInitialGame.player.coords = newInitialGame.placeThing("player")

  if (dungeon < weapons.length) {
    newInitialGame.goal = newInitialGame.placeThing("goal")
  }

  return newInitialGame;
}

function updateGameObject(state, newCoords){
  let thing = state.grid[newCoords[0]][newCoords[1]]
  switch (thing) {
    case 2:{ //engaging with enemy
      let stateEnemies = state.enemies.map(enemy => Object.assign({}, enemy)); //MAKE SHALLOW COPY
      let actualPlayer = state.player;
      let actualEnemy = stateEnemies.filter( enemy => {
        return enemy.coords[0] === newCoords[0] && enemy.coords[1] === newCoords[1]
      })
      let resultBattle = attackEnemy(actualPlayer,actualEnemy[0])
      actualEnemy[0].health = resultBattle[1];

      if (resultBattle[1] <= 0 && resultBattle[0] > 0){  // case1: if player kills an Enemy
        let statePlayer;
        let newExp = state.player.exp - actualEnemy[0].exp;
        //check if players EXP reached to a new level
        if (didReachNewLevel(state.player.exp, actualEnemy[0].exp)){
          let newLevel = levelUpPlayer(state.player);
          statePlayer = {...state.player, health: resultBattle[0],
                            coords: newCoords, attack: newLevel[0],
                            exp: newLevel[1], level: newLevel[2] }
        } else{
          statePlayer = {...state.player, health: resultBattle[0],
                            coords: newCoords, exp: newExp }
        }
        return [statePlayer, stateEnemies]

      } else if (resultBattle[0] <= 0) { // case2: if player dies
        return [null,null]
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
      let newAttack = getPlayerAttack(state.player.level, actualWeapon[0].damage)
      return [{...state.player, attack: newAttack, weapon: playerWeapon, coords: newCoords},null]
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
          enemies: gameUpdate[1] || state.enemies
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
          enemies: gameUpdate[1] || state.enemies
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
          enemies: gameUpdate[1] || state.enemies
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
          enemies: gameUpdate[1] || state.enemies
        }
      } else{
        return newGame();
      }
    }
    default:
      return state;
  }
}
