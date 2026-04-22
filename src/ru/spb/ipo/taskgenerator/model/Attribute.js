import { KernelElementImpl } from './KernelElementImpl.js';

/**
 * Атрибут элемента (например, name="value").
 *
 */
export class Attribute extends KernelElementImpl {
    constructor(name, value) {
        super();
        this.myName = name;
        this.myValue = value;
    }

    addChild(child) {
        throw new Error("UnsupportedOperationException: У атрибута не может быть дочерних элементов");
    }

    getChildren() {
        return []; // Возвращает пустой массив (аналог Collections.EMPTY_LIST)
    }

    getPresentableString() {
        // В оригинале был вызов HtmlUtil, здесь мы возвращаем простую строку для UI
        return `<span style="color: blue">${this.myName}</span>="${this.myValue}"`;
    }

    getName() { return this.myName; }
    setName(myName) { this.myName = myName; }

    getValue() { return this.myValue; }
    setValue(myValue) { this.myValue = myValue; }
}