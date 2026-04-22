/**
 * Базовый элемент дерева конфигурации.
 *
 */
export class Element {
    constructor() {
        this.type = null;
        this.name = null;
        this.isRequired = true;
        this.subElements = new Map(); // Аналог HashMap
        this.attributes = [];         // Аналог ArrayList
        this.operations = 0;
        this.containingText = false;
    }

    getType() { return this.type; }
    
    getName() { return this.name; }
    setName(name) { this.name = name; }

    setSubElement(e) {
        this.subElements.set(e.getName(), e);
    }

    getSubElement(name) {
        return this.subElements.get(name);
    }

    getSubElements() {
        return this.subElements;
    }

    getAttributes() {
        return this.attributes;
    }

    setAttribute(e) {
        // В Java тут использовался ru.spb.ipo.taskgenerator.model.KeyValue
        // В JS мы используем простой объект
        this.attributes.push({ key: e.getName(), value: e });
    }

    getRequired() { return this.isRequired; }
    setRequired(b) { this.isRequired = b; }

    setOperations(ops) { this.operations = ops; }
    getOperations() { return this.operations; }

    getContainingText() { return this.containingText; }
    setContainingText(containingText) { this.containingText = containingText; }
}