
// thunk action creator - adds keydown eventlistener
const listenToWindowEvent = () => {

  function thereIsWall(currentGrid, nextcoords){
    let x = nextcoords[0];
    let y = nextcoords[1];
    return currentGrid[x][y] === 0
  }

  return (dispatch, getState) => {
    let handleEvent = (event) => {
      let coords = getState().mapGenerated.player.coords
      let grid = getState().mapGenerated.grid
      let newCoords

      switch (event.keyCode){
        case 37: { //left
          newCoords = [coords[0],coords[1]-1]
          if (!thereIsWall(grid, newCoords)) {
            dispatch({
              type: 'PRESS_LEFT',
              payload: { newCoords }
            })
          }
          break;
        }

        case 38: { //up
          newCoords = [coords[0] - 1,coords[1]]
          if (!thereIsWall(grid, newCoords)) {
            dispatch({
              type: 'PRESS_UP',
              payload: { newCoords }
            });
          }
          break;
        }

        case 39: { //right
          newCoords = [coords[0],coords[1] + 1]
          if (!thereIsWall(grid, newCoords)) {
            dispatch({
              type: 'PRESS_RIGHT',
              payload: { newCoords }
            });
          }
          break;
        }

        case 40: {//down
          newCoords = [coords[0] + 1,coords[1]]
          if (!thereIsWall(grid, newCoords)) {
            dispatch({
              type: 'PRESS_DOWN',
              payload: { newCoords }
            });
          }
          break;
        }

        default:
          event.preventDefault();
          break;
      }
    }
    window.addEventListener('keydown', handleEvent);

    return
  };
}

export function switchLight(){
  return {
    type: "TOGGLE_LIGHTS"
  }
}


// ACTIONS

//TODO: remove event listener
// eventually unsubscribe
// unlistenKeyPress();

// () => window.removeEventListener(name, handleEvent);

export {
  listenToWindowEvent
}
