const request = require('request-promise');

const streams = [];

function getStream(userId) {
    request({
        uri: `https://api.twitch.tv/helix/streams/metadata?id=${userId}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    }).then((response) => {
        let data = JSON.parse(response).data;
        console.log('stream', data);
        const s = data.map(user => ({title, userName: user['display_name']}));
        Array.prototype.push.apply(streams, s);
    });
}

function getStreams() {
    return streams;
}

module.exports = {
    getStreams,
    getStream
};