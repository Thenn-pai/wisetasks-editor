/**
 * Управление наборами шаров в корзинах.
 *
 */
export class BasketSetController {
    constructor() {
        this.basket1 = [];
        this.basket2 = [];
        this.isSingle = false;
    }

    // Добавление шаров в корзину
    addBall(basketNum, colorIndex, count) {
        const ball = { color: colorIndex, count: count };
        if (basketNum === 1) this.basket1.push(ball);
        else this.basket2.push(ball);
    }

    // Подготовка данных для генератора
    fillMaps(source) {
        source.isSingle = this.isSingle;
        source.basket1 = this.basket1;
        source.basket2 = this.basket2;
    }

    clear() {
        this.basket1 = [];
        this.basket2 = [];
    }
}