import { BaseGeneratorUI } from '../../base/ui/BaseGeneratorUI.js';
import { ModSetPanel } from './ModSetPanel.js';
import { ModXmlGenerator } from './ModXmlGenerator.js';

/**
 * Основной класс редактора "Задачи на остатки".
 *
 */
export class ModGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        // В Java: UIUtils.enableAll(getFunctionListPanel(), false);
        // В JS мы просто ставим флаг, который укажет фронтенду скрыть или заблокировать эту панель
        this.isFunctionListEnabled = false; 
    }

    getSetPanel() {
        if (!this.setPanel) {
            this.setPanel = new ModSetPanel(this);
        }
        return this.setPanel;
    }

    getHelpString() {
        return "Редактор \"Остатки\"";
    }

    checkCanSave() {
        // Вызываем базовую проверку + проверку полей ввода
        return super.checkCanSave() && this.getSetPanel().checkCanSave();
    }

    clear() {
        super.clear();
        this.getSetPanel().clear();
    }

    createGenerator(source, func, task) {
        return new ModXmlGenerator(source, func, task);
    }
}