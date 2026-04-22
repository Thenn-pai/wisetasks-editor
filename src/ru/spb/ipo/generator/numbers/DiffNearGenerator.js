import { ComplexElement } from '../base/ComplexElement.js';

export class DiffNearGenerator extends ComplexElement {
    constructor(desc) {
        super();
        this.desc = desc;
    }

    generateXml() {
        return `<function type="And">\n<constElement>1</constElement>\n<for name="i" first="1" last="\${length}-1" inc="1">\n<function type="Not">\n<function type="Equals">\n<function type="Projection" axis="\${i}">\n\t\t<current-set-element/>\n</function>\n<function type="Projection" axis="\${i}+1">\n\t\t<current-set-element/>\n</function>\n</function>\n</function>\n</for>\n</function>\n`;
    }

    toString() { return this.desc; }
    toDescription() { return this.desc; }
}