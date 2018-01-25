const request = require('request-promise');


function registerTwitchWebhooks() {
    registerForTopic('/users/follows?to_id=141173718', '/twitch/subscribers')
        .then(() => {
            console.log('Registered for subscriptions');
        });
    registerForTopic('/streams?user_id=192567706', '/twitch/golive')
        .then(() => {
            console.log('Registered for go live');
        });
}

function registerForTopic(topic, callback) {
    return request({
        method: 'POST',
        uri: 'https://api.twitch.tv/helix/webhooks/hub' +
        '?hub.mode=subscribe' +
        '&hub.topic=https://api.twitch.tv/helix' + topic +
        '&hub.callback=https://rb-twitch.herokuapp.com' + callback +
        '&hub.lease_seconds=86400' +
        '&hub.secret=' + process.env.TWITCH_SECRET,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    });
}

module.exports = registerTwitchWebhooks