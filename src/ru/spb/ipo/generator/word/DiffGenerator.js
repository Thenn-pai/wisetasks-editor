import { ComplexElement } from '../base/ComplexElement.js';

export class DiffGenerator extends ComplexElement {
    constructor(desc) {
        super();
        this.desc = desc;
    }

    generateXml() {
        let sb = `<function type="And">\n<constElement>1</constElement>\n`;
        sb += `<for name="i" first="1" last="\${length}-1" inc="1">\n`;
        sb += `<function type="Not">\n<function type="Equals">\n`;
        sb += `<function type="Projection" axis="2">\n<function type="Projection" axis="\${i}">\n\t\t<current-set-element/>\n</function>\n</function>\n`;
        sb += `<function type="Projection" axis="2">\n<function type="Projection" axis="\${i}+1">\n\t\t<current-set-element/>\n</function>\n</function>\n`;
        sb += `</function>\n</function>\n`;
        sb += `</for>\n</function>\n`;
        return sb;
    }

    toDescription() { return this.desc; }
    toString() { return this.toDescription(); }
}