module.exports = {
    start: ({el, config}) => {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'ceros-embed');
        const div = document.createElement('div');
        div.setAttribute('style', config.style);
        div.setAttribute('data-break-on', config.breakOn);
        div.setAttribute('data-lg-id', config.lgId);
        div.setAttribute('data-lg-src', config.lgSrc);
        div.setAttribute('data-lg-padding', config.lgPadding);
        div.setAttribute('data-sm-id', config.smId);
        div.setAttribute('data-sm-src', config.smSrc);
        div.setAttribute('data-sm-padding', config.smPadding);
        wrapper.appendChild(div);

        const iframe = document.createElement('iframe');
        iframe.setAttribute('class', 'ceros-experience');
        iframe.setAttribute('allowfullscreen', 'allowfullscreen');
        iframe.setAttribute('style', 'position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0;margin:0;padding:0;border:0 none');
        div.appendChild(iframe);

        const scrollProxyScript = document.createElement('script');
        scrollProxyScript.setAttribute('src', '//view.ceros.com/scroll-proxy.min.js');
        wrapper.appendChild(scrollProxyScript);

        const variantSwitcherScript = document.createElement('script');
        variantSwitcherScript.setAttribute('src', '//creative-services.ceros.com/customer-success/varying-embed-tag-generator/embedded-variant-switcher-v2.min.js');
        wrapper.appendChild(variantSwitcherScript);

        el.appendChild(wrapper);

        return Promise.resolve({stop: () => el.removeChild(wrapper)});
    }
};