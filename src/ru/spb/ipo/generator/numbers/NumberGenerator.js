import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';
import { NumberSetPanel } from './NumberSetPanel.js';
import { NumberFunctionPanel } from './NumberFunctionPanel.js';
import { DetailDigitPanel } from './DetailDigitPanel.js';
import { NumberXmlGenerator } from './NumberXmlGenerator.js';

export class NumberGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.detailPanel = null;
        this.initialize();
    }

    getDetailPanel() {
        if (this.detailPanel === null) {
            this.detailPanel = new DetailDigitPanel(this);
        }
        return this.detailPanel;
    }

    getFunctionPanel() {
        if (!this.functionPanel) {
            this.functionPanel = new NumberFunctionPanel(this);
            // В JS связываем панели программно
            this.functionPanel.detailPanel = this.getDetailPanel();
        }
        return this.functionPanel;
    }

    getSetPanel() {
        if (!this.setPanel) {
            this.setPanel = new NumberSetPanel(this);
        }
        return this.setPanel;
    }

    createGenerator(source, func, task) {
        return new NumberXmlGenerator(source, func, task);
    }

    fillParameters(source, func, task) {
        // Считываем значения из панели настроек
        source.nabor = this.getSetPanel().naborSize; 
        source.isNumber = this.getSetPanel().isNumberFlag;
        source.maxDigit = this.getSetPanel().maxDigit;
    }

    getHelpString() {
        return "Редактор \"Упорядоченные числовые наборы\"";
    }
}