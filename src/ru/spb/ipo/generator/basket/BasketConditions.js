import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';
import { BasketXmlGenerator } from './BasketXmlGenerator.js';
import { BasketBallComplexElement } from './BasketBallComplexElement.js';

/**
 * Панель условий для корзин (выбор вытаскиваемых шаров).
 *
 */
export class BasketConditions extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        this.isCont = false; // "Последовательно" (Equals) или "Одновременно" (Like)
        this.selectedColor = 0;
    }

    /**
     * Метод добавления условия (аналог нажатия кнопки jButton в Java)
     *
     */
    addBallCondition(count) {
        const ce = new BasketBallComplexElement(this.selectedColor, count);
        this.addCondition(ce);
    }

    /**
     * Заполнение параметров для генерации
     *
     */
    fillMaps(source, func, task) {
        func.isCont = this.isCont;
        // Получаем все добавленные условия из списка
        func.toFind = this.getConditions(); 
    }
}