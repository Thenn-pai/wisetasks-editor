/**
 * Логика окна результатов.
 *
 */
export class ResultDialog {
    constructor(tableModel) {
        this.model = tableModel; // Данные таблицы
    }

    // В вебе мы просто возвращаем данные, которые пойдут в <table>
    getData() {
        return this.model; 
    }
}