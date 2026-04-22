/**
 * Класс, представляющий конкретное значение параметра.
 * Аналог ru.spb.ipo.engine.task.Value
 */
export class Value {
    /**
     * @param {string} value - Техническое значение (используется в расчетах)
     * @param {string|null} text - Текстовое представление (используется в условии)
     */
    constructor(value, text = null) {
        this.value = value;
        this.text = text;
    }

    /** @returns {string} Текст значения или пустая строка, если текст не задан */
    getText() {
        if (this.text === null) {
            return "";
        }
        return this.text;
    }

    /** @returns {string} Техническое значение */
    getValue() {
        return this.value;
    }
}