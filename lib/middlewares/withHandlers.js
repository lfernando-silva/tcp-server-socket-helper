const bindHandlers = (socket, {onConnect, onData, onError, onTimeout, onClose, onEnd}) => {
    socket.on('connect', onConnect(socket));
    socket.on('data', onData(socket));
    socket.on('error', onError(socket));
    socket.on('timeout', onTimeout(socket));
    socket.on('close', onClose(socket));
    socket.on('end', onEnd(socket));
    return socket;
};

module.exports = handlers => socket => bindHandlers(socket, handlers);