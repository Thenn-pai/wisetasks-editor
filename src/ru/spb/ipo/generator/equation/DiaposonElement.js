import { ComplexElement } from '../base/ComplexElement.js';
import { FuncUtil } from '../base/FuncUtil.js';

/**
 * Элемент условия: диапазон или точное значение (min <= x_i <= max).
 *
 */
export class DiaposonElement extends ComplexElement {
    // В JS используем объект для параметров, чтобы заменить перегрузку конструкторов из Java
    constructor({ min = -1, max = -1, equal = null, axis, isValue }) {
        super();
        this.axis = axis;
        this.isValue = isValue;
        
        if (equal !== null) {
            this.min = equal;
            this.max = -1;
            this.isEqual = true;
        } else {
            this.min = min;
            this.max = max;
            this.isEqual = false;
        }
    }

    generateXml() {
        let sb = "";
        if (!this.isEqual) sb += `<function type="Not">\n`;

        if (this.max !== -1) {
            sb += `<function type="Greater">\n`;
        } else if (this.min !== -1 && !this.isEqual) {
            sb += `<function type="Smaller">\n`;
        } else if (this.isEqual) {
            sb += `<function type="Equals">\n`;
        }

        sb += FuncUtil.projection(this.axis);
        
        const targetValue = this.max !== -1 ? this.max : this.min;
        if (this.isValue) {
            sb += FuncUtil.constElement(targetValue);
        } else {
            sb += FuncUtil.projection(targetValue);
        }

        sb += `</function>\n`;
        if (!this.isEqual) sb += `</function>\n`;

        return sb;
    }

    toDescription() { return this.toString(); }

    toString() {
        if (this.min !== -1 && this.max !== -1) {
            return `${this.min} <= x${this.axis} <= ${this.max}`;
        } else {
            if (this.isEqual) {
                return `x${this.axis} == ${this.isValue ? this.min : 'x' + this.min}`;
            } else if (this.max !== -1) {
                return `x${this.axis} <= ${this.max}`;
            } else if (this.min !== -1) {
                return `x${this.axis} >= ${this.min}`;
            }
        }
        return "";
    }
}