/**
 * Класс для загрузки и хранения списка доступных конкурсов.
 * Аналог ru.spb.ipo.engine.rmi.Contests
 */
export class Contests {

    constructor() {
        this.titles = [];
        this.files = [];
    }

    /**
     * Загружает конфигурацию из tests.xml
     * @param {string} baseUrl - Базовый путь к ресурсам
     */
    async init(baseUrl = "./") {
        try {
            // В Java использовался FileAccessUtil.getInputStream("tests.xml")
            const response = await fetch(`${baseUrl}tests.xml`);
            if (!response.ok) {
                throw new Error(`Не удалось загрузить tests.xml: ${response.statusText}`);
            }
            
            const xmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(xmlText, "text/xml");
            
            const nl = doc.getElementsByTagName("test");
            const length = nl.length;
            
            this.titles = new Array(length);
            this.files = new Array(length);
            
            for (let i = 0; i < length; i++) {
                const item = nl[i];
                this.titles[i] = item.getAttribute("title");
                // В Java: getNamedItem("folder"), в JS проще через getAttribute
                this.files[i] = item.getAttribute("folder");
            }
        } catch (e) {
            console.error("Ошибка при разборе файла с задачниками: tests.xml", e);
            throw new Error(`Ошибка при разборе файла с задачниками: tests.xml: \n${e.message}`);
        }
    }

    /**
     * @returns {string[]} Список названий конкурсов
     */
    getTitles() {
        return this.titles;
    }

    /**
     * Возвращает имя папки (файла) для конкретного конкурса.
     * @param {number} i - Индекс конкурса
     * @returns {string}
     */
    getFile(i) {
        return this.files[i];
    }
}