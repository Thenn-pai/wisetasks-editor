import { Element } from './Element.js';

/**
 * Элемент-мост, который делегирует все вызовы оригинальному элементу.
 * Аналог ru.spb.ipo.engine.elements.BridgeElement
 */
export class BridgeElement extends Element {

    /**
     * @param {Element} original - Оригинальный элемент
     */
    constructor(original) {
        super();
        this.original = original;
    }

    getOriginal() {
        return this.original;
    }

    clone() {
        // Клонируем оригинал и оборачиваем его в новый мост
        return new BridgeElement(this.original.clone());
    }

    // Делегирование методов оригинальному элементу
    
    compute(element) {
        return this.original.compute(element);
    }

    getElementAt(index) {
        return this.original.getElementAt(index);
    }

    getElements() {
        return this.original.getElements();
    }

    getInt() {
        return this.original.getInt();
    }

    getLength() {
        return this.original.getLength();
    }

    setElementAt(index, element) {
        this.original.setElementAt(index, element);
    }

    setInt(i) {
        this.original.setInt(i);
    }

    toString() {
        return this.original.toString();
    }

    /**
     * Сравнение элементов
     */
    compareTo(o) {
        if (o instanceof BridgeElement) {
            return this.original.compareTo(o.original);
        }
        return this.original.compareTo(o);
    }

    /**
     * Проверка на равенство
     */
    equals(o) {
        if (o instanceof BridgeElement) {
            return this.original.equals(o.original);
        }
        return this.original.equals(o);
    }
}