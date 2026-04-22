import { ComplexElement } from '../../base/ComplexElement.js';
import { FuncUtil } from '../../base/FuncUtil.js';

/**
 * Логика проверки изменения числа (делимость, кратность).
 *
 */
export class DivCompareElement extends ComplexElement {
    constructor(res, compare, desc) {
        super();
        this.result = res; // 1 (увеличивается), -1 (уменьшается), 0 (не меняется)
        this.compare = compare; // Во сколько раз (если -1, то "в целое число раз")
        this.desc = desc;
    }

    generateXml() {
        let sb = "";
        const shift = "${shift}";

        if (this.result === 0) {
            sb += FuncUtil.equals(shift, FuncUtil.cse());
        } else {
            let mod = "";
            let div = "";
            
            // Логика сборки функций Mod и Div
            if (this.result === 1) {
                mod = FuncUtil.func("Mod", FuncUtil.func("ToDigit", shift), FuncUtil.func("ToDigit", FuncUtil.cse()));
                div = FuncUtil.func("Div", FuncUtil.func("ToDigit", shift), FuncUtil.func("ToDigit", FuncUtil.cse()));
            } else {
                mod = FuncUtil.func("Mod", FuncUtil.func("ToDigit", FuncUtil.cse()), FuncUtil.func("ToDigit", shift));
                div = FuncUtil.func("Div", FuncUtil.func("ToDigit", FuncUtil.cse()), FuncUtil.func("ToDigit", shift));
            }

            const isMod = FuncUtil.equals(mod, FuncUtil.constElement(0));
            let isDiv = FuncUtil.equals(div, FuncUtil.constElement(this.compare === -1 ? 1 : this.compare));

            if (this.compare === -1) {
                isDiv = FuncUtil.func("Not", isDiv);
            }

            sb += FuncUtil.func("And", isMod, isDiv);
        }
        return sb;
    }

    toDescription() {
        return this.compare === -1 ? this.desc : `${this.desc} ${this.compare} раз`;
    }

    toString() {
        return this.toDescription();
    }
}