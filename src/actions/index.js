
// thunk action creator - adds keydown eventlistener
const listenToWindowEvent = () => {
  return (dispatch, getState) => {

    let handleEvent = (event) => {
      switch (event.keyCode){
        case 37: //left
          dispatch({ type: 'PRESS_LEFT' });
          break;
        case 38: //up
          dispatch({ type: 'PRESS_UP' });
          break;
        case 39: //right
          dispatch({ type: 'PRESS_RIGHT' });
          break;
        case 40: //down
          dispatch({ type: 'PRESS_DOWN' });
          break;
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
