const request = require('request-promise');
const {sendToClients} = require('../websocket');

const streams = [];

function addStream(userId, title) {
    request({
        uri: `https://api.twitch.tv/helix/users?id=${userId}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    }).then((response) => {
        let data = JSON.parse(response).data;
        const s = data.map(user => ({title, userName: user['display_name']}));
        console.log('new stream', s);
        Array.prototype.push.apply(streams, s);
        sendToClients({event: 'golive', userName: s[0].userName});
    });
}

function getStreams() {
    return streams;
}

module.exports = {
    getStreams,
    addStream
};