import { ComplexElement } from '../base/ComplexElement.js';

export class NextGenerator extends ComplexElement {
    constructor(desc, type) {
        super();
        this.desc = desc;
        this.type = type; // Условный тип буквы
    }

    getUnType() {
        return this.type === 1 ? 0 : 1;
    }

    generateXml() {
        let sb = `<function type="And">\n<constElement>1</constElement>\n`;
        sb += `<for name="i" first="1" last="\${length}-1" inc="1">\n`;
        // ... (Здесь огромная логика Or/And/Equals из Java, использую шаблонные строки)
        sb += `<function type="Or">\n<function type="And">\n`;
        sb += `<function type="Equals">\n<function type="Projection" axis="2">\n<function type="Projection" axis="\${i}">\n\t\t<current-set-element/>\n</function>\n</function>\n<constElement>${this.type}</constElement></function>\n`;
        sb += `<function type="Equals">\n<function type="Projection" axis="2">\n<function type="Projection" axis="\${i}+1">\n\t\t<current-set-element/>\n</function>\n</function>\n<constElement>${this.getUnType()}</constElement></function>\n`;
        sb += `</function>\n<function type="Equals">\n<function type="Projection" axis="2">\n<function type="Projection" axis="\${i}">\n\t\t<current-set-element/>\n</function>\n</function>\n<constElement>${this.getUnType()}</constElement></function>\n`;
        sb += `</function>\n</for>\n`;
        // Проверка последнего элемента
        sb += `<function type="Equals">\n<function type="Projection" axis="2">\n<function type="Projection" axis="\${length}">\n\t\t<current-set-element/>\n</function>\n</function>\n<constElement>${this.getUnType()}</constElement></function>\n`;
        sb += `</function>\n`;
        return sb;
    }

    toDescription() { return this.desc; }
    toString() { return this.toDescription(); }
}