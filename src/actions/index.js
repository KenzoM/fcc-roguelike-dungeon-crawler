
// thunk action creator - adds keydown eventlistener
const listenToWindowEvent = (name, mapEventToAction, filter = (e) => true) => {
  return (dispatch, getState) => {
    function handleEvent(e) {
      if (filter(e)) {
        dispatch(globalKeyPress(e));
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
    keyCode: e.keyCode
  };
}

// subscribe to event
// let unlistenKeyPress = store.dispatch(listenToWindowEvent('keypress', globalKeyPress));
// eventually unsubscribe
// unlistenKeyPress();

export {
  listenToWindowEvent
}
