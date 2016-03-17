import { EventEmitter, Observer, isFunction } from './utils/eventemitter';

const ViewsayManager = base => class extends base {
    constructor(id) {
        super();

        if (!id) {
            throw new TypeError("container id is missing.");
        }

        //store id as "private" property
        this._id = id;
    }
    appendIframe(iframe) {
        const container = document.getElementById(this._id + '-viewsay-container');
        container.appendChild(iframe);
    }
    createIframeContainer() {
        let iframeContainer = document.createElement('div');
        iframeContainer.setAttribute("id", this._id + '-viewsay-container');

        const clientContainer = document.getElementById(this._id);

        if (clientContainer) {
            clientContainer.appendChild(iframeContainer);
            this.styleIframeContainer(iframeContainer);
        } else {
            throw new TypeError("client DOM container not defined");
        }
    }
    styleIframeContainer(iframeContainer) {
        //TODO
        iframeContainer.setAttribute("style",'height : 500px');
    }
    generateViewsayPlayer(iframe) {
        this.createIframeContainer();
        this.appendIframe(iframe);
    }
};

const Iframe = base => class extends base {
    constructor(id, options) {
        super(id);
        this.validateOptions(options);
        this.sortOptions();
        this.buildIframeUrl();
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

        options.appDomain = options.appDomain || 'http://localhost:3010';

        //store options as "private" properties
        this._options = options;
    }
    sortOptions() {
        // TODO : sort styling options etc
        const options = this._options;
    }
    buildIframeUrl() {
        const options = this._options,
            iframeSrc = options.appDomain + "/partner/" +
                + encodeURIComponent(options.account)
                + "/videos/"
                + encodeURIComponent(options.player)
                + "/"
                + encodeURIComponent(options.videoId);

        let iframe = document.createElement('iframe');

        iframe.setAttribute("src", iframeSrc);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("height", "100%");
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("id", this._id + '-viewsay-player');

        this.generateViewsayPlayer(iframe);
    }
};

class Player extends Iframe(ViewsayManager(EventEmitter)) {
    constructor(id, options) {
        super(id, options);
    }
}

export {Player}