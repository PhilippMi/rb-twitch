module.exports = {
    start: ({el}) => {
        return fetch("https://rb-twitch.herokuapp.com/twitch/stream").then(response => {
            const responseData = response.json;
            const wrapper = document.createElement('div');

            if (responseData.live) {
                wrapper.setAttribute('class', 'test');
                const div = document.createElement('div');
                div.innerHTML = responseData;
                const link = document.createElement('a');
                link.setAttribute.href = 'https://twitch.tv/redbullesports';
                link.innerHTML = "link";
                wrapper.appendChild(div);

            }

            el.appendChild(wrapper);

            return {stop: () => el.removeChild(wrapper)};
        })

    }
};