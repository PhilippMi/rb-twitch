define([], function () {

    function showStreamLiveBanner(containerEl, channel) {
        const banner = document.createElement('div');
        banner.className = 'teaser-text teaser-text--image dark-theme';
        banner.innerHTML = '<div class="teaser-text__wrapper"><div class="teaser-text__content-container"><div class="teaser-text__expanded"><div class="teaser-text__summary">Red Bull eSports is live on Twitch! <a target="_blank" href="https://www.twitch.tv/redbull"> Check out whats going on! </a></div></div></div></img>';
        containerEl.appendChild(banner);
    }

    function showSubscribeBanner(containerEl, userName, subscriptionCount) {
        const banner = document.createElement('div');
        banner.className = 'twitch-subscribe-banner';
        banner.innerHTML = '<p class="twitch-subscribe-banner__text">' + userName +
            ' now follows our Twitch channel like ' + subscriptionCount +
            ' others already do. <a target="_blank" href="https://www.twitch.tv/redbull">Be one of them!</a></p>'
        containerEl.appendChild(banner);
        setTimeout(() => containerEl.removeChild(banner), 10000);

        const confettiContainer = document.createElement('div');
        throwConfetti(confettiContainer);
        containerEl.appendChild(confettiContainer);
    }

    function showGoliveBanner(containerEl, userName) {
        const banner = document.createElement('div');
        banner.className = 'twitch-subscribe-banner';
        banner.innerHTML = '<p class="twitch-subscribe-banner__text">' + userName +
            ' just started streaming on Twitch. <a target="_blank" href="https://www.twitch.tv/redbull">Go watch it!</a></p>'
        containerEl.appendChild(banner);
        setTimeout(() => containerEl.removeChild(banner), 5000);
    }

    function throwConfetti(containerEl) {
        const colors = ['red', 'blue', 'lime', 'yellow', 'magenta', 'orange'];
        // containerEl.className = 'confetti-container';

        for (var i = 0; i < 200; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[randInt(colors.length)];
            confetti.style.animation = `rotate-${randInt(3)} ${1 + Math.random()}s linear infinite`;

            const wrapper = document.createElement('div');
            wrapper.className = 'confetti-wrapper';
            wrapper.style.top = -(Math.random() * 100 + 10) + 'px';
            wrapper.style.left = (Math.random() * 100) + 'vw';
            wrapper.appendChild(confetti);
            wrapper.style.animation = `drop ${3 + 0.6 * Math.random()}s linear forwards`;
            const timeout = i + (Math.pow(i, 5) / Math.pow(10, 8.2));
            setTimeout(() => containerEl.appendChild(wrapper), timeout);
        }
        setTimeout(() => containerEl.parentNode.removeChild(containerEl), 10000);

        function randInt(max) {
            return Math.floor(Math.random() * max);
        }
    }


    return {
        start: ({el, config}) => {
            const styleLink = document.createElement('link');
            styleLink.rel = 'stylesheet';
            styleLink.href = 'https://rb-twitch.herokuapp.com/stylesheets/panel.css';
            document.head.appendChild(styleLink);
            return fetch("https://rb-twitch.herokuapp.com/twitch/stream").then(response => {
                const wrapper = document.createElement('div');

                el.appendChild(wrapper);

                response.json().then(data => {
                    if (data.length) {
                        const streamLiveBannerContainer = document.createElement('div');
                        showStreamLiveBanner(streamLiveBannerContainer, config.channel);
                        el.appendChild(streamLiveBannerContainer);
                    }
                });

                const bannerContainer = document.createElement('div');
                el.appendChild(bannerContainer);

                const subscribeSocket = new WebSocket('wss://rb-twitch.herokuapp.com');
                // const subscribeSocket = new WebSocket('ws://localhost:3000');

                subscribeSocket.onmessage = event => {
                    console.log('received ws event', event.data);
                    const data = JSON.parse(event.data);
                    switch (data.event) {
                        case 'subscription':
                            showSubscribeBanner(bannerContainer, data.userName, data.subscriptionCount);
                            break;
                        case 'golive':
                            showGoliveBanner(bannerContainer, data.userName);
                            break;
                    }
                };

                return {
                    stop() {
                        el.removeChild(wrapper);
                        subscribeSocket.close();
                    }
                };
            })

        }
    };
});