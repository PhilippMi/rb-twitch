
function showSubscribeBanner(containerEl, userName) {
    const banner = document.createElement('div');
    banner.className = 'twitch-subscribe-banner';
    banner.innerHTML = '<p class="twitch-subscribe-banner_text">User ' + userName +
        ' just subscribed for our Twitch Channel. <a href="https://www.twitch.tv/redbull">Join too!</a></p>'
    containerEl.appendChild(banner);

    const confettiContainer = document.createElement('div');
    throwConfetti(confettiContainer);
    containerEl.appendChild(confettiContainer);
}

function throwConfetti(containerEl) {
    const colors = ['red', 'blue', 'lime', 'yellow', 'magenta', 'orange'];
    // containerEl.className = 'confetti-container';

    for(var i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[randInt(colors.length)];
        confetti.style.animation = `rotate-${randInt(3)} ${1 + Math.random()}s linear infinite`;

        const wrapper = document.createElement('div');
        wrapper.className = 'confetti-wrapper';
        wrapper.style.top = -(Math.random() * 100 + 10) + 'px';
        wrapper.style.left = (Math.random() * 100) + 'vw';
        wrapper.appendChild(confetti);
        wrapper.style.animation = `drop ${3 + 0.6 * Math.random()}s linear`;
        const timeout = i + (Math.pow(i,5)/Math.pow(10,8.2));
        setTimeout(() => containerEl.appendChild(wrapper), timeout);
    }
    setTimeout(() => containerEl.parentNode.removeChild(containerEl), 10000);

    function randInt(max) {
        return Math.floor(Math.random() * max);
    }
}


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

            const bannerContainer = document.createElement('div');
            showSubscribeBanner(bannerContainer, 'Wall-E');
            el.appendChild(bannerContainer);
            el.appendChild(wrapper);

            return {stop: () => el.removeChild(wrapper)};
        })

    }
};