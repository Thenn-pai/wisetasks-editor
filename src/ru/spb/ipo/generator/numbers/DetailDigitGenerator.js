import { ComplexElement } from '../base/ComplexElement.js';

export class DetailDigitGenerator extends ComplexElement {
    constructor(leftParams, rightParams, cond) {
        super();
        this.left = leftParams;
        this.right = rightParams;
        this.cond = cond;
    }

    forPart(ids) {
        if (ids.length === 1) return this.forOne(ids[0]);
        let sb = `<function type="Add">\n`;
        ids.forEach(id => sb += this.forOne(id));
        sb += `</function>\n`;
        return sb;
    }

    forOne(id) {
        return `<function type="Projection" axis="${id}">\n\t\t<current-set-element/>\n</function>\n`;
    }

    generateXml() {
        const funcMap = { '<': 'Smaller', '=': 'Equals', '>': 'Greater' };
        return `<function type="${funcMap[this.cond]}">\n${this.forPart(this.left)}${this.forPart(this.right)}</function>`;
    }
}