const request = require('request-promise');


function registerTwitchWebhooks() {
    request({
        method: 'POST',
        uri: 'https://api.twitch.tv/helix/webhooks/hub' +
            '?hub.mode=subscribe' +
            '&hub.topic=https://api.twitch.tv/helix/users/follows?to_id=141173718' +
            '&hub.callback=https://rb-twitch.herokuapp.com/twitch/subscribers' +
            '&hub.lease_seconds=86400' +
            '&hub.secret=' + process.env.TWITCH_SECRET,
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    }).then((body, response) => {
        console.log('Registered for subscriptions', response.headers);
    });
}

module.exports = registerTwitchWebhooks