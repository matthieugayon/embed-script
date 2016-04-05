import { EventEmitter, Observer, isFunction } from '../utils/eventemitter';
import { Manager } from './Manager';
import { Iframe } from './Iframe';

class Player extends Iframe(Manager(EventEmitter)) {
    constructor(id, options) {
        super(id, options);
        this.addListener("message", (event) => {
            this.receiveMessage(event);
        });
    }
    receiveMessage(event) {
        const hashedId = this._hashedId,
            data = event.data || event.detail,
            iframeObj = this._iframe,
            validSource = (iframeObj && event.isTrusted && event.source === iframeObj.contentWindow);

        if (data[0] === '{' && validSource) {
            const dataObj = JSON.parse(data);

            // if the event comes from the right viewsay Iframe
            if (dataObj.id === hashedId) {
                switch (dataObj.message.action) {
                    case 'onReady':
                        break;
                    case 'resize':
                        this.resize(dataObj.message.value);
                        break;
                }
            }
        }
    }
    resize(value) {
        this.emit('resizeIframeContainer', value);
    }
}

export {Player}