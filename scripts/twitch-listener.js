const TwitchListener = {
    start: (data) => {
        console.log("Yo", data);
        return {stop: () => {}}
    }
};

export default TwitchListener;