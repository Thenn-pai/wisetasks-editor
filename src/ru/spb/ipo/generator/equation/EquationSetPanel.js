import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';
import { FuncUtil } from '../base/FuncUtil.js';

/**
 * Панель базовых настроек уравнения.
 *
 */
export class EquationSetPanel extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        this.xNumber = "3"; // Количество переменных (x1 + x2 + x3)
        this.resultNumber = "25"; // Сумма
    }

    fillMaps(source, func, task) {
        source.resultX = this.resultNumber;
        source.nabor = this.xNumber;

        let functionStr = func.function || "";

        // Базовое условие: сумма всех x_i равна resultX
        let sb = `<function type="Equals">\n`;
        sb += FuncUtil.constElement("${result}");
        sb += `<function type="Add">\n`;
        sb += `<for name="i" first="1" last="\${length}" inc="1">\n`;
        sb += FuncUtil.projection("${i}");
        sb += `</for>\n`;
        sb += `</function>\n`;
        sb += `</function>\n`;

        func.function = functionStr + "\n" + sb;
    }
}