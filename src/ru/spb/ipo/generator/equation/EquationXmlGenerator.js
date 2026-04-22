import { BaseGenerator } from '../base/BaseGenerator.js';
import { SetUtil } from '../base/SetUtil.js';

/**
 * Генератор XML-описания для задач на уравнения.
 *
 */
export class EquationXmlGenerator extends BaseGenerator {
    constructor(sourceParams, funcParams, taskParams) {
        super(sourceParams, funcParams, taskParams);
    }

    getSourceTemplate() {
        // Создаем декартово произведение множеств от 0 до суммы уравнения
        const set = SetUtil.decart(SetUtil.numericSet("0", "${result}"));
        const source = this.replace(set, this.getBaseSourceParameters());
        return `<sourceSet>\n${source}</sourceSet>`;
    }

    generateDescription() {
        const nabor = parseInt(this.sourceParams.nabor);
        let str = "";
        for (let i = 1; i <= nabor; i++) {
            str += `x${i}`;
            if (i !== nabor) str += "+";
        }
        str += `=${this.sourceParams.resultX}`;
        
        const inlineDesc = this.taskParams.inlineDesc ? `, если известно, что ${this.taskParams.inlineDesc} ` : "";
        return `Найдите количество решений уравнения ${str} в целых неотрицательных числах${inlineDesc}.`;
    }

    getParams() {
        return `<description-params>\n` +
               `\t<param name="length">\n \t\t<value>\${nabor}</value>\n \t</param>\n` +
               `\t<param name="result">\n \t\t<value>\${resultX}</value>\n \t</param>\n` +
               `</description-params>`;
    }
}