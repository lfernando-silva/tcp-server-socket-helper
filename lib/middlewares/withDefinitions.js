const bindDefinitions = (socket, {timeout, keepAliveEnabled, keepAliveDelay}) => {
    socket.setTimeout(timeout);
    socket.setKeepAlive(keepAliveEnabled, keepAliveDelay)
    return socket
};

module.exports = definitions => socket => {
    bindDefinitions(socket, definitions);
}