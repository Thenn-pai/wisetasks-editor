/**
 * Условие на количество карт определенного типа.
 *
 */
export class ParseElement {
    constructor(element, condition, value) {
        this.element = element; // Что считаем (ListElement)
        this.condition = condition; // "<", "=", ">"
        this.value = value; // Число
    }

    generateXml() {
        const typeMap = { '<': 'Smaller', '=': 'Equals', '>': 'Greater' };
        const funcType = typeMap[this.condition.charAt(0)];

        return `<function type="${funcType}">
            ${this.element.generateXml()}
            <constElement>${this.value}</constElement>
        </function>`;
    }

    toString() {
        const condRu = { '<': 'меньше', '=': 'равно', '>': 'больше' };
        return `количество карт ${this.element} ${condRu[this.condition.charAt(0)]} ${this.value}`;
    }
}