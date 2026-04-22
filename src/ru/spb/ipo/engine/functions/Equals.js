import { Function } from './Function.js';
import { Element } from '../elements/Element.js';

export class Equals extends Function {
    compute(parameter) {
        if (!this.fns[0] || !this.fns[1]) {
            console.error("fns [0] or [1] is null");
        }

        // Сравниваем результаты вычисления двух функций
        if (this.fns[0].compute(parameter).equals(this.fns[1].compute(parameter))) {
            return Element.ptrue;
        } else {
            return Element.pfalse;
        }
    }
}