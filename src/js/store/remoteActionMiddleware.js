'use strict';

export default socket => store => next => action => {
  debugger;
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
}
