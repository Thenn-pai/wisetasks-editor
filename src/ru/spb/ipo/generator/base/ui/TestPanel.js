/**
 * Панель управления тестами и задачами.
 *
 */
export class TestPanel {
    constructor() {
        this.tests = [];
        this.tasks = [];
        // По умолчанию папка с задачами
        this.basePath = "./tasks"; 
    }

    /**
     * Создание модели данных для списка.
     * Аналог статического метода createModel
     */
    static createModel(entries) {
        return entries.map(entry => ({
            id: entry.id,
            title: entry.title,
            data: entry
        }));
    }

    /**
     * Логика выбора папки (в вебе это будет выбор директории или ввод пути)
     *
     */
    setDirectory(path) {
        this.basePath = path;
        console.log("Рабочая директория изменена на:", path);
    }
}