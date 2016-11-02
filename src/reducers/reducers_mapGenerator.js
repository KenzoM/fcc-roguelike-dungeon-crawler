//ACTIONS

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
  items : [],
  occupiedCoordinates : new Array(10).fill(new Array(10).fill(1))
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
  initialState.occupiedCoordinates =  result;
  return result;
}

initialState.weapons = placeWeapons(3);
initialState.enemies = placeEnemies(initialState.grid, 4);
initialState.items = placeItems(2);

function placeEnemies(grid, numberofEnemies){
  // grid = [[0,0,0,0,0],[0,1,1,1,0]...]
  let gridWidth = grid[0].length;
  let gridHeight = grid.length;
  let enemyCoords = [];
  let occupied = initialState.occupiedCoordinates;

  // get random coords [0-gridWidth, 0-gridHeight]
  let getRandomCoords = () => {
    let randomRow =  Math.floor(Math.random() * gridHeight)
    let randomCol =  Math.floor(Math.random() * gridWidth)
    return [randomRow, randomCol]
  }

  while (enemyCoords.length < numberofEnemies){
    let randCoords = getRandomCoords();

    // check if this cell is 1 (floor) AND not in occupiedCoordinates
    if (grid[randCoords[0]][randCoords[1]] === 1 &&
        occupied[randCoords[0]][randCoords[1]] === 1){
          enemyCoords.push(randCoords)
    }

    // add to occupiedCoordinates
    initialState.occupiedCoordinates[randCoords[0]][randCoords[1]] = 0;
  }

  let enemies = []
  for (let i = 0; i < enemyCoords.length; i++) {
    let enemy = {
      coords: enemyCoords[i],
      level: 1,
      strength: 1
    }
    enemies.push(enemy);
  }

  initialState.enemies = enemies;
  return enemies;
}

function placeWeapons(numberofWeapons){
  let weapons = [];
  let availableSpots = [];
  let placementWeapons = []; //list of coordinates that will place weapons
  let occupied = initialState.occupiedCoordinates;

  //collect whats available of coords that are not taken in initialState.occupiedCoordinates
  occupied.forEach( (row, rowIndex) => (
    row.forEach( (cell, colIndex) => {
      if (cell === 1){
        availableSpots.push([rowIndex,colIndex])
      }
    })
  ))

  //lets place the weapons. When placed, it will update initialState.occupiedCoordinates
  while( placementWeapons.length < numberofWeapons ){
    let randCoords = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    if (occupied[randCoords[0]][randCoords[1]] === 1){
      placementWeapons.push(randCoords);
      occupied[randCoords[0]][randCoords[1]] = 0
    }
  }
  placementWeapons.forEach( coord => {
    let weapon = {
      name : "Weapon Name",
      coords : coord,
      damage : 3
    }
    weapons.push(weapon)
  })
  return weapons;
}

function placeItems(numberofItems){
  let items = [];
  let availableSpots = [];
  let placementItems = []; //list of coordinates that will place items
  let occupied = initialState.occupiedCoordinates;

  //collect whats available of coords that are not taken in initialState.occupiedCoordinates
  occupied.forEach( (row, rowIndex) => (
    row.forEach( (cell, colIndex) => {
      if (cell === 1){
        availableSpots.push([rowIndex,colIndex])
      }
    })
  ))

  //lets place the items. When placed, it will update initialState.occupiedCoordinates
  while( placementItems.length < numberofItems ){
    let randCoords = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    if (occupied[randCoords[0]][randCoords[1]] === 1){
      placementItems.push(randCoords);
      occupied[randCoords[0]][randCoords[1]] = 0
    }
  }
  placementItems.forEach( coord => {
    let item = {
      name : "Item Name",
      coords : coord,
      health : 3
    }
    items.push(item)
  })
  return items;
}


export default function(state = initialState, action){
  // switch (action.type) {
  //   case CELL_CLICK:
  // console.log(JSON.stringify(state.occupiedCoordinates))
  return state;
}
