import { Element } from './Element.js';
import { Config } from './Config.js';

export class SetElement extends Element {
    constructor() {
        super();
        this.type = Config.TYPE_SET;
    }
}