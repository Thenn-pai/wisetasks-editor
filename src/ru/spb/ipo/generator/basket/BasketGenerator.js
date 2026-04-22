import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';
import { BasketXmlGenerator } from './BasketXmlGenerator.js';

/**
 * Основной класс редактора "Шары и урны".
 *
 */
export class BasketGenerator extends BaseGeneratorUI {
    constructor() {
        super();
    }

    getHelpString() {
        return "Редактор \"Шары и урны\"";
    }

    // Создание экземпляра генератора
    createGenerator(source, func, task) {
        return new BasketXmlGenerator(source, func, task);
    }
}