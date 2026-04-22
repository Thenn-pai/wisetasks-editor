import { WordFPanel } from './WordFPanel.js';

export class IndexFPanel extends WordFPanel {
    constructor(gen) {
        super(gen);
        this.word = ""; // Слово для индексации
    }

    getWord() {
        return this.word;
    }
}