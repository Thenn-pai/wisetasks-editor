import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';
import { ChessXmlGenerator } from './ChessXmlGenerator.js';
import { ChessSetPanel } from './ChessSetPanel.js';
import { ChessFuncPanel } from './ChessFuncPanel.js';

/**
 * Основной класс редактора "Шахматы".
 *
 */
export class ChessGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.setPanel = new ChessSetPanel(this);
        this.functionPanel = new ChessFuncPanel(this);
    }

    getHelpString() {
        return "Редактор \"Задач на шахматы\" Кондратюк/Неботов"; //
    }

    createGenerator(source, func, task) {
        // В оригинале здесь была авто-подстановка картинок
        return new ChessXmlGenerator(source, func, task);
    }
}