/**
 * Интерфейс (базовый класс) для доступа к файлам.
 * Аналог ru.spb.ipo.engine.utils.file.FileAccessor
 */
export class FileAccessor {

    /**
     * Получить поток данных/содержимое файла
     * @param {string} fileName 
     * @returns {Promise<ReadableStream|string>}
     */
    async getInputStream(fileName) {
        throw new Error("Метод getInputStream должен быть реализован");
    }

    /**
     * Получить список файлов в директории с фильтром
     * @param {string} dirName 
     * @param {string} filter 
     * @returns {Promise<string[]>}
     */
    async list(dirName, filter) {
        throw new Error("Метод list должен быть реализован");
    }

    /**
     * Получить URL или объект изображения
     * @param {string} fileName 
     * @returns {string|null}
     */
    getIcon(fileName) {
        throw new Error("Метод getIcon должен быть реализован");
    }

    /**
     * Получить список строк из потока (вспомогательный метод)
     * @param {ReadableStream|string} is 
     * @returns {Promise<string[]>}
     */
    async listFromStream(is) {
        throw new Error("Метод listFromStream должен быть реализован");
    }
}