import { Function } from './Function.js';
import { Element } from '../elements/Element.js';

export class Not extends Function {
    compute(parameter) {
        // Если результат вложенной функции false, возвращаем true, иначе false
        if (Element.pfalse.equals(this.fns[0].compute(parameter))) {
            return Element.ptrue;
        }
        return Element.pfalse;
    }
}