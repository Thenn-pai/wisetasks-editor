import { FuncUtil } from '../../base/FuncUtil.js';
// ВНИМАНИЕ: Этот класс импортируется из папки numbers, которую мы перенесем позже
import { NumberXmlGenerator } from '../../numbers/NumberXmlGenerator.js'; 

/**
 * Генератор XML-описания для задач на делимость.
 *
 */
export class DivXmlGenerator extends NumberXmlGenerator {
    constructor(sourceParams, funcParams, taskParams) {
        super(sourceParams, funcParams, taskParams);
    }

    generateDescription() {
        const nabor = parseInt(this.sourceParams.nabor);
        let def = "";
        for (let i = 1; i <= nabor; i++) {
            def += `[${i}] `;
        }
        
        const shiftStr = this.funcParams.shift.join(" ");
        return `Найти все ${this.sourceParams.nabor} значные натуральные числа, которые при изменении цифр числа по правилу: ${def}-->${shiftStr} (в полученном числе 1 цифра не 0); ${this.taskParams.inlineDesc || ""}.`;
    }

    getSourceTemplate() {
        this.sourceParams.isNumber = true;
        this.sourceParams.maxDigit = "9";
        return super.getSourceTemplate(); // Вызов родительского метода из NumberXmlGenerator
    }

    getVerifier(funcParams) {
        let sb = "<verifier type=\"ListVerifier\">\n<function type=\"And\">\n<constElement>1</constElement>\n";
        
        const shiftCond = this.generateShift();
        const shift = funcParams.shift;

        // Проверка, что первая цифра нового числа не 0
        let sb2 = "";
        this.generatePosition(shift[0], (str) => sb2 += str);
        
        const not0 = FuncUtil.func("Not", FuncUtil.func("Equals", sb2, FuncUtil.constElement(0)));
        sb += `${not0}\n`;

        let cond = funcParams.function || "";
        cond = this.replace(cond, { shift: shiftCond });
        sb += `${cond}\n</function>\n</verifier>`;
        
        return sb;
    }

    generateShift() {
        const shift = this.funcParams.shift;
        let sb = "<function type=\"FunctionElement\">\n";
        for (let i = 0; i < shift.length; i++) {
            this.generatePosition(shift[i], (str) => sb += str);
        }
        sb += "</function>\n";
        return sb;
    }

    generatePosition(pos, appendCallback) {
        if (pos.startsWith("[")) {
            // Проекция цифры по индексу
            appendCallback(`    ${FuncUtil.projection(pos.substring(1, 2))}`);
        } else {
            // Конкретная цифра
            appendCallback(`    ${FuncUtil.constElement(pos)}`);
        }
    }
}