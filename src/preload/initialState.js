import { items, enemies, weapons } from './gameObjects'

//Function Constuctors..
function WeaponsConstructor(name, coords, damage){
  this.name = name;
  this.coords = coords;
  this.damage = damage;
}

function ItemsConstructor(name, coords, health){
  this.name = name;
  this.coords = coords;
  this.health = health;
};

function EnemyConstructor(health, level, exp, strength, coords){
  this.coords = coords;
  this.health = health;
  this.level = level;
  this.exp = exp;
  this.strength = strength;
}

function Game(){
  this.grid = null;
  this.player = {
    coords : null,
    health : 100 ,
    weapon : "Stick",
    exp: 100,
    level: 1,
    attack: 10
  }
  this.enemies = [];
  this.weapons = [];
  this.items = [];
  this.dungeon = 1;
}

Game.prototype.mapGenerator = function(width, height) {
  var result = [];
  for (var i = 0 ; i < width; i++) {
    result[i] = [];
    for (var j = 0; j < height; j++) {
      if (i === 0 || i === (width - 1) || j === 0 || j === (height - 1)){
        result[i][j] = 0;
      }
      else {
        result[i][j] = 1;
      }
    }
  }
  this.grid = result;
};

Game.prototype.placeThing = function(type, thing){
  let { grid } = this;
  let availableCoords = this.grid
    .map( (row, rowIndex, rowArr) => {
      return row.map( (celVal, colIndex, cellArr) => [rowIndex, colIndex])
    })
    .reduce((a,b) => a.concat(b), [])
    .filter( (el) => grid[el[0]][el[1]] === 1)

  let randCoords = availableCoords[Math.floor(Math.random() * availableCoords.length)];

  switch (type) {
    case "enemy": {
      let {health, level, exp, strength} = thing
      // set grid value
      grid[randCoords[0]][randCoords[1]] = 2;
      // create new thing
      let newEnemy = new EnemyConstructor(health, level, exp, strength, randCoords);
      // set new thing coords
      return newEnemy
    }
    case "item": {
      grid[randCoords[0]][randCoords[1]] = 3;
      let newItem = new ItemsConstructor(thing.name, randCoords, thing.health);
      return newItem
    }
    case "weapon": {
      grid[randCoords[0]][randCoords[1]] = 4
      let newWeapon = new WeaponsConstructor(thing.name, randCoords, thing.damage)
      return newWeapon
    }
    case "goal": {
      grid[randCoords[0]][randCoords[1]] = 5
      return randCoords
    }
    case "player": {
      return randCoords
    }
    default:
    return
  }
}

function initializeGame(){
  let newGame = new Game();
  newGame.mapGenerator(20,20);

  newGame.weapons = weapons[newGame.dungeon - 1]
    .map( weapon => newGame.placeThing("weapon", weapon))

  newGame.items = items[newGame.dungeon -1]
    .map( item => newGame.placeThing("item", item))

  newGame.enemies = enemies[newGame.dungeon - 1]
    .map( enemy => newGame.placeThing("enemy", enemy))

  newGame.player.coords = newGame.placeThing("player")

  newGame.goal = newGame.placeThing("goal")
  return newGame;
}

////Initialize the state
let initialState = initializeGame();

export {initialState, Game };
