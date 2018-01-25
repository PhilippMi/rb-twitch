const streamAPI = require('../repositories/streams');

module.exports = {
    start: ({el}) => {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'test');
        const div = document.createElement('div');
        div.innerHTML = "TEST";

        streamAPI.getStream(44426109).then(response => {
            console.log(response);
            div.innerHTML = response;
        });

        wrapper.appendChild(div);

        el.appendChild(wrapper);

        return Promise.resolve({stop: () => el.removeChild(wrapper)});
    }
};