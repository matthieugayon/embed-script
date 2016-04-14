export const Iframe = base => class extends base {
    constructor(id, options) {
        super(id);
        this.validateOptions(options);
        this.sortOptions();
        const iframeSrc = this.buildIframeUrl(),
            iframe = this.buildIframe(iframeSrc);

        //store iframe DOM object reference
        this._iframe = iframe;

        this.styleIframe(iframe);
        this.appendIframe(iframe);
    }
    validateOptions(options) {
        // TODO : type validation

        if (!options.account) {
            throw new TypeError("account option is missing");
        }
        if (!options.player) {
            throw new TypeError("player option is missing");
        }
        if (!options.videoId) {
            throw new TypeError("videoId option is missing");
        }

        // hex color validation
        const colorRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (options.style && Object.keys(options.style).length) {
            for (const color in options.style) {
                if (!options.style[color].match(colorRegExp)) {
                    throw new TypeError(color + " must be precised in HEX css color format. Example : #fff or #ffffff");
                }
            }
        }

        //store options as "private" properties
        this._options = options;
    }
    sortOptions() {
        // TODO : sort styling options etc
        const options = this._options;

        // PRE PROCESS : default appDomain to localhost:3012
        options.commentpaneDomain = '/* @echo commentpaneDomain */';
    }
    buildIframeUrl() {
        const options = this._options,
            hashedId = this._hashedId;

        let iframeSrc = options.commentpaneDomain + "/#!partner/" + encodeURIComponent(options.account)
                + "/"
                + encodeURIComponent(hashedId)
                + "/videos/"
                + encodeURIComponent(options.player)
                + "/"
                + encodeURIComponent(options.videoId)
                + "/"
                + encodeURIComponent(window.btoa(window.location.href));

        if (options.style) {
            let query = "";
            for (const color in options.style) {
                query += '&' + color + '=' + encodeURIComponent(options.style[color]);
            }
            // remove first ampersand and add ? instead;
            query = '?' + query.slice(1);
            iframeSrc = iframeSrc + query;
        }

        return iframeSrc;
    }
    buildIframe(iframeSrc) {
        const iframe = document.createElement('iframe');

        iframe.setAttribute("src", iframeSrc);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("id", this._id + '-viewsay-player');

        return iframe;
    }
    styleIframe(iframe) {
        const iframeStyles = new Set([
                ['position', 'absolute'],
                ['top', '0'],
                ['left', '0'],
                ['bottom', '0'],
                ['right', '0'],
            ]);
        let style = "";
        for (const[key,value] of iframeStyles) {
            style += key + ' : ' + value + '; ';
        }

        iframe.setAttribute("style", style);
        iframe.setAttribute("height", '100%');
        iframe.setAttribute("width", '100%');

    }
    appendIframe(iframe) {
        const container = document.getElementById(this._id + '-viewsay-container');
        container.appendChild(iframe);
    }
}