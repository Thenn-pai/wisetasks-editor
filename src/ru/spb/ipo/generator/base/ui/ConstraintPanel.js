/**
 * Логика панели ограничений/условий.
 *
 */
export class ConstraintPanel {
    constructor(generator) {
        this.gen = generator;
    }

    /**
     * Добавление условия в список.
     *
     */
    addCondition(element, model) {
        model.push(element);
        console.log("Условие добавлено:", element);
    }

    /**
     * Заполнение мап для процесса генерации.
     *
     */
    fillMaps(source, func, task) {
        // Переопределяется в подклассах
    }
}