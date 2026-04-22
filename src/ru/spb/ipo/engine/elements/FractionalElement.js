import { IntElement } from './IntElement.js';
// FractionalNumber будет импортирован из папки utils позже
// import { FractionalNumber } from '../utils/FractionalNumber.js';

/**
 * Элемент, представляющий дробное (рациональное) число.
 * Аналог ru.spb.ipo.engine.elements.FractionalElement
 */
export class FractionalElement extends IntElement {

    /**
     * @param {Object} value - Экземпляр FractionalNumber
     */
    constructor(value) {
        // Вызываем конструктор предка с 0, так как основное значение в fnumber
        super(0);
        this.fnumber = value;
    }

    /**
     * Установка целочисленного значения (превращает дробь в целое)
     * @param {number} i 
     */
    setInt(i) {
        // Здесь мы предполагаем наличие конструктора в FractionalNumber, принимающего целое
        // this.fnumber = new FractionalNumber(i);
        this.fnumber = { value: i, toString: () => i.toString() }; // Временная заглушка
    }

    /**
     * В оригинале этот метод выбрасывает исключение, 
     * если дробь нельзя представить как простое целое.
     */
    getInt() {
        if (this.fnumber && typeof this.fnumber.isInteger === 'function' && this.fnumber.isInteger()) {
            return this.fnumber.toInt();
        }
        throw new Error(`Значение FractionalElement не может быть приведено к Integer: ${this.toString()}`);
    }

    /**
     * Возвращает объект дробного числа
     */
    getFractionalNumber() {
        return this.fnumber;
    }

    toString() {
        return this.fnumber ? this.fnumber.toString() : "0";
    }

    /**
     * Сравнение дробных элементов
     */
    compareTo(o) {
        if (!(o instanceof FractionalElement)) {
            return 1;
        }

        // Логика сравнения должна быть внутри FractionalNumber
        if (this.fnumber && this.fnumber.compareTo) {
            return this.fnumber.compareTo(o.getFractionalNumber());
        }

        // Резервный вариант через строки
        return this.toString().localeCompare(o.toString());
    }

    clone() {
        // Предполагаем, что у fnumber есть свой метод clone
        const fClone = (this.fnumber && this.fnumber.clone) 
            ? this.fnumber.clone() 
            : { ...this.fnumber };
        return new FractionalElement(fClone);
    }
}