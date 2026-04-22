import { AbstractFunction } from './AbstractFunction.js';

/**
 * Функция, возвращающая текущий переданный параметр.
 * Используется для обращения к текущему элементу при итерации.
 * Аналог ru.spb.ipo.engine.functions.CurrentElement
 */
export class CurrentElement extends AbstractFunction {

    /**
     * Возвращает переданный элемент без изменений.
     * @param {Element} parameter 
     * @returns {Element}
     */
    compute(parameter) {
        return parameter;
    }
}