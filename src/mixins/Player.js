import { EventEmitter, Observer, isFunction } from '../utils/eventemitter';
import { Manager } from './Manager';
import { Iframe } from './Iframe';

class Player extends Iframe(Manager(EventEmitter)) {
    constructor(id, options) {
        super(id, options);
    }
}

export {Player}