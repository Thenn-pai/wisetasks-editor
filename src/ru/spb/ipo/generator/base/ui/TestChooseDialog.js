/**
 * Диалог выбора сборника для сохранения.
 *
 */
export class TestChooseDialog {
    constructor() {
        this.result = null; // Выбранный ListIdEntry
    }

    /**
     * Логика выбора элемента из списка
     *
     */
    select(entry) {
        this.result = entry;
        console.log("Выбран сборник для сохранения:", entry.title);
    }

    getResult() {
        return this.result;
    }
}