import { Function } from './Function.js';
import { Element } from '../elements/Element.js';

/**
 * Функция сравнения наборов элементов (без учета порядка).
 */
export class Like extends Function {
    constructor() {
        super();
        this.length = 0;
        this.array1 = null;
        this.array2 = null;
    }

    compute(parameter) {
        if (!this.fns[0] || !this.fns[1]) {
            console.error("fns [0] or [1] is null");
        }

        const el1 = this.fns[0].compute(parameter);
        const el2 = this.fns[1].compute(parameter);

        if (this.array1 === null) {
            this.length = el1.getLength();
            this.array1 = new Array(this.length);
            this.array2 = new Array(this.length);
        }

        for (let i = 1; i <= this.length; i++) {
            this.array1[i - 1] = el1.getElementAt(i);
            this.array2[i - 1] = el2.getElementAt(i);
        }

        // Важно: используем compareTo для корректной сортировки объектов Element
        const comparator = (a, b) => a.compareTo(b);
        this.array1.sort(comparator);
        this.array2.sort(comparator);

        for (let i = 0; i < this.array1.length; i++) {
            if (!this.array1[i].equals(this.array2[i])) {
                return Element.pfalse;
            }
        }
        return Element.ptrue;
    }
}