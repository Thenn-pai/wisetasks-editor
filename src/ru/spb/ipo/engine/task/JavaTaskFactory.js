import { ClientTaskImpl } from './ClientTaskImpl.js';
// Заглушки для будущих импортов, когда мы перенесем эти файлы
// import { ServerTaskImpl } from './ServerTaskImpl.js';
// import { XmlTaskImpl } from './XmlTaskImpl.js';

/**
 * Фабрика для создания объектов задач.
 * Аналог ru.spb.ipo.engine.task.JavaTaskFactory
 */
export class JavaTaskFactory {

    /**
     * Создает серверную часть задачи
     * @param {string} taskFile - путь к файлу
     * @param {number} problemId 
     */
    async createServerTask(taskFile, problemId) {
        // В будущем здесь будет: return new ServerTaskImpl(taskFile, problemId, this);
        console.log("Создание ServerTask для:", taskFile);
        return null; 
    }

    /**
     * Создает клиентскую часть задачи
     */
    createClientTask(title, description, genParams, problemId, buttons) {
        return new ClientTaskImpl(title, description, genParams, problemId, buttons);
    }

    /**
     * Создает задачу на основе XML
     * @param {string} fileName 
     */
    async createXmlTask(fileName) {
        // В будущем здесь будет: return new XmlTaskImpl(fileName);
        console.log("Создание XmlTask из:", fileName);
        return null;
    }
}