import { ConstraintPanel } from '../../base/ui/ConstraintPanel.js';

/**
 * Панель ввода выражения и делителя.
 *
 */
export class ModSetPanel extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        // Значения, которые в интерфейсе будут привязаны к инпутам (например, через v-model в Vue или state в React)
        this.expression = "123"; // По умолчанию из Java
        this.modNumber = "";
    }

    clear() {
        this.modNumber = "";
        this.expression = "";
    }

    /**
     * Передача параметров в движок генерации.
     * Обрати внимание: в Java метод назван fillParameters, но обычно в ConstraintPanel это fillMaps.
     *
     */
    fillParameters(source, func, task) {
        func.expression = this.expression;
        func.mod = this.modNumber;
    }

    // Алиас для совместимости с базовой архитектурой генератора
    fillMaps(source, func, task) {
        this.fillParameters(source, func, task);
    }

    /**
     * Валидация перед сохранением задачи.
     *
     */
    checkCanSave() {
        const modValue = this.modNumber.trim();
        if (modValue === "") {
            console.error("Не указан делитель!");
            return false;
        }

        const expValue = this.expression.trim();
        if (expValue === "") {
            console.error("Не указано делимое!");
            return false;
        }

        return true;
    }
}