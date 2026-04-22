import { Function } from './Function.js';
import { Element } from '../elements/Element.js';

/**
 * Логическая функция "И".
 * Возвращает ptrue, если все вложенные функции вернули ptrue.
 * Аналог ru.spb.ipo.engine.functions.And
 */
export class And extends Function {

    /**
     * Вычисляет логическое И.
     * @param {Element} parameter 
     * @returns {Element} Element.ptrue или Element.pfalse
     */
    compute(parameter) {
        // fns — массив функций из базового класса Function
        for (let i = 0; i < this.fns.length; i++) {
            // Если хотя бы одна функция вернула false, возвращаем false
            if (Element.pfalse.equals(this.fns[i].compute(parameter))) {
                return Element.pfalse;
            }
        }
        // Если все проверки пройдены, возвращаем true
        return Element.ptrue;
    }
}