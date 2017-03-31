const Net = require('net')

const EDL = require('easy-dependency-loader')
const configs = EDL.load('configs')

const setSocketDefinitions = (socket, configs) => {
    socket.setTimeout(configs.socket.timeout);
    socket.setKeepAlive(configs.socket.keepAliveEnabled, configs.socket.keepAliveDelay)
    return socket
}

const setEventHandlers = (socket, socketEventHandlers) => {
    //socket events handling
    socketEventHandlers.onConnection(socket)
    socket.on('data', data => socketEventHandlers.onData(data, socket))
    socket.on('error', err => socketEventHandlers.onError(err, socket))
    socket.on('timeout', () => socketEventHandlers.onTimeout(socket))
    socket.on('close', () => socketEventHandlers.onClose(socket))
    socket.on('end', () => socketEventHandlers.onEnd(socket))
    return socket
}

const handleSocket = (socket, configs, socketEventHandlers) => {
    socket = setSocketDefinitions(socket, configs)
    socket = setEventHandlers(socket, socketEventHandlers)
    return socket
}

module.exports = {
    start: (configs, socketEventHandlers) => {
        let port = configs.server.port
        let host = configs.server.host
        return Net
            .createServer((socket) => handleSocket(socket, configs, socketEventHandlers))
            .listen(port, host, () => console.log('Server listening: %s%s', host, port))
    }
}
