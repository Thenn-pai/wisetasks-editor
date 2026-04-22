import { Function } from './Function.js';
import { IntElement } from '../elements/IntElement.js';

/**
 * Функция сложения. Суммирует результаты всех вложенных функций.
 * Аналог ru.spb.ipo.engine.functions.Add
 */
export class Add extends Function {

    constructor() {
        super();
        this.fe = null;
    }

    /**
     * Инициализирует функцию и подготавливает объект для хранения результата.
     * @param {Node} node 
     */
    async initFunction(node) {
        await super.initFunction(node);
        this.fe = new IntElement(0);
    }

    /**
     * Вычисляет сумму результатов всех вложенных функций.
     * @param {Element} parameter 
     * @returns {IntElement}
     */
    compute(parameter) {
        let temp = 0;
        // fns — массив функций, инициализированный в базовом классе Function
        for (let i = 0; i < this.fns.length; i++) {
            temp += this.fns[i].compute(parameter).getInt();
        }
        this.fe.setInt(temp);
        return this.fe;
    }
}