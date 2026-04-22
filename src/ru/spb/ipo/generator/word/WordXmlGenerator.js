import { BaseGenerator } from '../base/BaseGenerator.js';

export class WordXmlGenerator extends BaseGenerator {
    constructor(sourceParams, funcParams, taskParams) {
        super(sourceParams, funcParams, taskParams);
    }

    getParams() {
        return `<description-params>\n` +
               `\t<param name="length">\n \t\t<value>\${nabor}</value>\n \t</param>\n` +
               `\t<param name="lengthMod2">\n \t\t<value>\${half-length}</value>\n \t</param>\n` +
               `</description-params>`;
    }

    getSourceTemplate() {
        // В оригинале это Boolean параметр
        const useDecartSet = this.sourceParams["setType-template"] === true || this.sourceParams["setType-template"] === "true";
        const nabor = parseInt(this.sourceParams.nabor, 10);
        
        let source = "";
        
        if (useDecartSet) {
            source = ` <sourceSet> \n <set type="DecartSet" length="\${length}"> \n`;
            for (let i = 0; i < nabor; i++) {
                source += `\t<set type="EnumerationSet">\n` +
                          `\${set-elements}` +
                          ` \t\t</set>\n`;
            }
            source += `\t</set>\n</sourceSet>`;
        } else {
            // Для слов без повторений используется LayoutSet
            source = ` <sourceSet> \n <set type="LayoutSet" length="\${length}"> \n` +
                     `\t<set type="EnumerationSet">\n` +
                     `\${set-elements}` +
                     ` \t\t</set>\n` +
                     `\t</set>\n</sourceSet>`;
        }
        
        source = this.replace(source, this.getBaseSourceParameters());
        return source;
    }

    getBaseSourceParameters() {
        return {}; // Эквивалент пустой HashMap из Java
    }

    isMulti() {
        // Вспоминаем логику из IndexXmlGenerator: 
        // isSingle = true означает "могут повторяться", значит isMulti - это её инверсия.
        return !this.sourceParams.isSingle; 
    }

    generateDescription() {
        const alphabit = this.taskParams.alphabit || "";
        const nabor = this.sourceParams.nabor;
        
        // Логика сборки строки описания
        const inlineText = this.taskParams.inlineDesc ? `, для которых верно следующее: ${this.taskParams.inlineDesc.toLowerCase()}` : ".";
        const suffix = this.isEmptyInline() ? "." : inlineText;

        return `Задан алфавит A = ${alphabit} (буквы в словах${this.isMulti() ? " " : " не "}могут повторяться). Подсчитайте количество всeх слов длины ${nabor} в алфавите А${suffix}`;
    }
}