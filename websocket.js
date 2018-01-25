const WebSocket = require('ws');

function setupWebsockets(server) {
    const wss = new WebSocket.Server({server});

    // wss.on('connection', function connection(ws, req) {
    //     console.log('ws connection');
    //     setInterval(() => ws.send('something'), 5000);
    // });
    // setInterval(() => wss.clients.forEach(ws => ws.send('something')), 5000);
}

function sendToClients(data) {
    wss.clients.forEach(ws => ws.send(data));
}

module.exports = {
    setupWebsockets,
    sendToClients
};