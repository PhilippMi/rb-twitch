const request = require('request-promise');
const {sendToClients} = require('../websocket');

const subscribers = [];

function addSubscribers(userId) {
    const userInfoRequest = request({
        uri: `https://api.twitch.tv/helix/users?id=${userId}`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        },
        json: true
    });
    const subscriptionCountRequest = request({
        uri: `https://api.twitch.tv/helix/users/follows?to_id=141173718`,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        },
        json: true
    });

    Promise.all([userInfoRequest, subscriptionCountRequest])
        .then(([userInfoResponse, subscriptionInfoResponse]) => {
            let userData = userInfoResponse.data;
            const displayName = userData[0].display_name;
            subscribers.push(displayName);
            sendToClients({
                event: 'subscription',
                userName: displayName,
                subscriptionCount: subscriptionInfoResponse.total
            });
        });
}

function getSubscribers() {
    return subscribers;
}

module.exports = {
    getSubscribers,
    addSubscribers
};