import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';
import { EquationSetPanel } from './EquationSetPanel.js';
import { EquationFuncPanel } from './EquationFuncPanel.js';
import { EquationXmlGenerator } from './EquationXmlGenerator.js';

/**
 * Основной класс редактора "Количество решений уравнения".
 *
 */
export class EquationGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.setPanel = new EquationSetPanel(this);
        this.functionPanel = new EquationFuncPanel(this);
    }

    getHelpString() {
        return 'Редактор "Количество решений уравнения"';
    }

    createGenerator(source, func, task) {
        return new EquationXmlGenerator(source, func, task);
    }
}