const ServerSocket = require('../lib/ServerSocket.js');

//Set event handlers 
let events = {
    'data': socket => (data) => { },
    'error': socket => (err) => { },
    'timeout': socket => () => { },
    'close': socket => () => { },
    'end': socket => () => { }
}

//Set options
let options = {
    timeout: 1030000,
    keepAlive: {
        enabled: false,
        initialDelay: 30
    }
}

//Create a new server
const Server = new ServerSocket('localhost', 4100, events, options);

//Start listening
Server.start();