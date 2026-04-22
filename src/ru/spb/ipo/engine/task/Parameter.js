/**
 * Класс, представляющий параметр задачи.
 * Аналог ru.spb.ipo.engine.task.Parameter
 */
export class Parameter {
    /**
     * @param {string} name - Имя параметра
     * @param {string} myClass - Класс (тип) параметра
     * @param {Array} values - Список возможных значений (объектов Value)
     */
    constructor(name, myClass, values) {
        this._name = name;
        this._myClass = myClass;
        this._values = values;
    }

    /** @returns {string} Класс параметра */
    getMyClass() {
        return this._myClass;
    }

    /** @returns {string} Имя параметра */
    getName() {
        return this._name;
    }

    /** @returns {Array} Список значений */
    getValues() {
        return this._values;
    }
}