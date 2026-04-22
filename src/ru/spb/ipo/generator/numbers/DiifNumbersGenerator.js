import { ComplexElement } from '../base/ComplexElement.js';

export class DiifNumbersGenerator extends ComplexElement {
    constructor(desc) {
        super();
        this.desc = desc;
    }

    generateXml() {
        return `<function type="Equals">\n<function type="Projection" axis="1">\n<function type="Count">\n\t\t<current-set-element/>\n</function>\n</function>\n<constElement>1</constElement>\n</function>\n`;
    }
    
    toString() { return this.desc; }
    toDescription() { return this.desc; }
}