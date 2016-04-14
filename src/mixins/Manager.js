import md5 from 'md5';
import { addClass, removeClass, getElementInnerWidth } from '../utils/dom';
import { getClosestClass } from '../utils/array';

export const Manager = base => class extends base {
    constructor(id) {
        super();
        this.validateClientContainer(id);

        // set new Map containing our class / keypoints pairs
        this._classList = new Map([['large', { className : 'viewsay-client-container-large', minimumWidth : 1024}],
            ['small', { className : 'viewsay-client-container-small', minimumWidth : 769}],
            ['portrait', { className : 'viewsay-client-container-portrait', minimumWidth : 0}]]);

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
        // get initial container width to rty to apply directly the right classname
        const IframeContainerWidth = getElementInnerWidth(this._iframeContainer.parentElement);
        let startupClassName = 'viewsay-client-container-large';

        if (IframeContainerWidth !== 0) {
            startupClassName = getClosestClass(this._classList, IframeContainerWidth).className;
        }

        this._iframeContainer.setAttribute("class",'viewsay-client-container ' + startupClassName);
        this._iframeContainer.setAttribute('style', 'position : relative;');
    }
    resizeIframeContainer(responsiveCases) {
        const iframeContainer = this._iframeContainer,
            cssClassList = this._classList;

        if (!cssClassList.has(responsiveCases)) return;

        for (const cssClass of cssClassList.values()) {
            removeClass(iframeContainer, cssClass.className);
        }
        addClass(iframeContainer, cssClassList.get(responsiveCases).className);
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
        sheet.insertRule('.viewsay-client-container-large::after { content: ""; display: block; padding-top: 56.5%; }',0);
        sheet.insertRule('.viewsay-client-container-small::after { content: ""; display: block; padding-top: 56.5%; }',0);
        sheet.insertRule('.viewsay-client-container-portrait::after { content: ""; display: block; padding-top: 56.5%; padding-bottom: 300px; }',0);
    }
    destroy() {
        this.removeAllListeners();
    }
}