import md5 from 'md5';
import { addClass, removeClass } from '../utils/dom';

export const Manager = base => class extends base {
    constructor(id) {
        super();
        this.validateClientContainer(id);
        this.addMessageListener();
        this.createIframeContainer();
        this.createPseudoElementStyleSheet();
        this.styleIframeContainer();

        this.addListener('resizeIframeContainer', (responsiveCases) => {
            this.resizeIframeContainer(responsiveCases);
        });
    }
    validateClientContainer(id) {
        if (!id) {
            throw new TypeError("container id is missing.");
        }

        const clientContainer = document.getElementById(id);

        if (!clientContainer) {
            throw new TypeError("client container is undefined.");
        }

        //store id as "private" property
        this._id = id;
        //store a hashed version for clean namespacing of player instances
        this._hashedId = md5(id);
    }
    addMessageListener() {
        window.addEventListener("message", (event) => {
            this.emit('message', event);
        });
    }
    createIframeContainer() {
        const iframeContainer = document.createElement('div'),
            clientContainer = document.getElementById(this._id);

        iframeContainer.setAttribute("id", this._id + '-viewsay-container');
        clientContainer.appendChild(iframeContainer);

        this._iframeContainer = iframeContainer;
    }
    styleIframeContainer() {
        // if (responsiveCase) cases
        this._iframeContainer.setAttribute("class",'viewsay-client-container viewsay-client-container-default');
        this._iframeContainer.setAttribute('style', 'position : relative;');
    }
    resizeIframeContainer(responsiveCases) {
        const iframeContainer = this._iframeContainer,
            cssClassList = new Map([['default','viewsay-client-container-default'],
                ['lg', 'viewsay-client-container-lg'],
                ['md', 'viewsay-client-container-md'],
                ['xs', 'viewsay-client-container-xs']]);

        if (!cssClassList.has(responsiveCases)) return;

        for (const cssClass of cssClassList.values()) {
            removeClass(iframeContainer, cssClass);
        }
        addClass(iframeContainer, cssClassList.get(responsiveCases));
    }
    createPseudoElementStyleSheet(){
        let style = document.getElementById('viewsay-generated-styles');

        // if already created don't do anything
        if (style) return;

        // otherwise we create the style tag and so on
        style = document.createElement("style");
        style.setAttribute('id', 'viewsay-generated-styles');
        document.head.appendChild(style);

        const sheet = style.sheet;

        // insert here rules fro different responsive cases;
        sheet.insertRule('.viewsay-client-container-default::after { content: ""; display: block; padding-top: 56.25%; }',0);
    }
    destroy() {
        this.removeAllListeners();
    }
}