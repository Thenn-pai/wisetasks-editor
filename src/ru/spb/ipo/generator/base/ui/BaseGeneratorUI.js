/**
 * Базовая логика для всех редакторов генераторов.
 *
 */
export class BaseGeneratorUI {
    constructor() {
        this.imagesList = [];
        this.file = null;
        this.isModified = false;
    }

    // Логика проверки на пустоту
    isEmpty(str) {
        return str === null || str === "";
    }

    // Заглушка для получения условий из списка
    getConditions(functionListModel) {
        // В JS просто возвращаем массив из модели данных
        return functionListModel || [];
    }

    // Метод, который должен реализовать каждый конкретный редактор
    getHelpString() {
        return "Генератор задач";
    }
}