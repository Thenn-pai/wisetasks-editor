/**
 * Интерфейс (контракт) для выполнения действий.
 *
 */
export class PerformAction {
    /**
     * @param {HTMLInputElement} field - Поле ввода
     * @param {Event} event - Событие клика
     */
    perform(field, event) {
        throw new Error("Метод perform должен быть реализован");
    }
}