/**
 * Элемент списка задач.
 *
 */
export class ListElement {
    constructor(text, generator) {
        this.text = text;
        this.gen = generator;
    }

    toString() { return this.text; }
    generateXml() { return this.gen.generateXml(); }
}