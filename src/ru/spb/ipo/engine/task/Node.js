/**
 * Интерфейс (базовый класс) для узла данных задачи.
 * Аналог ru.spb.ipo.engine.task.Node
 */
export class Node {

    /** @returns {Node} Глубокая копия узла */
    makeCopy() {
        throw new Error("Метод makeCopy не реализован");
    }

    /** @returns {string} Имя узла (тега) */
    getNodeName() {
        throw new Error("Метод getNodeName не реализован");
    }

    /** * @param {string} name 
     * @returns {Node[]} Список дочерних узлов с указанным именем 
     */
    getChilds(name) {
        throw new Error("Метод getChilds не реализован");
    }

    /** * @param {string} name 
     * @returns {string} Значение атрибута 
     */
    getAttr(name) {
        throw new Error("Метод getAttr не реализован");
    }

    /** * @param {string} name 
     * @param {string} defaultValue 
     * @returns {string} 
     */
    getAttrIfExists(name, defaultValue) {
        throw new Error("Метод getAttrIfExists не реализован");
    }

    /** @returns {string} Текстовое содержимое узла */
    getText() {
        throw new Error("Метод getText не реализован");
    }

    /** @param {string} name @returns {Node|null} */
    getChildIfExists(name) {
        throw new Error("Метод getChildIfExists не реализован");
    }

    /** @param {string} name @returns {Node} */
    getChild(name) {
        throw new Error("Метод getChild не реализован");
    }

    /** @returns {Object} Словарь всех атрибутов узла */
    getAttrs() {
        throw new Error("Метод getAttrs не реализован");
    }

    /** @param {string} newNodeValue Обновить значение узла */
    update(newNodeValue) {
        throw new Error("Метод update не реализован");
    }

    /** @param {Node} newChild Добавить дочерний узел */
    addToParent(newChild) {
        throw new Error("Метод addToParent не реализован");
    }

    /** @param {Node} oldChild Удалить дочерний узел */
    removeFromParent(oldChild) {
        throw new Error("Метод removeFromParent не реализован");
    }

    /** @returns {boolean} Является ли узел пустой оберткой */
    isEmptyWrapper() {
        throw new Error("Метод isEmptyWrapper не реализован");
    }

    /** @returns {Node[]} Список функций, если узел их содержит */
    getFunctionList() {
        throw new Error("Метод getFunctionList не реализован");
    }
}