import { Function } from './Function.js';
import { FractionalElement } from '../elements/FractionalElement.js';
import { FractionalNumber } from '../utils/FractionalNumber.js';

export class Parser extends Function {
    constructor() {
        super();
        this.fe = null;
    }

    initFunction(node) {
        const m = this.getAttributes(node);
        const mod = m["mod"];
        
        if ("exp" in m) {
            let exp = m["exp"];
            // Если задан mod, выполняем операцию остатка
            if (mod) {
                const modVal = mod.getBigInteger();
                const expVal = exp.getBigInteger();
                exp = new FractionalNumber(expVal % modVal);
            }
            this.fe = new FractionalElement(exp);
        } else {
            this.fe = new FractionalElement(new FractionalNumber(0));
        }
    }

    compute(e) {
        return this.fe;
    }
}