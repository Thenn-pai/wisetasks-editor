/**
 * Логика выбора тестов.
 *
 */
export class TestsDialog {
    constructor(myTests) {
        this.myTests = myTests; // Массив объектов ContestProxy
    }

    /**
     * Возвращает список названий для отрисовки в UI
     *
     */
    getTestsList() {
        return this.myTests.map((test, index) => `${index + 1}. ${test.getTitle()}`);
    }

    /**
     * Вызывается при выборе теста (двойной клик в Java)
     *
     */
    selectTest(index) {
        if (index >= 0 && index < this.myTests.length) {
            const testId = this.myTests[index].getId();
            // Вызываем логику выбора через Actions
            globalThis.client.getActions().testSelected(testId);
        }
    }
}