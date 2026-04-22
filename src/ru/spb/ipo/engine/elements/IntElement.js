import { Element } from './Element.js';

/**
 * Элемент, представляющий целое число.
 * Аналог ru.spb.ipo.engine.elements.IntElement
 */
export class IntElement extends Element {

    /**
     * @param {number} value 
     */
    constructor(value) {
        super();
        this.value = value;
        this.fnumber = null; // Ленивая инициализация FractionalNumber
    }

    /**
     * Устанавливает новое целочисленное значение.
     * @param {number} i 
     */
    setInt(i) {
        this.value = i;
        this.fnumber = null; // Сбрасываем кэш дробного представления
    }

    /**
     * Элемент является простым, поэтому выбрасывает исключение при попытке записи по индексу.
     */
    setElementAt(index, element) {
        throw new Error("Это простой элемент (IntElement), а не контейнер.");
    }

    /** @returns {number} */
    getInt() {
        return this.value;
    }

    /** @returns {null} */
    getElements() {
        return null;
    }

    /**
     * Элемент является простым, поэтому выбрасывает исключение при попытке чтения по индексу.
     */
    getElementAt(index) {
        throw new Error("Это простой элемент (IntElement), а не контейнер.");
    }

    toString() {
        return this.value.toString();
    }

    /**
     * Для целого числа длина всегда 1.
     * @returns {number}
     */
    getLength() {
        return 1;
    }

    /**
     * Сравнение целых чисел.
     * @param {any} o 
     * @returns {number}
     */
    compareTo(o) {
        if (!(o instanceof IntElement)) return 1;
        
        const otherVal = o.getInt();
        if (this.value < otherVal) return -1;
        if (this.value > otherVal) return 1;
        return 0;
    }

    /**
     * Возвращает дробное представление числа.
     * Требует наличия FractionalNumber в будущем.
     */
    async getFractionalNumber() {
        if (this.fnumber == null) {
            const { FractionalNumber } = await import('../utils/FractionalNumber.js');
            this.fnumber = new FractionalNumber(this.value);
        }
        return this.fnumber;
    }

    clone() {
        return new IntElement(this.value);
    }
}