const Server = require('../lib/ServerSocket.js');

const definitions = {
    server: {
      port: process.env.PORT || '4100',
      host: process.env.HOST || 'localhost'
    },
    socket: {
        timeout: 1030000,
        keepAliveEnabled: false,
        keepAliveDelay: 30
    },
};

const handlers = {
    onData: (socket) => data => socket.write(data.toString().toUpperCase()),
    onError: socket => err => socket.write('Error'),
    onTimeout: socket => () => socket.write('Timeout'),
    onClose: socket => () => socket.write('Close'),
    onEnd: socket => () => socket.write('End'),
    onConnect: socket => () => socket.write('Connected'),
};

//Start listening
Server.start({definitions, handlers});