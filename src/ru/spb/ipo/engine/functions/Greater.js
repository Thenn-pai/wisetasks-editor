import { Function } from './Function.js';
import { Element } from '../elements/Element.js';

/**
 * Функция сравнения "больше".
 * Аналог ru.spb.ipo.engine.functions.Greater
 */
export class Greater extends Function {

    /**
     * Инициализация. Проверяет наличие двух аргументов.
     * @param {Node} node 
     */
    async initFunction(node) {
        await super.initFunction(node);
        if (!this.fns || this.fns.length !== 2) {
            // В оригинале закомментировано, но для надежности добавим проверку
            throw new Error("Greater: требуется ровно 2 аргумента");
        }
    }

    /**
     * Сравнивает результаты двух функций.
     * @param {Element} parameter 
     * @returns {Element} Element.ptrue или Element.pfalse
     */
    compute(parameter) {
        const res0 = this.fns[0].compute(parameter);
        const res1 = this.fns[1].compute(parameter);

        // Используем compareTo из базового класса Element
        return res0.compareTo(res1) > 0 ? Element.ptrue : Element.pfalse;
    }
}