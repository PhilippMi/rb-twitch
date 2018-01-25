const request = require('request-promise');

const streams = [];

function getStream() {
    return request({
        uri: `https://api.twitch.tv/helix/streams?user_login=redbull&type=live`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    }).then((response) => {
        let data = JSON.parse(response).data;
        return data;
    });
}

module.exports = {
    getStream
};