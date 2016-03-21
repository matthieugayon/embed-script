export const Manager = base => class extends base {
    constructor(id) {
        super();
        this.validateClientContainer(id);
        this.createIframeContainer();
        this.createPseudoElementStyleSheet();
        this.styleIframeContainer();
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
    }
    createIframeContainer() {
        const iframeContainer = document.createElement('div'),
            clientContainer = document.getElementById(this._id);

        iframeContainer.setAttribute("id", this._id + '-viewsay-container');
        clientContainer.appendChild(iframeContainer);

        this._iframeContainer = iframeContainer;
    }
    styleIframeContainer(responsiveCase) {
        // if (responsiveCase) cases
        this._iframeContainer.setAttribute("class",'viewsay-client-container viewsay-client-container-default');
        this._iframeContainer.setAttribute('style', 'position : relative;');
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
        sheet.insertRule('.viewsay-client-container-default::after { content: ""; display: block; padding-top: 56.25%; }',0);
    }
}