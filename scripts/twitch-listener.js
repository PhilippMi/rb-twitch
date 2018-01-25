const TwitchListener = {
    start: (data) => {
        console.log("Yo", data);
        return {stop: () => {}}
    }
};

module.exports = TwitchListener;