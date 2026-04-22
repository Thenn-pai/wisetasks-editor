import { TestPanel } from './TestPanel.js';

/**
 * Редактор сборников задач.
 *
 */
export class CollectionEditor {
    constructor() {
        this.title = "Редактор сборников задач";
        // В Java здесь создавался новый TestPanel
        this.panel = new TestPanel();
    }

    init() {
        console.log(`${this.title} инициализирован`);
    }
}