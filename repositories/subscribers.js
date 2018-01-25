const request = require('request-promise');


const subscribers = [];

function addSubscribers(userId) {
    request({
        uri: `https://api.twitch.tv/helix/users?id=${userId}`,
        headers: {
            'Client-ID': process.env.CLIENT_ID
        }
    }).then((response) => {
        let data = JSON.parse(response).data;
        const displayNames = data.map(user => user['display_name']);
        Array.prototype.push.apply(subscribers, displayNames);
    });
}

function getSubscribers() {
    return subscribers;
}

module.exports = {
    getSubscribers,
    addSubscribers
};