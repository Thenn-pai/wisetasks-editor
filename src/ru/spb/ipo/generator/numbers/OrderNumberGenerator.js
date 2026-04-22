import { ComplexElement } from '../base/ComplexElement.js';

export class OrderNumberGenerator extends ComplexElement {
    constructor(order) {
        super();
        this.order = order;
    }

    generateXml() {
        let sb = "";
        let type = "";
        switch (this.order) {
            case -1:
            case -2:
                type = "Smaller";
                break;
            case 0:
                type = "Equal";
                break;
            case 1:
            case 2:
                type = "Greater";
                break;
        }

        sb += `<function type="And">\n`;
        sb += `<constElement>1</constElement>\n`;
        sb += `<for name="i" first="1" last="\${length}-1" inc="1">\n`;

        if (this.order === 2 || this.order === -2) {
            sb += `<function type="Not">\n`;
        }

        sb += `<function type="${type}">\n`;
        sb += `<function type="Projection" axis="\${i}">\n`;
        sb += `\t\t<current-set-element/>\n`;
        sb += `</function>\n`;
        sb += `<function type="Projection" axis="\${i}+1">\n`;
        sb += `\t\t<current-set-element/>\n`;
        sb += `</function>\n`;
        sb += `</function>\n`;

        if (this.order === 2 || this.order === -2) {
            sb += `</function>\n`;
        }

        sb += `</for>\n`;
        sb += `</function>\n`;

        return sb;
    }

    toDescription() {
        let s = "";
        switch (this.order) {
            case -2: s = "в невозрастающем"; break;
            case -1: s = "в убывающем"; break;
            case 0: s = "одинаковы"; break;
            case 1: s = "в возрастающем"; break;
            case 2: s = "в неубывающем"; break;
        }
        return `цифры идут ${s} порядке`;
    }

    toString() {
        return this.toDescription();
    }
}