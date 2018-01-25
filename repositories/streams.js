const request = require('request-promise');

function getStream(userId) {
    request({
        uri: `https://api.twitch.tv/helix/streams?id=${userId}`,
        headers: {
            'Client-ID': process.env.CLIENT_ID
        }
    }).then((response) => {
        return JSON.parse(response).data;
    });
}

module.exports = {
    getStream
};