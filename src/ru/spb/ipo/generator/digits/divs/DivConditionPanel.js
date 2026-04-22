import { ConstraintPanel } from '../../base/ui/ConstraintPanel.js';
import { DivCompareElement } from './DivCompareElement.js';

/**
 * Панель выбора условия изменения числа.
 *
 */
export class DivConditionPanel extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        this.conditions = [
            "увеличивается в целое число раз", 
            "уменьшается в целое число раз", 
            "не меняется", 
            "увеличивается в", 
            "уменьшаются в"
        ];
        this.selectedIndex = 1; // По умолчанию
        this.comNumber = ""; // Значение в текстовом поле
    }

    addDivCondition() {
        const text = this.conditions[this.selectedIndex];
        let element = null;

        if (this.selectedIndex > 2) {
            const res = parseInt(this.comNumber);
            if (isNaN(res) || res <= 1) {
                console.error("Введите число большее 1"); // В Java тут JOptionPane
                return;
            }
        }

        // Фабрика элементов сравнения
        switch (this.selectedIndex) {
            case 0: element = new DivCompareElement(1, -1, text); break;
            case 1: element = new DivCompareElement(-1, -1, text); break;
            case 2: element = new DivCompareElement(0, -1, text); break;
            case 3: element = new DivCompareElement(1, parseInt(this.comNumber), text); break;
            case 4: element = new DivCompareElement(-1, parseInt(this.comNumber), text); break;
        }

        if (element) {
            this.addCondition(element);
        }
    }
}