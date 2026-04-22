/**
 * Класс-прокси для представления краткой информации о конкурсе.
 * Аналог ru.spb.ipo.engine.rmi.ContestProxy
 */
export class ContestProxy {

    /**
     * @param {string} title - Название конкурса
     * @param {number} id - Идентификатор конкурса
     */
    constructor(title = "", id = 0) {
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
     * Возвращает строковое представление (название конкурса).
     */
    toString() {
        return this.title;
    }
}