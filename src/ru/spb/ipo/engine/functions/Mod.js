import { Function } from './Function.js';
import { Element } from '../elements/Element.js';
import { IntElement } from '../elements/IntElement.js';
import { TaskDeserializationException } from '../exception/TaskDeserializationException.js';

export class Mod extends Function {
    constructor() {
        super();
        this.fe = new IntElement(0);
    }

    async initFunction(node) {
        await super.initFunction(node);

        if (!this.fns || this.fns.length !== 2) {
            throw new TaskDeserializationException("Mod: Not enough arguments");
        }
    }

    compute(parameter) {
        const base = this.fns[1].compute(parameter).getInt();
        
        if (base === 0) {
            // В Java версии при делении на 0 возвращается Max Value
            this.fe.setInt(2147483647); 
        } else {
            const val = this.fns[0].compute(parameter).getInt();
            this.fe.setInt(val % base);
        }
        return this.fe;
    }
}