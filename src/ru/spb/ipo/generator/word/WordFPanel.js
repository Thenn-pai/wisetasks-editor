import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';

export class WordFPanel extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        this.isSingle = true; // Буквы могут повторяться
        this.wordConditionIndex = 0; // Выбранное условие из списка
    }

    getIsSingle() {
        return this.isSingle;
    }

    fillMaps(source, func, task) {
        source.isSingle = this.isSingle;
    }
}