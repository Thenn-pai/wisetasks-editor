import { ComplexElement } from '../base/ComplexElement.js';

export class WordCondition extends ComplexElement {
    constructor(desc) {
        super();
        this.desc = desc;
    }

    generateXml() {
        let sb = `<function type="And">\n`;
        sb += `<constElement>1</constElement>\n`;
        sb += `<constElement>1</constElement>\n`;
        sb += `<for name="i" first="1" last="\${lengthMod2}" inc="1">\n`;
        sb += `<function type="Equals">\n`;
        sb += `<function type="Projection" axis="\${i}">\n\t\t<current-set-element/>\n</function>\n`;
        sb += `<function type="Projection" axis="\${length} + 1 -\${i}">\n\t\t<current-set-element/>\n</function>\n`;
        sb += `</function>\n`;
        sb += `</for>\n`;
        sb += `</function>\n`;
        return sb;
    }

    toDescription() { return this.desc; }
    toString() { return this.toDescription(); }
}