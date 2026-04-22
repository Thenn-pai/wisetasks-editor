import { AbstractFileAccessor } from './AbstractFileAccessor.js';

/**
 * Аксессор для доступа к файлам по сети (аналог работы апплета).
 * В современной версии использует fetch API.
 * Аналог ru.spb.ipo.engine.utils.file.AppletFileAccess
 */
export class AppletFileAccess extends AbstractFileAccessor {

    constructor(baseUrl = "") {
        super();
        this.baseUrl = baseUrl;
        this.lists = new Map(); // Хранилище списков файлов
    }

    /**
     * Получить содержимое файла через fetch
     * @param {string} fileName 
     */
    async getInputStream(fileName) {
        const url = this.baseUrl + this.getSafe(fileName);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.body; // Возвращаем поток (ReadableStream)
    }

    /**
     * Получить список файлов для директории.
     * В оригинале списки кешировались в Map.
     */
    async list(dirName, filter = "") {
        const safeDir = this.getSafe(dirName);
        if (this.lists.has(safeDir)) {
            const currentList = this.lists.get(safeDir);
            return currentList.filter(name => name.toLowerCase().endsWith(filter.toLowerCase()));
        }
        
        // В вебе мы не можем просканировать папку на сервере без API.
        // Поэтому здесь обычно делается запрос к специальному JSON-файлу
        console.warn(`Запрос списка файлов для ${safeDir}. Требуется серверный манифест.`);
        return [];
    }

    /**
     * Получить URL изображения
     */
    getIcon(fileName) {
        return this.baseUrl + this.getSafe(fileName);
    }

    /**
     * Вспомогательный метод для очистки пути (удаление лишних слешей)
     */
    getSafe(path) {
        if (!path) return "";
        let safePath = path.replace(/\\/g, "/");
        if (safePath.startsWith("/")) {
            safePath = safePath.substring(1);
        }
        return safePath;
    }

    getContext() {
        return this.baseUrl;
    }
}