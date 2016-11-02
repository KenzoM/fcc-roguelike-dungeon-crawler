//ACTIONS

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
  this.level = 1 ;
  this.strength = 1;
}

let initialState = {
  grid : null,
  player : {
    coordinates : null,
    health : 100 ,
    weapon : "Stick",
    expLevel : 1
  },
  enemies : [],
  weapons : [],
  items : []
}

initialState.grid = mapGenerator(10,10);
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
  // initialState.occupiedCoordinates =  result;
  return result;
}

// function placeEnemies(grid, numberofEnemies){
//   // grid = [[0,0,0,0,0],[0,1,1,1,0]...]
//   let gridWidth = grid[0].length;
//   let gridHeight = grid.length;
//   let enemyCoords = [];
//
//   // get random coords [0-gridWidth, 0-gridHeight]
//   let getRandomCoords = () => {
//     let randomRow =  Math.floor(Math.random() * gridHeight)
//     let randomCol =  Math.floor(Math.random() * gridWidth)
//     return [randomRow, randomCol]
//   }
//
//   while (enemyCoords.length < numberofEnemies){
//     let randCoords = getRandomCoords();
//
//     // check if this cell is 1 (floor) AND not in occupiedCoordinates
//     if (grid[randCoords[0]][randCoords[1]] === 1){
//           enemyCoords.push(randCoords)
//     }
//
//     // add to grid
//     initialState.grid[randCoords[0]][randCoords[1]] = 0;
//   }
//
//   let enemies = []
//   for (let i = 0; i < enemyCoords.length; i++) {
//     let enemy = {
//       coords: enemyCoords[i],
//       level: 1,
//       strength: 1
//     }
//     enemies.push(enemy);
//   }
//
//   initialState.enemies = enemies;
//   return enemies;
// }

initialState.items = placeThings("item", 3);
initialState.weapons = placeThings("weapon", 2)
initialState.enemies = placeThings("enemy", 4)
// initialState.enemies = placeEnemies(initialState.grid, 4);

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
    if (grid[randCoords[0]][randCoords[1]] === 1){
      placementThings.push(randCoords);
      grid[randCoords[0]][randCoords[1]] = 0
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
    }
  })
  return things;
}

export default function(state = initialState, action){
  // switch (action.type) {
  //   case CELL_CLICK:
  // console.log(JSON.stringify(state.occupiedCoordinates))
  return state;
}
