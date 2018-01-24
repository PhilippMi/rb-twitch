
const subscribers = [];

function addSubscribers(subscriber) {
    subscribers.push(subscriber);
}

function getSubscribers() {
    return subscribers;
}

module.exports = {
    getSubscribers,
    addSubscribers
};