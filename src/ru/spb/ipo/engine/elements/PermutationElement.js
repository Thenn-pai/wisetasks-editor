import { ContainerElement } from './ContainerElement.js';
import { IntElement } from './IntElement.js';

/**
 * Элемент, представляющий перестановку.
 * Аналог ru.spb.ipo.engine.elements.PermutationElement
 */
export class PermutationElement extends ContainerElement {

    /**
     * Создает перестановку на основе массива элементов, размерности или множества.
     * @param {Element[]|number|Set|ContainerElement} source 
     */
    constructor(source) {
        if (Array.isArray(source)) {
            super(source);
        } else if (typeof source === 'number') {
            // Создает тождественную перестановку заданного размера [1, 2, ..., n]
            const elements = new Array(source);
            super(elements);
            for (let i = 0; i < source; i++) {
                this.setElementAt(i, new IntElement(i + 1));
            }
        } else if (source && typeof source.iterator === 'function') {
            // Создает перестановку из множества (Set)
            const size = source.getSize();
            const elements = new Array(size);
            super(elements);
            const it = source.iterator();
            for (let i = 0; i < size && it.hasNext(); i++) {
                this.setElementAt(i, it.next().clone());
            }
        } else if (source instanceof ContainerElement) {
            super(source.getElements());
        }
    }

    /**
     * Применяет текущую перестановку к списку элементов.
     * @param {ContainerElement} a 
     * @returns {ContainerElement}
     */
    applyTo(a) {
        if (this.getLength() !== a.getLength()) {
            throw new Error(`Permutation length ${this.getLength()} does not match list length ${a.getLength()}`);
        }

        const b = new Array(a.getLength());
        for (let i = 0; i < a.getLength(); i++) {
            // Перестановки в движке используют 1-базовую индексацию элементов
            const index = this.getElementAt(i + 1).getInt() - 1; 
            b[i] = a.getElementAt(index);
        }

        // Если вход был PermutationElement, возвращаем его же тип
        return (a instanceof PermutationElement) 
            ? new PermutationElement(b) 
            : new ContainerElement(b);
    }
}