import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';
import { DiaposonElement } from './DiaposonElement.js';
import { DivElement } from './DivElement.js';

/**
 * Панель ограничений на конкретные переменные.
 *
 */
export class EquationFuncPanel extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        this.variables = ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10"];
        this.conditions = ["<", ">", "=", "делится на"];
    }

    /**
     * Логика добавления условия (аналог нажатия кнопки "Добавить")
     * @param {number} xIndex Индекс переменной (1 для x1)
     * @param {number} condIndex Индекс условия из массива conditions
     * @param {number} value Значение
     */
    addConditionValue(xIndex, condIndex, value) {
        let element = null;
        
        switch(condIndex) {
            case 0: // <
                element = new DiaposonElement({ max: value - 1, axis: xIndex, isValue: true });
                break;
            case 1: // >
                element = new DiaposonElement({ min: value + 1, axis: xIndex, isValue: true });
                break;
            case 2: // =
                element = new DiaposonElement({ equal: value, axis: xIndex, isValue: true });
                break;
            case 3: // делится на
                element = new DivElement(value, xIndex, true);
                break;
        }

        if (element) {
            this.addCondition(element);
        }
    }
}