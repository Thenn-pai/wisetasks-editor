import { Element } from './Element.js';
import { Config } from './Config.js';

export class RootElement extends Element {
    constructor() {
        super();
        this.type = Config.TYPE_ROOTELEMENT;
    }
}