const Net = require('net')

const EDL = require('easy-dependency-loader')
const configs = EDL.load('configs')

const setSocketDefinitions = (socket, configs) => {
    const {timeout, keepAliveEnabled, keepAliveDelay} = configs.socket;
    socket.setTimeout(timeout);
    socket.setKeepAlive(keepAliveEnabled, keepAliveDelay)
    return socket
}

const setEventHandlers = (socket, socketEventHandlers) => {
    //socket events handling
    socketEventHandlers.onConnection(socket)
    socket.on('data', socketEventHandlers.onData(socket))
    socket.on('error', socketEventHandlers.onError(socket))
    socket.on('timeout', socketEventHandlers.onTimeout(socket))
    socket.on('close', socketEventHandlers.onClose(socket))
    socket.on('end', socketEventHandlers.onEnd(socket))
    return socket
}

const handleSocket = (configs, socketEventHandlers) => socket => {
    socket = setSocketDefinitions(socket, configs)
    socket = setEventHandlers(socket, socketEventHandlers)
    return socket
}

module.exports = {
    start: (configs, socketEventHandlers) => {
        const {host, port} = configs.server
        return Net
            .createServer(handleSocket(configs, socketEventHandlers))
            .listen(port, host, () => console.log('Server listening: %s%s', host, port))
    }
}
