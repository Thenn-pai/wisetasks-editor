import { Function } from './Function.js';

export class Projection extends Function {
    constructor() {
        super();
        this.axis = 0;
    }

    async initFunction(node) {
        await super.initFunction(node);
        const m = this.getAttributes(node);
        if ("axis" in m) {
            // Преобразование значения атрибута axis в целое число
            this.axis = m["axis"].getBigInteger().valueOf();
        }
    }

    compute(parameter) {
        // Вычисляет вложенную функцию и берет результат по индексу axis
        return this.fns[0].compute(parameter).getElementAt(this.axis);
    }
}