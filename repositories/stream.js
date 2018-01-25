const request = require('request-promise');

function getStream(userId) {
    request({
        uri: `https://api.twitch.tv/helix/streams?id=${userId}`,
        headers: {
            'Client-ID': process.env.CLIENT_ID
        }
    }).then((response) => {
        console.log("repo response", JSON.parse(response));
        return JSON.parse(response).data;
    });
}

module.exports = {
    getStream
};