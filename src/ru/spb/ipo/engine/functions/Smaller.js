import { Function } from './Function.js';
import { Element } from '../elements/Element.js';

export class Smaller extends Function {
    compute(parameter) {
        // Сравнение через compareTo
        if (this.fns[0].compute(parameter).compareTo(this.fns[1].compute(parameter)) < 0) {
            return Element.ptrue;
        }
        return Element.pfalse;
    }
}