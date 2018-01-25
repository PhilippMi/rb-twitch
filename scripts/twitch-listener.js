module.exports = {
    start: ({el}) => {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'test');
        const div = document.createElement('div');
        div.innerHTML = "TEST";
        wrapper.appendChild(div);

        el.appendChild(wrapper);

        return Promise.resolve({stop: () => el.removeChild(wrapper)});
    }
};