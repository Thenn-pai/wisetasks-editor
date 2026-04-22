import { BaseGenerator } from '../base/BaseGenerator.js';

export class NumberXmlGenerator extends BaseGenerator {
    constructor(sourceParams, funcParams, taskParams) {
        super(sourceParams, funcParams, taskParams);
    }

    getSourceTemplate() {
        const nabor = parseInt(this.sourceParams.nabor);
        const maxDigit = parseInt(this.sourceParams.maxDigit);
        const isNumber = this.sourceParams.isNumber;

        let source = " <sourceSet> \n <set type=\"DecartSet\"> \n";
        for (let i = 0; i < nabor; i++) {
            if (isNumber && i === 0) {
                source += `<set type="NumericSet" first="1" last="${maxDigit}"/>\n`;
            } else {
                source += `<set type="NumericSet" first="0" last="${maxDigit}"/>\n`;
            }
        }
        source += "\t</set>\n</sourceSet>";

        source = this.replace(source, this.getBaseSourceParameters());
        return source;
    }

    getBaseSourceParameters() {
        return {}; // Возвращаем пустой объект, аналог HashMap из Java
    }

    generateDescription() {
        const nabor = parseInt(this.sourceParams.nabor);
        const maxDigit = parseInt(this.sourceParams.maxDigit);
        const isNumber = this.sourceParams.isNumber;
        
        const inlineDesc = this.taskParams.inlineDesc ? this.taskParams.inlineDesc.toLowerCase() : "";
        const suffix = this.isEmptyInline() ? "." : `, для которых верно следующее: ${inlineDesc}.`;

        if (isNumber) {
            return `Найдите количество всех ${nabor}-значных  чисел, состоящих из цифр от 0 до ${maxDigit}${suffix}`;
        } else {
            return `Найдите количество всех наборов чисел, состоящих из ${nabor} цифр от 0 до ${maxDigit}${suffix}`;
        }
    }
}