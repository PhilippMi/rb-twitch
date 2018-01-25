module.exports = {
    start: ({el}) => {
        return fetch("https://rb-twitch.herokuapp.com/twitch/stream").then(response => {
            const wrapper = document.createElement('div');

            if (true) {
                wrapper.setAttribute('class', 'test');
                const div = document.createElement('div');
                console.log(response.text());
                response.text().then(data => div.innerHTML = data);
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