/**
 * Интерфейс (базовый класс) для представления задачи на стороне клиента.
 * Аналог ru.spb.ipo.engine.task.ClientTask
 */
export class ClientTask {
    constructor() {
        this.answer = "";
        this.images = [];
    }

    /** @returns {string} Текстовое описание задачи */
    getDescription() {
        return "";
    }

    /** @returns {Object} Параметры генерации задачи */
    getGenParams() {
        return {};
    }

    /** @returns {string} Текущий введенный ответ */
    getAnswer() {
        return this.answer;
    }

    /** @param {string} answer Установить ответ пользователя */
    setAnswer(answer) {
        this.answer = answer;
    }

    /** @returns {string} Заголовок задачи */
    getTitle() {
        return "";
    }

    /** @returns {number} Уникальный ID задачи */
    getProblemId() {
        return 0;
    }

    /** @returns {string[]} Список названий кнопок для вставки параметров */
    getParameterButtons() {
        return [];
    }

    /** @returns {string[]} Список путей к изображениям (вместо Java Icon) */
    getImages() {
        return this.images;
    }

    /** @param {string[]} images Установить список изображений */
    setImages(images) {
        this.images = images;
    }
}