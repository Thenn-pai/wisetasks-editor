/**
 * Класс-прокси для представления краткой информации о задаче.
 * Аналог ru.spb.ipo.engine.rmi.ProblemProxy
 */
export class ProblemProxy {

    /**
     * @param {string} title - Название задачи
     * @param {number} id - Идентификатор задачи
     */
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }

    /** @returns {string} */
    getTitle() {
        return this.title;
    }

    /** @param {string} title */
    setTitle(title) {
        this.title = title;
    }

    /** @returns {number} */
    getId() {
        return this.id;
    }

    /** @param {number} id */
    setId(id) {
        this.id = id;
    }

    /**
     * Возвращает строковое представление (название задачи).
     */
    toString() {
        return this.title;
    }
}