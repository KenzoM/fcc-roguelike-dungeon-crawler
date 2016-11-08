import { items, enemies, weapons } from './gameObjects'

//Function Constuctors..
function WeaponsConstructor(name, coords, damage){
  this.name = name;
  this.coords = coords;
  this.damage = damage;
}

function ItemsConstructor(name, coords, health){
  this.name = name
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

let initialState = {
  grid : null,
  player : {
    coords : null,
    health : 100 ,
    weapon : "Stick",
    exp: 100,
    level: 1,
    attack: 10
  },
  enemies : [],
  weapons : [],
  items : [],
  dungeon: 1
}

initialState.grid = mapGenerator(20,20);

function mapGenerator(width, height){
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
  return result;
}

const placeThing = (type, thing) => {
  let { grid } = initialState

  let availableCoords = initialState.grid
    .map( (row, rowIndex, rowArr) => {
      return row.map( (cellVal, colIndex, cellArr) => [rowIndex,colIndex] )
    }) // return grid with [rowIndex, colIndex]
    .reduce((a,b) => a.concat(b), []) // flatten to 1D array
    .filter( (el) => grid[el[0]][el[1]] === 1) // filter to available cells

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
    case "player": {
      return randCoords
    }
    default:
    return
  }
}

initialState.weapons = weapons[initialState.dungeon - 1]
  .map( weapon => placeThing("weapon", weapon))

initialState.items = items[initialState.dungeon -1]
  .map( item => placeThing("item", item))

initialState.enemies = enemies[initialState.dungeon - 1]
  .map( enemy => placeThing("enemy", enemy))

initialState.player = {...initialState.player, coords: placeThing("player")}



export default initialState;
