import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';
import { ComplexElement } from '../base/ComplexElement.js';
import { WordSet } from './WordSet.js';
import { WordFPanel } from './WordFPanel.js';
// import { WordXmlGenerator } from './WordXmlGenerator.js'; // Понадобится из 11-го файла

export class CharElement extends ComplexElement {
    constructor(ch, type) {
        super();
        this.ch = ch;
        this.type = type;
    }
    generateXml() {
        // Код символа 'а' в JS можно получить через charCodeAt(0)
        const charCodeOffset = this.ch.charCodeAt(0) - 'а'.charCodeAt(0);
        return `<constElement>\n    <constElement>${charCodeOffset}</constElement>    <constElement>${this.type}</constElement></constElement>\n`;
    }
    toString() { return this.ch; }
}

export class WordGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.setPanel = new WordSet(this);
        this.functionPanel = new WordFPanel(this);
    }

    getSetPanel() { return this.setPanel; }
    getFunctionPanel() { return this.functionPanel; }

    getHelpString() {
        return 'Редактор "Слова над конечным алфавитом"';
    }

    fillParameters(source, func, task) {
        this.getSetPanel().fillMaps(source, func, task);
        this.getFunctionPanel().fillMaps(source, func, task);
    }

    createGenerator(source, func, task) {
        // Заглушка, пока нет 11 файла
        // return new WordXmlGenerator(source, func, task);
        return null; 
    }
}