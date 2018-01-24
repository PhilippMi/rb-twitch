const request = require('request-promise');


const subscribers = [];

function addSubscribers(userId) {
    console.log('client id', process.env.CLIENT_ID);
    request({
        uri: `https://api.twitch.tv/kraken/users/${userId}`,
        headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            'Client-ID': process.env.CLIENT_ID
        }
    }).then((response) => {
        let displayName = JSON.parse(response)['display_name'];
        subscribers.push(displayName);
        console.log(displayName);
    });
}

function getSubscribers() {
    return subscribers;
}

module.exports = {
    getSubscribers,
    addSubscribers
};