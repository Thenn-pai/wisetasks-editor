import { Element } from './Element.js';

/**
 * Элемент-контейнер, представляющий собой массив (кортеж) других элементов.
 * Аналог ru.spb.ipo.engine.elements.ContainerElement
 */
export class ContainerElement extends Element {

    /**
     * @param {Element[]} children - Массив дочерних элементов
     */
    constructor(children = []) {
        super();
        this.array = children;
    }

    /**
     * Возвращает все элементы контейнера
     * @returns {Element[]}
     */
    getElements() {
        return this.array;
    }

    /**
     * Возвращает элемент по индексу. 
     * В движке WiseTasks используется 1-based indexing.
     * @param {number} index 
     */
    getElementAt(index) {
        if (!this.array || index < 1) return null;
        // Используем остаток от деления, как в оригинале (циклическая логика)
        return this.array[(index - 1) % this.array.length];
    }

    /**
     * Устанавливает элемент по индексу.
     * @param {number} index 
     * @param {Element} element 
     */
    setElementAt(index, element) {
        if (this.array && this.array.length > 0) {
            this.array[index % this.array.length] = element;
        }
    }

    /**
     * Для контейнера этот метод не поддерживается, так как это не простое число.
     */
    getInt() {
        throw new Error("ContainerElement не является простым элементом (getInt не поддерживается)");
    }

    setInt(i) {
        // Ничего не делаем, как в оригинале
    }

    getLength() {
        return this.array ? this.array.length : 0;
    }

    toString() {
        if (!this.array || this.array.length === 0) return "{ }";
        
        return "{ " + this.array.map(el => el.toString()).join(", ") + " }";
    }

    clone() {
        // Глубокое клонирование всех элементов массива
        const clonedArray = this.array.map(el => 
            (el && typeof el.clone === 'function') ? el.clone() : el
        );
        return new ContainerElement(clonedArray);
    }

    /**
     * Сравнение контейнеров
     */
    compareTo(o) {
        if (!(o instanceof Element)) return 1;
        
        const otherLength = o.getLength();
        if (this.getLength() !== otherLength) {
            return this.getLength() - otherLength;
        }

        // Поэлементное сравнение
        for (let i = 1; i <= this.getLength(); i++) {
            const e1 = this.getElementAt(i);
            const e2 = o.getElementAt(i);
            
            if (e1.compareTo) {
                const res = e1.compareTo(e2);
                if (res !== 0) return res;
            } else {
                // Базовое сравнение, если compareTo не реализован
                if (e1.toString() !== e2.toString()) return -1;
            }
        }
        return 0;
    }

    equals(o) {
        return this.compareTo(o) === 0;
    }
}