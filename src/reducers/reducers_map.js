//ACTIONS

let initialState = {
  map : mapGenerator(5,5), //generates map 5 x 5
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

function placeEnemy(numberofEnemies){
  //randomly gets a coordinates from map property
  //checks if [x][y] is 1 AND it is not placed anything else
  //. If it is, assign that coordinate to that enemy

}

function mapGenerator(width, height){
    var result= [];
    for (var i = 0 ; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
            result[i][j] = (Math.floor(Math.random() * 2) )
        }
    }
    return result;
}


export default function(state = initialState, action){
  // switch (action.type) {
  //   case CELL_CLICK:
  return state;
  
}
