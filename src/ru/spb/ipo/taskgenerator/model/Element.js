import { KernelElementImpl } from './KernelElementImpl.js';
import { Attribute } from './Attribute.js';

/**
 * Основной узел XML-документа задачи.
 *
 */
export class Element extends KernelElementImpl {
    constructor(name) {
        super();
        this.myName = name;
        this.myText = "";
        this.attributes = new Map(); // Аналог HashMap
        this.attributesList = [];    // Аналог ArrayList для сохранения порядка
    }

    // Перегрузка методов в JS делается проверкой аргументов
    addAttribute(attrOrName, value = null) {
        if (value !== null && typeof attrOrName === 'string') {
            this.addAttribute(new Attribute(attrOrName, value));
        } else {
            const attr = attrOrName;
            const existingIndex = this.attributesList.findIndex(a => a.getName() === attr.getName());
            
            this.attributes.set(attr.getName(), attr);
            
            if (existingIndex !== -1) {
                this.attributesList.splice(existingIndex, 1, attr); // Заменяем
            } else {
                this.attributesList.push(attr); // Добавляем в конец
            }
        }
    }

    getAttribute(name) {
        return this.attributes.get(name);
    }

    removeAttributes() {
        this.attributesList = [];
        this.attributes.clear();
    }

    getPresentableString() {
        let sb = "";
        this.attributesList.forEach(attr => {
            sb += `&nbsp;&nbsp;&nbsp;${attr.getPresentableString()}`;
        });
        
        return `<span style="color: black">${this.myName}${sb}</span>`;
    }

    getName() { return this.myName; }
    setName(name) { this.myName = name; }

    getText() { return this.myText; }
    setText(text) { this.myText = text; }
}