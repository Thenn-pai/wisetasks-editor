import { Function } from './Function.js';
import { IntElement } from '../elements/IntElement.js';

/**
 * Функция целочисленного деления.
 * Принимает ровно два аргумента.
 * Аналог ru.spb.ipo.engine.functions.Div
 */
export class Div extends Function {

    constructor() {
        super();
        this.fe = new IntElement(0);
    }

    /**
     * Инициализация функции. Проверяет наличие двух аргументов.
     * @param {Node} node 
     */
    async initFunction(node) {
        await super.initFunction(node);

        if (!this.fns || this.fns.length !== 2) {
            throw new Error("Недостаточно аргументов для операции деления (требуется 2)");
        }
    }

    /**
     * Вычисляет результат деления первого аргумента на второй.
     * @param {Element} parameter 
     * @returns {IntElement}
     */
    compute(parameter) {
        const val1 = this.fns[0].compute(parameter).getInt();
        const val2 = this.fns[1].compute(parameter).getInt();

        if (val2 === 0) {
            throw new Error("Деление на ноль в операции Div");
        }

        // Используем Math.trunc для имитации целочисленного деления Java (отбрасывание дробной части)
        this.fe.setInt(Math.trunc(val1 / val2));
        return this.fe;
    }
}