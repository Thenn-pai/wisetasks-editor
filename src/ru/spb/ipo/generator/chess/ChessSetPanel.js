import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';

/**
 * Контроллер размеров шахматной доски.
 *
 */
export class ChessSetPanel extends ConstraintPanel {
    constructor(generator) {
        super(generator);
        this.height = "6"; // Значения по умолчанию из Java
        this.width = "5";
    }

    fillMaps(source, func, task) {
        // Передаем размеры доски в генератор
        source.resultX = this.width;
        source.nabor = this.height;
    }
}