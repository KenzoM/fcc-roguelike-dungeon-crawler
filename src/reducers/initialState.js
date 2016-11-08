//Function Constuctors..
// function WeaponsConstructor(){
//   this.name = "Weapon Name";
//   this.coords = null;
//   this.damage = 3;
// }

function createWeapon(name, coords, damage) {
  return {
    name: name,
    coords: coords,
    damage: damage
  }
}

function ItemsConstructor(){
  this.name = "Item Name";
  this.coords = null;
  this.health = 5;
};

function EnemyConstructor(){
  this.coords = null;
  this.health = 20;
  this.level = 1;
  this.strength = 1;
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


initialState.items = placeThings("item", 3);
initialState.enemies = placeThings("enemy", 4)


const weapons = [
	[ // dungeon 1 weapons
		{ name: "knife", damage: 2, coords: null},
		{ name: "sword", damage: 3, coords: null}
	],
	[ // dungeon 2 weapons
		{ name: "crossbow", damage: 4, coords: null },
		{ name: "pistol", damage: 5, coords: null }
	],
	[ // dungeon 3 weapons
		{name: "shotgun", damage: 6, coords: null}
	]
]


initialState.weapons = weapons[initialState.dungeon - 1]
  .map( weapon => placeThing("weapon", weapon) )



function placeThing(type, thing) {
  let { grid } = initialState

  let availableCoords = initialState.grid.map( (row, rowIndex, rowArr) => {
    return row.map( (cellVal, colIndex, cellArr) => {
      return [rowIndex,colIndex]
    } )
  })
  .reduce((a,b) => a.concat(b), [])
  .filter( (element, index, arr) => {
    return initialState.grid[element[0]][element[1]] === 1
  })

  let randCoords = availableCoords[Math.floor(Math.random() * availableCoords.length)];

  console.log(randCoords)

  switch (type) {
    case "enemy": {
      // set grid value
      grid[randCoords[0]][randCoords[1]] = 2;
      // create new thing
      let newEnemy = new EnemyConstructor();
      // set new thing coords
      newEnemy.coords = randCoords
      return newEnemy
    }
    case "item": {
      grid[randCoords[0]][randCoords[1]] = 3;
      let newItem = new ItemsConstructor();
      newItem.coords = randCoords
      return newItem
    }
    case "weapon": {
      grid[randCoords[0]][randCoords[1]] = 4
      let newWeapon = createWeapon(thing.name, randCoords, thing.damage)
      newWeapon.coords = randCoords
      return newWeapon
    }
    default:
    return
  }
}





initialState.player = {...initialState.player, coords: placeThings("player", 1)}





function placeThings(thing, numberofThings, weapon){
  let things = []; //placeholder for returning an array of objects of "thing"
  let availableCoords = []; //collects all current possible coords from initialState.grid
  let placedThings = []; //array of coords that will iterate and assign to each things via switch case
  let grid = initialState.grid;

  grid.forEach( (row, rowIndex) => (
    row.forEach( (cell, colIndex) => {
      if (cell === 1){
        availableCoords.push([rowIndex,colIndex])
      }
    })
  ))

  while(placedThings.length < numberofThings ){
    let randCoords = availableCoords[Math.floor(Math.random() * availableCoords.length)];
    let codeValue  // 2 means enemy, 3 means item and 4 means weapons;
    if (thing === "enemy"){
      codeValue = 2
    } else if (thing === "item"){
      codeValue = 3
    } else if (thing === "weapon"){
      codeValue = 4
    } else {
      codeValue = 0 ;
    }
    if (grid[randCoords[0]][randCoords[1]] === 1){
      placedThings.push(randCoords);
      grid[randCoords[0]][randCoords[1]] = codeValue;
    }
  }

  placedThings.forEach(coord => {
    switch (thing){
      case "enemy":
        let newEnemy = new EnemyConstructor();
        newEnemy.coords = coord
        things.push(newEnemy)
        break;
      case "weapon":
        // let newWeapon = new WeaponsConstructor();
        // newWeapon.coords = coord
        let newWeapon = createWeapon(weapon, coord, 2)
        things.push(newWeapon)
        break;
      case "item":
        let newItem = new ItemsConstructor();
        newItem.coords = coord
        things.push(newItem)
        break;
      case "player":
        things = coord
        break;
      default:
        break;
    }
  })
  return things;
}

export default initialState;
