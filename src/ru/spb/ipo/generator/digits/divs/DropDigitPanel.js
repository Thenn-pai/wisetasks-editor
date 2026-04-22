import { ConstraintPanel } from '../../base/ui/ConstraintPanel.js';

/**
 * Контроллер сборки нового числа (перестановка цифр).
 * В оригинале работал через Drag-and-Drop.
 */
export class DropDigitPanel extends ConstraintPanel {
    constructor(parent) {
        super(parent);
        this.leftCond = []; // Массив, хранящий последовательность собранных цифр
    }

    // Добавление "перетащенной" цифры или позиции
    addDroppedItem(item) {
        if (this.leftCond.length >= 9) {
            console.error("В числе должно быть не более 9 цифр!");
            return;
        }
        this.leftCond.push(item.trim());
    }

    fillMaps(source, func, task) {
        // Передаем собранный массив сдвигов в генератор
        func.shift = [...this.leftCond]; 
    }

    checkCanSave() {
        if (this.leftCond.length === 0) {
            console.error("Не задана перестановка!");
            return false;
        }
        return true;
    }

    clear() {
        this.leftCond = [];
    }
}