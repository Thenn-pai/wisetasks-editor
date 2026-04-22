import { Function } from './Function.js';
import { Element } from '../elements/Element.js';

export class Or extends Function {
    compute(parameter) {
        // Возвращает true, если хотя бы одна вложенная функция не равна false
        for (let i = 0; i < this.fns.length; i++) {
            if (!Element.pfalse.equals(this.fns[i].compute(parameter))) {
                return Element.ptrue;
            }
        }
        return Element.pfalse;
    }
}