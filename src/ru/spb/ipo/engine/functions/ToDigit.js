import { Function } from './Function.js';
import { IntElement } from '../elements/IntElement.js';
import { ContainerElement } from '../elements/ContainerElement.js';

export class ToDigit extends Function {
    constructor() {
        super();
        this.fe = new IntElement(0);
    }

    async initFunction(node) {
        await super.initFunction(node);
    }

    compute(parameter) {
        const e = this.fns[0].compute(parameter);
        this.fe.setInt(ToDigit.computeAnswer(e));
        return this.fe;
    }

    /**
     * Статический метод для рекурсивного перевода набора элементов в число.
     */
    static computeAnswer(e) {
        if (!(e instanceof ContainerElement)) {
            return e.getInt();
        } else {
            const size = e.getLength();
            let res = 0;
            let power = 1;
            // Итерируемся с конца к началу для учета десятичных разрядов
            for (let i = size; i >= 1; i--) {
                res = power * e.getElementAt(i).getInt() + res;
                power *= 10;
            }
            return res;
        }
    }
}