//ACTIONS

let initialState = {
  grid : mapGenerator(5,5), //generates map 5 x 5
  player : {
    coordinates : null,
    health : 100 ,
    weapon : "Stick",
    expLevel : 1
  },
  enemies : [],
  weapons : [],
  items : [],
  occupiedCoordinates : []
}

function placeEnemies(grid, numberofEnemies){
  //randomly gets a coordinates from grid property
  // grid = [[0,0,0,0],[0,1,1,0]...]

  let gridWidth = grid[0].length;
  let gridHeight = grid.length;
  let enemyCoords = [];

  // get random coords [0-gridWidth, 0-gridHeight]
  let getRandomCoords = () => {
    let randomRow =  Math.floor(Math.random() * gridHeight)
    let randomCol =  Math.floor(Math.random() * gridWidth)
    return [randomRow, randomCol]
  }

  while (enemyCoords.length < numberofEnemies){
    let randCoords = getRandomCoords();

    // check if this cell is 1 (floor)
    if (grid[randCoords[0]][randCoords[1]] === 1){

      enemyCoords.push([randomRow, randomCol])
    }
  }

  return enemyCoords;

  //checks if [x][y] is 1 AND it is not placed anything else
  //. If it is, assign that coordinate to that enemy
}

function mapGenerator(width, height){
    var result= [];
    for (var i = 0 ; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
            if (i === 0 || i === (width - 1) || j === 0 || j === (height - 1)){
              result[i][j] = 0
            }
            else {
              result[i][j] = 1
            }
        }
    }
    return result;
}


export default function(state = initialState, action){
  // switch (action.type) {
  //   case CELL_CLICK:
  // console.log(JSON.stringify(state.map))
  return state;
}
