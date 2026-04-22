/**
 * Логика управления выбором элементов.
 *
 */
export class ChoicePanel {
    constructor() {
        this.items = [];
    }

    addItem(element) {
        this.items.push(element);
    }

    getChoices() {
        return [...this.items];
    }
}