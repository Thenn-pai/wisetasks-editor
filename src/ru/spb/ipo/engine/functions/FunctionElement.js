import { Function } from './Function.js';
import { ContainerElement } from '../elements/ContainerElement.js';

/**
 * Создает ContainerElement из результатов всех вложенных функций.
 * Аналог ru.spb.ipo.engine.functions.FunctionElement
 */
export class FunctionElement extends Function {

    compute(parameter) {
        if (!this.fns) return null;

        const elements = new Array(this.fns.length);
        for (let i = 0; i < this.fns.length; i++) {
            elements[i] = this.fns[i].compute(parameter);
        }
        
        return new ContainerElement(elements);
    }
}