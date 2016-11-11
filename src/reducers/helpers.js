import { Game } from '../preload/initialState'
import { items, enemies, weapons, boss } from '../preload/gameObjects';

// function updateObject(oldObject, newValues) {
//     // Encapsulate the idea of passing a new object as the first parameter
//     // to Object.assign to ensure we correctly copy data instead of mutating
//     return Object.assign({}, oldObject, newValues);
// }
//
// function updateItemInArray(array, itemId, updateItemCallback) {
//     const updatedItems = array.map(item => {
//         if(item.id !== itemId) {
//             // Since we only want to update one item, preserve all others as they are now
//             return item;
//         }
//
//         // Use the provided callback to create an updated item
//         const updatedItem = updateItemCallback(item);
//         return updatedItem;
//     });
//
//     return updatedItems;
// }

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
  return([playerHealth, enemyHealth, enemyDamage])
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
  newInitialGame.mapGenerator(30,30);

  newInitialGame.weapons = weapons[dungeon - 1]
    .map( weapon => newInitialGame.placeThing("weapon", weapon))

  newInitialGame.items = items[dungeon - 1]
    .map( item => newInitialGame.placeThing("item", item))

  newInitialGame.enemies = enemies[dungeon - 1]
    .map( enemy => newInitialGame.placeThing("enemy", enemy))

  newInitialGame.player.coords = newInitialGame.placeThing("player");
  if (dungeon === 1){
    newInitialGame.message = "You have been killed! Sorry~~"
  } else{
    newInitialGame.message = `You are now in Dungeon Level ${dungeon}`;
  }

  if (dungeon < weapons.length) {
    newInitialGame.goal = newInitialGame.placeThing("goal");
  } else{
    newInitialGame.boss = newInitialGame.placeThing("boss", boss)
  }

  return newInitialGame;
}

function engageEnemy(state, newCoords) { //engaging with enemy
  let stateEnemies = state.enemies.map(enemy => Object.assign({}, enemy)); //MAKE SHALLOW COPY
  let actualPlayer = state.player;

  let actualEnemy = stateEnemies.filter( enemy => {
    return enemy.coords[0] === newCoords[0]
      && enemy.coords[1] === newCoords[1]
  }).reduce((a,b) => b)

  let resultBattle = attackEnemy(actualPlayer,actualEnemy)
  actualEnemy.health = resultBattle[1];
  let newMessage = `You lost ${resultBattle[2]} health points!  `

  if (resultBattle[1] <= 0 && resultBattle[0] > 0){  // case1: if player kills an Enemy
    let statePlayer;
    let newExp = state.player.exp - actualEnemy.exp;
    newMessage += `You killed an enemy!  You gained ${actualEnemy.exp} EXP.  `
    //check if players EXP reached to a new level
    if (didReachNewLevel(state.player.exp, actualEnemy.exp)){
      let newLevel = levelUpPlayer(state.player);
      statePlayer = {...state.player, health: resultBattle[0],
                        coords: newCoords, attack: newLevel[0],
                        exp: newLevel[1], level: newLevel[2] }
      newMessage += " You also leveled up!"
    } else{
      statePlayer = {...state.player, health: resultBattle[0],
                        coords: newCoords, exp: newExp }
    }
    return [statePlayer, stateEnemies, null, newMessage]

  } else if (resultBattle[0] <= 0) { // case2: if player dies
    return [null,null]
  }
  else{ //case no one dies -> update their damaged health
    newMessage += `You damaged enemy by ${resultBattle[1]} points!`
    console.log(newMessage)
    return [{...state.player, health: resultBattle[0]}, stateEnemies, null, newMessage]
  }
}

function pickUpItem(state, newCoords){ //item
  let playerHealth = state.player.health;
  let actualItem = state.items.filter( item => {
    return item.coords[0] === newCoords[0] && item.coords[1] === newCoords[1]
  })
  playerHealth += actualItem[0].health;
  let newMessage = `You gained extra ${actualItem[0].health} health points by eating a ${actualItem[0].name}`;
  return [{...state.player, health: playerHealth, coords: newCoords}, null, null, newMessage]
}

function pickUpWeapon(state, newCoords){ //weapon
  let playerWeapon = state.player.weapon;
  let actualWeapon = state.weapons.filter( weapon => {
    return weapon.coords[0] === newCoords[0] && weapon.coords[1] === newCoords[1]
  })
  playerWeapon = actualWeapon[0].name;
  let newAttack = getPlayerAttack(state.player.level, actualWeapon[0].damage);
  let newMessage = `You picked up a ${actualWeapon[0].name}!  You have ${newAttack} attack points  `
  return [{...state.player, attack: newAttack, weapon: playerWeapon, coords: newCoords}, null, null, newMessage]
}

function engageBoss(state, newCoords){
  let actualPlayer = state.player;
  let actualBoss = {...state.boss};
  let resultBattle = attackEnemy(actualPlayer, actualBoss);
  actualBoss.health = resultBattle[1];
  if (resultBattle[1] <= 0 && resultBattle[0] > 0){  // case1: if player kills the boss
    console.log('you win!')
    return [null,null];
  } else if (resultBattle[0] <= 0) { // case2: if player dies against boss
    console.log('game over. Start over!')
    return [null,null]
  } else{ //case3:  no one dies -> update their damaged health
    console.log('fight boss still on')
    return [{...state.player, health: resultBattle[0]}, null, actualBoss]
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

function updateGameObject(state, newCoords){
  let thing = state.grid[newCoords[0]][newCoords[1]]
  switch (thing) {
    case 2:
      return engageEnemy(state, newCoords)
    case 3:
      return pickUpItem(state, newCoords)
    case 4:
      return pickUpWeapon(state, newCoords)
    case 6:
      return engageBoss(state, newCoords)
    default:
      let newMessage = " "
      return [{...state.player, coords: newCoords}, null, null, newMessage]
  }
}

export { getNewGrid, updateGameObject, validateWall, reachedGoal, newGame }
