'use strict';

// отправление действий по сокетам на сервер
export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    debugger;
    socket.emit('action', action);
  }
  return next(action);
}
