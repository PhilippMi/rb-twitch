const twitchListenerCS = require('../scripts/twitch-listener');

function getCustomScript(data) {
    console.log("CS", twitchListenerCS, data);
    return twitchListenerCS;
}

module.exports = {
    getCustomScript
};
