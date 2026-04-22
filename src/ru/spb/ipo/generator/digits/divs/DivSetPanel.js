import { ConstraintPanel } from '../../base/ui/ConstraintPanel.js';

/**
 * Выбор количества цифр в числе.
 *
 */
export class DivSetPanel extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        this.numberSizes = ["2", "3", "4", "5", "6", "7", "8"];
        this.selectedIndex = 6; // По умолчанию 8 цифр
    }

    getNumberSize() {
        return this.numberSizes[this.selectedIndex];
    }

    fillMaps(source, func, task) {
        source.nabor = this.getNumberSize();
        super.fillMaps(source, func, task);
    }
}