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

// function placeEnemy(numberofEnemies){
//   //randomly gets a coordinates from map property
//   //checks if [x][y] is 1 AND it is not placed anything else
//   //. If it is, assign that coordinate to that enemy
//
// }

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


export default function(state = initialState, action){
  // switch (action.type) {
  //   case CELL_CLICK:
  // console.log(JSON.stringify(state.occupiedCoordinates))
  return state;

}
