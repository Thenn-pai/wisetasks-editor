import { Function } from './Function.js';
import { Element } from '../elements/Element.js';

export class Odd extends Function {
    compute(parameter) {
        // Проверка числа на нечетность
        return parameter.getInt() % 2 === 1 ? Element.ptrue : Element.pfalse;
    }
}