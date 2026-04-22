import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';

export class WordSet extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        this.alphabit = []; // Список букв алфавита
        this.naborSize = "3"; // Длина слова
        this.tokenInput = ""; // Поле ввода новой буквы
    }

    addToken() {
        if (this.tokenInput && this.tokenInput.trim() !== "") {
            this.alphabit.push(this.tokenInput.trim());
            // Сортировка алфавита, как в Java
            this.alphabit.sort(); 
            this.tokenInput = "";
        }
    }

    clear() {
        this.alphabit = [];
    }

    getAlphabit() {
        return this.alphabit;
    }

    fillMaps(source, func, task) {
        source.nabor = this.naborSize;
        task.alphabit = this.alphabit.join(", ");
    }
}