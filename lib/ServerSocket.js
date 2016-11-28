const Net = require('net');

const DEFAULT_TIMEOUT = 10000; //ms
const DEFAULT_KEEPALIVE_ENABLED = true;
const DEFAULT_KEEPALIVE_INITIAL_DELAY = 20; //s

function DEFAULT_EVENT(param) {
    console.log('This event was not handled');
}

function setSocketDefinitions(self, socket) {
    //socket definitions
    socket.setTimeout(self.options.timeout || DEFAULT_TIMEOUT);
    socket.setKeepAlive(self.options.keepAlive.enable || DEFAULT_KEEPALIVE_ENABLED,
        self.options.keepAlive.initialDelay || DEFAULT_KEEPALIVE_INITIAL_DELAY);

    //socket events handling
    socket.on('data', self.events['data'] || DEFAULT_EVENT);
    socket.on('timeout', self.events['timeout'] || DEFAULT_EVENT);
    socket.on('close', self.events['close'] || DEFAULT_EVENT);
    socket.on('error', self.events['error'] || DEFAULT_EVENT);
    socket.on('end', self.events['end'] || DEFAULT_EVENT);
    return socket;
}

module.exports = class ServerSocket {
    constructor(host, port, events, options) {
        this.host = host;
        this.port = port;
        this.events = events;
        this.options = options;
    }

    start() {
        let self = this;
        return Net
            .createServer((socket) => {
                return setSocketDefinitions(self, socket);
            })
            .listen(self.port, self.host); //Server listening
    }
}

