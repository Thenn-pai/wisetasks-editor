import { ComplexElement } from '../base/ComplexElement.js';
import { BasketXmlGenerator } from './BasketXmlGenerator.js';

/**
 * Элемент данных: количество + цвет шаров.
 *
 */
export class BasketBallComplexElement extends ComplexElement {
    constructor(colorIndex, count) {
        super();
        this.color = colorIndex;
        this.numbers = count;
    }

    toDescription() {
        return `${this.numbers} ${BasketXmlGenerator.ballColors[this.color]}`;
    }

    toString() {
        return this.toDescription();
    }

    generateXml() {
        // В оригинале зарезервировано под будущую реализацию
        return null;
    }
}