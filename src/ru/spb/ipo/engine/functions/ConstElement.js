import { Function } from './Function.js';
import { IntElement } from '../elements/IntElement.js';

/**
 * Элемент, представляющий константное значение или вычисляемую константу.
 * Аналог ru.spb.ipo.engine.functions.ConstElement
 */
export class ConstElement extends Function {

    constructor() {
        super();
        this.el = null;
    }

    /**
     * Инициализация функции.
     * @param {Node} node 
     */
    async initFunction(node) {
        await super.initFunction(node);
    }

    /**
     * Возвращает результат вычисления. 
     * В оригинале логика вычисления массива элементов закомментирована или не завершена,
     * поэтому возвращаем сохраненный элемент.
     * @param {Element} parameter 
     * @returns {Element}
     */
    compute(parameter) {
        if (this.el === null && this.fns) {
            const elements = new Array(this.fns.length);
            for (let i = 0; i < this.fns.length; i++) {
                elements[i] = this.fns[i].compute(parameter);
            }
            // В Java версии результат вычислений fns не сохраняется в el явно в compute
        }
        return this.el;
    }

    /**
     * Фабричный метод для создания ConstElement или прямого возврата IntElement.
     * @param {Node} node 
     * @returns {Promise<AbstractFunction>}
     */
    static async generateElement(node) {
        const enodes = node.getFunctionList();

        // Если есть вложенные функции, создаем ConstElement
        if (enodes && enodes.length !== 0) {
            const af = new ConstElement();
            await af.initFunction(node);
            return af;
        }

        // Если это просто текст, возвращаем IntElement (целое число)
        const txt = node.getText();
        const t = parseInt(txt, 10);
        return new IntElement(t);
    }
}