import { WordGenerator } from './WordGenerator.js';
import { IndexFPanel } from './IndexFPanel.js';
import { IndexXmlGenerator } from './IndexXmlGenerator.js';

export class IndexWordGenerator extends WordGenerator {
    constructor() {
        super();
        this.getFunctionPanel().isSingle = false; // По умолчанию отключаем повторения
    }

    getHelpString() {
        return 'Редактор "Индексация слов"';
    }

    getFunctionPanel() {
        if (!this.functionPanel) {
            this.functionPanel = new IndexFPanel(this);
        }
        return this.functionPanel;
    }

    createGenerator(source, func, task) {
        return new IndexXmlGenerator(source, func, task);
    }

    fillParameters(source, func, task) {
        super.fillParameters(source, func, task);
        
        // Логика сборки слова для индексации в XML
        const value = this.getFunctionPanel().getWord();
        let sb = `<indexingElement><constElement>`;
        // В оригинале здесь искались коды букв. Оставляем шаблон, который доработаем при связи с WordXmlGenerator.
        sb += ``; 
        sb += `</constElement></indexingElement>`;
        
        func.indexingElement = sb;
        func.indexingElementText = value;
    }
}