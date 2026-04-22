import { FileAccessor } from './FileAccessor.js';

/**
 * Базовый абстрактный класс для аксессоров файлов.
 * Содержит общую логику обработки путей и потоков.
 * Аналог ru.spb.ipo.engine.utils.file.AbstractFileAccessor
 */
export class AbstractFileAccessor extends FileAccessor {

    /**
     * Заменяет все обратные слеши на прямые для универсальности путей.
     * @param {string} name 
     * @returns {string}
     */
    getSafe(name) {
        if (!name) return "";
        // Заменяем \ на / 
        return name.replace(/\\/g, "/");
    }

    /**
     * Читает список имен файлов из текстового потока.
     * Используется для получения списка доступных задач (.xml).
     * @param {ReadableStream|string} is 
     * @returns {Promise<string[]>}
     */
    async listFromStream(is) {
        const results = [];
        const filter = ".xml"; // Фильтр для файлов задач 
        let text = "";

        // Если передана строка, используем её, если поток — читаем его полностью
        if (typeof is === 'string') {
            text = is;
        } else if (is && typeof is.getReader === 'function') {
            // Чтение из ReadableStream
            const reader = is.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                if (value) text += decoder.decode(value, { stream: true });
                done = readerDone;
            }
        }

        // Разбиваем текст на строки (аналог BufferedReader.readLine) 
        const lines = text.split(/\r?\n/);
        for (let line of lines) {
            line = line.trim();
            // Проверка расширения файла 
            if (line.toLowerCase().endsWith(filter)) {
                results.push(line); // В JS используем push вместо add 
            }
        }

        return results;
    }
}