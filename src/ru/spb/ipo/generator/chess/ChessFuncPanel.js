import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';
import { ChessBox } from './ChessBox.js';

/**
 * Контроллер условий задачи (выбор фигур и правил).
 *
 */
export class ChessFuncPanel extends ConstraintPanel {
    constructor(generator) {
        super(generator);
        this.isDiag = false; // Без главной диагонали
        this.isPob = false;  // Без побочной диагонали
        this.isKill = false; // Условие с бьющими фигурами
        this.chooseY = 0;    // Тип фигуры
        this.numberFigur = 2; // Количество фигур
        this.selectedFigure = "Ладья";
    }

    addRegionCondition() {
        // Проверка на квадратную доску для диагоналей
        const width = this.getGenerator().getSetPanel().width;
        const height = this.getGenerator().getSetPanel().height;
        
        if (width !== height && (this.isDiag || this.isPob)) {
            console.error("При выборе доски без диагонали должна быть только квадратная доска!");
            return;
        }

        const figuresMap = {
            "Слон": 1, "Конь": 2, "Ладья": 3, "Ферзь": 5, "Пешка": 6, "Король": 7
        };
        
        this.chooseY = figuresMap[this.selectedFigure] || 0;
        this.addCondition(new ChessBox(this.selectedFigure, this.numberFigur, this.isDiag, this.isPob));
    }

    fillMaps(source, func, task) {
        // Заменяем статические переменные из Java передачей данных через func
        func.chooseY = this.chooseY;
        func.isKill = this.isKill;
        func.isDiag = this.isDiag;
        func.isPob = this.isPob;
        func.numberFigur = this.numberFigur;
    }
}