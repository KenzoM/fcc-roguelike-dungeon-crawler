//Function Constuctors..
function WeaponsConstructor(){
  this.name = "Weapon Name";
  this.coords = null;
  this.damage = 3;
}

function ItemsConstructor(){
  this.name = "Item Name";
  this.coords = null;
  this.health = 5;
};

function EnemyConstructor(){
  this.coords = null;
  this.health = 100;
  this.level = 1;
  this.strength = 20;
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
  items : []
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
initialState.weapons = placeThings("weapon", 2)
initialState.enemies = placeThings("enemy", 4)

initialState.player = {...initialState.player, coords: placeThings("player", 1)}

function placeThings(thing, numberofThings){
  let things = []; //placeholder for returning an array of objects of "thing"
  let availableCoords = []; //collects all current possible coords from initialState.grid
  let placementThings = []; //array of coords that will iterate and assign to each things via switch case
  let grid = initialState.grid;

  grid.forEach( (row, rowIndex) => (
    row.forEach( (cell, colIndex) => {
      if (cell === 1){
        availableCoords.push([rowIndex,colIndex])
      }
    })
  ))

  while(placementThings.length < numberofThings ){
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
      placementThings.push(randCoords);
      grid[randCoords[0]][randCoords[1]] = codeValue;
    }
  }

  placementThings.forEach(coord => {
    switch (thing){
      case "enemy":
        let newEnemy = new EnemyConstructor();
        newEnemy.coords = coord
        things.push(newEnemy)
        break;
      case "weapon":
        let newWeapon = new WeaponsConstructor();
        newWeapon.coords = coord
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
