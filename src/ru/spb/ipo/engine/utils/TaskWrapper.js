/**
 * Обертка для корневого узла задачи.
 * Аналог ru.spb.ipo.engine.utils.TaskWrapper
 */
export class TaskWrapper {

    /**
     * @param {Node} root - Корневой узел (экземпляр нашего класса Node из engine/task)
     */
    constructor(root) {
        this._root = root;
    }

    /**
     * Получить корневой узел
     * @returns {Node}
     */
    get root() {
        return this._root;
    }

    set root(value) {
        this._root = value;
    }
}