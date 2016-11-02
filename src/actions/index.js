
// thunk action creator - adds keydown eventlistener
const listenToWindowEvent = (name, mapEventToAction, filter = (e) => true) => {
  return (dispatch, getState) => {

    const handleEvent = (event) => {
      // if (filter(e)) {
      //   dispatch(globalKeyPress(e));
      // }
      const arrowKeyCode = [37, 38, 39, 40];
      switch (event.keyCode){
        case 37: //left
          dispatch(pressLeft());
          break;
        case 38: //up
          dispatch(pressUp());
          break;
        case 39: //right
          dispatch(pressRight());
          break;
        case 40: //down
          dispatch(pressDown());
          break;
        default:
          event.preventDefault;
      }
    }

    window.addEventListener('keydown', handleEvent);

    // note: returns a function to unsubscribe
    return () => window.removeEventListener(name, handleEvent);
  };
}


// ACTIONS

// turns DOM event into action,
// you can define many of those
function globalKeyPress(e) {
  return {
    type: 'GLOBAL_KEY_PRESS',
    payload: {
      keyCode: e.keyCode
    }
  };
}

const pressLeft = () => ({ type: 'PRESS_LEFT' })

const pressRight = () => ({ type: 'PRESS_RIGHT' })

const pressUp = () => ({ type: 'PRESS_UP' })

const pressDown = () => ({ type: 'PRESS_DOWN' })




// subscribe to event
// let unlistenKeyPress = store.dispatch(listenToWindowEvent('keypress', globalKeyPress));
// eventually unsubscribe
// unlistenKeyPress();

export {
  listenToWindowEvent
}
