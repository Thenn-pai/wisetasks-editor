import { ClientTask } from './ClientTask.js';

/**
 * Реализация данных задачи для клиента.
 * Аналог ru.spb.ipo.engine.task.ClientTaskImpl
 */
export class ClientTaskImpl extends ClientTask {
    /**
     * @param {string} title - Заголовок задачи
     * @param {string} description - Описание/условие задачи
     * @param {Object} genParams - Параметры генерации
     * @param {number} problemId - ID задачи
     * @param {string[]} paramButtons - Список кнопок для вставки параметров
     */
    constructor(title, description, genParams, problemId, paramButtons = []) {
        super();
        this.title = title;
        this.description = description;
        // Замораживаем объект параметров, делая его неизменяемым (аналог unmodifiableMap)
        this.genParams = Object.freeze(genParams || {});
        this.problemId = problemId;
        this.paramButtons = paramButtons || [];
        this.answer = "";
        this.images = [];
    }

    getDescription() {
        return this.description;
    }

    getGenParams() {
        return this.genParams;
    }

    getAnswer() {
        return this.answer;
    }

    setAnswer(answer) {
        this.answer = answer;
    }

    getTitle() {
        return this.title;
    }

    getParameterButtons() {
        return this.paramButtons;
    }

    getImages() {
        return this.images;
    }

    setImages(images) {
        this.images = images;
    }

    getProblemId() {
        return this.problemId;
    }
}