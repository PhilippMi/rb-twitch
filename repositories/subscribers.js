const request = require('request-promise');


const subscribers = [];

function addSubscribers(userId) {
    request({
        uri: `https://api.twitch.tv/helix/users?id=${userId}`,
        headers: {
            'Client-ID': process.env.CLIENT_ID
        }
    }).then((response) => {
        console.log('response', response);
        let data = JSON.parse(response).data;
        console.log('data', data);
        const displayNames = data.map(user => user['display_name']);
        console.log('displayNames', displayNames);
        Array.prototype.push(subscribers, displayNames);
    });
}

function getSubscribers() {
    return subscribers;
}

module.exports = {
    getSubscribers,
    addSubscribers
};