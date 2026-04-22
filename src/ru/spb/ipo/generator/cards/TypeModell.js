import { ListElement } from '../base/ListElement.js';

// Базовый генератор для условий карт
class CardConditionGenerator {
    constructor(value, axis = "1") {
        this.value = value;
        this.axis = axis;
    }

    generateXml() {
        return this.generateCond(this.value);
    }

    generateCond(val) {
        // Логика формирования XML для конкретной характеристики карты
        return `<function type="Equals">
            <function type="Projection" axis="${this.axis}">
                <current-set-element/>
            </function>
            <constElement>${val}</constElement>
        </function>`;
    }
}

// Генератор для проверки наличия хотя бы одной карты во всем наборе
class AnyTypeGenerator extends CardConditionGenerator {
    constructor() { super("", "2"); }
    generateXml() {
        return `<function type="Count" axis="2">
            <current-set-element/>
        </function>`;
    }
}

export const CardTypes = {
    suits: [
        new ListElement("бубновой масти", new CardConditionGenerator("1")),
        new ListElement("червовой масти", new CardConditionGenerator("2")),
        new ListElement("пиковой масти", new CardConditionGenerator("3")),
        new ListElement("трефовой масти", new CardConditionGenerator("4")),
    ],
    ranks: [
        new ListElement("двоек", new CardConditionGenerator("1", "1")),
        new ListElement("тузов", new CardConditionGenerator("13", "1")),
        // ... остальные достоинства по аналогии
    ]
};