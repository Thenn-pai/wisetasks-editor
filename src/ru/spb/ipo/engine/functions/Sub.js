import { Function } from './Function.js';
import { IntElement } from '../elements/IntElement.js';

export class Sub extends Function {
    constructor() {
        super();
        this.fe = new IntElement(0);
    }

    async initFunction(node) {
        await super.initFunction(node);
    }

    compute(parameter) {
        // Режим унарного минуса
        if (this.fns.length === 1) {
            this.fe.setInt(-this.fns[0].compute(parameter).getInt());
            return this.fe;
        }

        // Режим вычитания
        let temp = this.fns[0].compute(parameter).getInt();
        for (let i = 1; i < this.fns.length; i++) {
            temp -= this.fns[i].compute(parameter).getInt();
        }
        this.fe.setInt(temp);
        return this.fe;
    }
}