/**
 * Интерфейс, описывающий обязательные методы для элементов.
 * В JS используется для документации и как ориентир для реализации.
 * Аналог ru.spb.ipo.engine.elements.ElementInterface
 * * @interface
 */
export class ElementInterface {
    
    /**
     * Возвращает целое числовое значение элемента.
     * @returns {number}
     */
    getInt() {
        throw new Error("Not implemented");
    }

    /**
     * Возвращает дочерний элемент по индексу (1-based).
     * @param {number} index 
     * @returns {Element}
     */
    getElementAt(index) {
        throw new Error("Not implemented");
    }

    /**
     * Возвращает длину элемента (количество дочерних элементов или 0).
     * @returns {number}
     */
    getLength() {
        throw new Error("Not implemented");
    }

    /**
     * Возвращает BigInt представление (если поддерживается).
     * Аналог getBigInteger() из Java.
     * @returns {bigint}
     */
    getBigInt() {
        throw new Error("Not implemented");
    }
}