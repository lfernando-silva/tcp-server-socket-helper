const Net = require('net');
const {withDefinitions, withHandlers} = require('./middlewares');

const handleSocket = ({definitions, handlers}) => socket => {
    const middlewares = [
        withDefinitions(definitions),
        withHandlers(handlers)
    ];
    return middlewares.map(m => m(socket))[middlewares.length - 1];
};

module.exports = {
    start: ({definitions, handlers}) => {
        const {host, port} = definitions.server;
        return Net
            .createServer(handleSocket({definitions: definitions.socket, handlers}))
            .listen(port, host, () => console.log('Server listening: %s:%s', host, port))
    }
};
