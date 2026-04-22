// Импорт WordXmlGenerator появится, когда ты пришлешь 11-й файл
import { WordXmlGenerator } from './WordXmlGenerator.js'; 

export class IndexXmlGenerator extends WordXmlGenerator {
    constructor(sourceParams, funcParams, taskParams) {
        super(sourceParams, funcParams, taskParams);
    }

    getVerifier(funcParams) {
        let sb = `<verifier type="IndexVerifier">\n<function type="And">\n<constElement>1</constElement>\n`;
        sb += `${funcParams.function || ""}\n</function>\n`;
        sb += `${funcParams.indexingElement}\n</verifier>`;
        return sb;
    }

    generateDescription() {
        const alphabit = this.taskParams.alphabit;
        const nabor = this.sourceParams.nabor;
        const isMulti = !this.sourceParams.isSingle; // В Java isMulti() - это инверсия
        const inlineDesc = this.taskParams.inlineDesc ? `, удовлетворяющих следующим условиям : ${this.taskParams.inlineDesc.toLowerCase()}` : "";
        
        return `Рассмотрим множество всех ${nabor}-буквенных слов в алфавите А = ${alphabit} (буквы в словах ${isMulti ? "" : "не "}могут повторяться)${inlineDesc}. Найдите в этом множестве порядковый номер слова "${this.funcParams.indexingElementText}".`;
    }
}