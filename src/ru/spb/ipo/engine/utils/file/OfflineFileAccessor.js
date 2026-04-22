import { AbstractFileAccessor } from './AbstractFileAccessor.js';

/**
 * Аксессор для доступа к файлам в локальном режиме.
 * Аналог ru.spb.ipo.engine.utils.file.OfflineFileAccessor
 */
export class OfflineFileAccessor extends AbstractFileAccessor {

    constructor(codeBase = ".") {
        super();
        this.codeBase = codeBase;
    }

    /**
     * Установить базовый путь
     * @param {string} codeBase 
     */
    setCodeBase(codeBase) {
        this.codeBase = codeBase;
    }

    /**
     * Получить поток данных (в JS — текст или ReadableStream)
     * @param {string} fileName 
     */
    async getInputStream(fileName) {
        // В браузере используем fetch, в Node.js можно было бы использовать fs.createReadStream
        const response = await fetch(this.getContext() + fileName);
        if (!response.ok) throw new Error(`File not found: ${fileName}`);
        return response.body; 
    }

    /**
     * Получить список файлов в папке (требует серверной реализации или JSON-манифеста)
     */
    async list(dirName, filter = "") {
        dirName = dirName.replace(/\\/g, "/");
        const path = this.getContext() + dirName;
        
        console.warn(`Запрос списка файлов для ${path} с фильтром ${filter}. В JS/Браузере это требует API или манифеста.`);
        
        // Обычно в таких проектах создается статический index.json
        try {
            const response = await fetch(`${path}/index.json`);
            const files = await response.json();
            return files.filter(f => f.toLowerCase().endsWith(filter.toLowerCase()));
        } catch (e) {
            return [];
        }
    }

    /**
     * Получить URL иконки/изображения
     * @param {string} fileName 
     */
    getIcon(fileName) {
        // Просто возвращаем путь, который можно подставить в <img src="...">
        return this.getContext() + fileName;
    }

    /**
     * Формирование базового URL с разделителем
     */
    getContext() {
        return this.codeBase + (this.codeBase.endsWith('/') ? "" : "/");
    }
}