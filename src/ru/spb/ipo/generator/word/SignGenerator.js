import { WordCondition } from './WordCondition.js';

export class SignGenerator extends WordCondition {
    constructor(sign) {
        super(null);
        this.sign = sign; // -1 (меньше), 0 (равно), 1 (больше)
    }

    generateXml() {
        let type = this.sign === -1 ? "Smaller" : (this.sign === 0 ? "Equals" : "Greater");
        let sb = `<function type="${type}">\n`;
        
        // Цикл для первого типа букв
        sb += `<function type="Add">\n<for name="i" first="1" last="\${length}" inc="1">\n`;
        sb += `<function type="Equals">\n<function type="Projection" axis="2">\n<function type="Projection" axis="\${i}">\n\t\t<current-set-element/>\n</function>\n</function>\n<constElement>0</constElement>\n</function>\n</for>\n</function>\n`;

        // Цикл для второго типа букв
        sb += `<function type="Add">\n<for name="i" first="1" last="\${length}" inc="1">\n`;
        sb += `<function type="Equals">\n<function type="Projection" axis="2">\n<function type="Projection" axis="\${i}">\n\t\t<current-set-element/>\n</function>\n</function>\n<constElement>1</constElement>\n</function>\n</for>\n</function>\n`;
        
        sb += `</function>\n`;
        return sb;
    }
}