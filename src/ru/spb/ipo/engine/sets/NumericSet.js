import { Set } from './Set.js';
import { IntElement } from '../elements/IntElement.js';

/**
 * Множество целых чисел в заданном диапазоне [first, last].
 * Аналог ru.spb.ipo.engine.sets.NumericSet
 */
export class NumericSet extends Set {

    /**
     * @param {number} first - Начало диапазона
     * @param {number} last - Конец диапазона
     */
    constructor(first = 0, last = 0) {
        super();
        this.first = first;
        this.last = last;
        this._size = (last >= first) ? (last - first + 1) : 0;
    }

    /**
     * Инициализация из XML узла.
     * Ожидает атрибуты "first" и "last".
     * @param {Node} node 
     */
    async initSet(node) {
        // В оригинале используется Utils.parseInt или прямое приведение
        this.first = parseInt(node.getAttrIfExists("first", "0"));
        this.last = parseInt(node.getAttrIfExists("last", "0"));
        this._size = (this.last >= this.first) ? (this.last - this.first + 1) : 0;
    }

    /**
     * Возвращает элемент по индексу (1-based)
     */
    getElement(index) {
        if (index < 1 || index > this._size) return null;
        return new IntElement(this.first + (index - 1));
    }

    size() {
        return this._size;
    }

    getLength() {
        return 1; // Числовое множество оперирует одиночными элементами
    }

    /**
     * Стандартный итератор JS
     */
    *getIterator() {
        for (let i = this.first; i <= this.last; i++) {
            yield new IntElement(i);
        }
    }

    /**
     * Эмуляция Java-итератора WiseTasks
     */
    getJavaLikeIterator() {
        let current = this.first;
        let beforeFirst = true;
        const last = this.last;

        return {
            hasNext: () => {
                if (beforeFirst && current <= last) return true;
                return current < last;
            },
            next: () => {
                if (!this.hasNext()) return null;
                if (beforeFirst) {
                    beforeFirst = false;
                } else {
                    current++;
                }
                return new IntElement(current);
            },
            reset: () => {
                current = this.first;
                beforeFirst = true;
            }
        };
    }
}