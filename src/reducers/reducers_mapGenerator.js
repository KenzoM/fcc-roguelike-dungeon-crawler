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
initialState.enemies = placeEnemies(initialState.grid, 4);

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
        occupied.indexOf(randCoords) === -1){
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


export default function(state = initialState, action){
  // switch (action.type) {
  //   case CELL_CLICK:
  // console.log(JSON.stringify(state.occupiedCoordinates))
  return state;
}
