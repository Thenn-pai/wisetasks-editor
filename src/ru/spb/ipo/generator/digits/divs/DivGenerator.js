import { BaseGeneratorUI } from '../../base/ui/BaseGeneratorUI.js';
import { DivSetPanel } from './DivSetPanel.js';
import { DropDigitPanel } from './DropDigitPanel.js';
import { DivXmlGenerator } from './DivXmlGenerator.js';

/**
 * Основной класс редактора "Задачи на делимость".
 *
 */
export class DivGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.setPanel = new DivSetPanel(this);
        this.functionPanel = new DropDigitPanel(this);
    }

    getHelpString() {
        return "Редактор \"Задачи на делимость\"";
    }

    createGenerator(source, func, task) {
        return new DivXmlGenerator(source, func, task);
    }

    checkCanSave() {
        const res = super.checkCanSave();
        if (!res) return false;
        
        if (this.getFunctionList().length === 0) {
            console.error("Не выбрано ни одного условия!");
            return false;
        }
        return this.functionPanel.checkCanSave();
    }

    clear() {
        super.clear();
        this.functionPanel.clear();
    }
}