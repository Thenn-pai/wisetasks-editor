import { ComplexElement } from '../base/ComplexElement.js';
import { FuncUtil } from '../base/FuncUtil.js';

/**
 * Элемент условия: делимость переменной (x_i делится на mod).
 *
 */
export class DivElement extends ComplexElement {
    constructor(mod, axis, isValue) {
        super();
        this.mod = mod;
        this.axis = axis;
        this.isValue = isValue;
    }

    generateXml() {
        let sb = `<function type="Equals">\n`;
        sb += `<function type="Mod" base="${this.mod}">\n`;
        sb += FuncUtil.projection(this.axis);
        sb += `</function>\n`;
        
        if (this.isValue) {
            // В оригинале, если делится нацело, остаток равен mod (в логике движка WiseTasks это реализовано так)
            sb += FuncUtil.constElement(this.mod); 
        }
        sb += `</function>\n`;
        return sb;
    }

    toDescription() {
        return this.toString();
    }

    toString() {
        return `x${this.axis} делится на ${this.mod}`;
    }
}