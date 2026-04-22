import { SystemProperties } from './SystemProperties.js';

/**
 * Утилита для доступа к ресурсам (файлам задач, изображениям).
 * Аналог ru.spb.ipo.engine.utils.FileAccessUtil
 */
export class FileAccessUtil {
    static isApplet = false;
    static codeBase = ".";

    /**
     * Инициализация базового пути для загрузки файлов
     * @param {string} path 
     */
    static start(path) {
        this.codeBase = path;
    }

    /**
     * Получить данные файла.
     * В JS возвращает Promise с текстовым содержимым или Blob.
     * @param {string} fileName 
     */
    static async getFileContent(fileName) {
        const url = `${this.codeBase}/${fileName}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка загрузки: ${response.statusText}`);
            return await response.text();
        } catch (e) {
            console.error(`Не удалось прочитать файл ${fileName}:`, e);
            throw e;
        }
    }

    /**
     * Получить URL для изображения
     * @param {string} fileName 
     */
    static getIconUrl(fileName) {
        return `${this.codeBase}/${fileName}`;
    }

    /**
     * Эмуляция получения потока (для совместимости с логикой Java)
     * В вебе мы обычно работаем с Response или текстом.
     */
    static async getInputStream(fileName) {
        const response = await fetch(`${this.codeBase}/${fileName}`);
        return response.body; 
    }

    /**
     * Получение списка файлов в директории.
     * В браузере это сложно (нужен серверный листинг), 
     * поэтому обычно используется заранее сгенерированный JSON.
     */
    static async list(dirName, filter = "") {
        console.warn("Метод list() требует серверной поддержки или JSON-манифеста");
        // В качестве примера возвращаем пустой список
        return [];
    }
}