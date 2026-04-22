import { Function } from './Function.js';
import { Element } from '../elements/Element.js';

export class Even extends Function {
    /**
     * Проверяет, является ли целое число четным.
     */
    compute(parameter) {
        return parameter.getInt() % 2 === 0 ? Element.ptrue : Element.pfalse;
    }
}