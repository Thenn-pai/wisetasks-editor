import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';
import { BasketSetController } from './BallChoicePanel.js'; // Ранее созданный контроллер

/**
 * Панель настройки содержимого корзин.
 *
 */
export class BasketSetPanel extends ConstraintPanel {
    constructor() {
        super(null);
        this.useAdditionalBasket = true;
        this.basketController = new BasketSetController();
    }

    /**
     * Передает данные о составе корзин в генератор.
     *
     */
    fillMaps(source, func, task) {
        // Если чекбокс "Дополнительная корзина" не нажат, значит корзина одна
        //
        source.isSingle = !this.useAdditionalBasket;
        
        // Получаем наборы шаров из контроллеров (аналог bcpanel1.getChoices())
        source.basket1 = this.basketController.basket1;
        source.basket2 = this.basketController.basket2;
    }

    clear() {
        this.basketController.clear();
    }
}