/**
 * Интерфейс (базовый класс) для серверной логики задачи.
 * Отвечает за проверку ответов и подготовку данных для клиента.
 * Аналог ru.spb.ipo.engine.task.ServerTask
 */
export class ServerTask {

    /**
     * Проверяет ответ пользователя.
     * @param {ClientTask} clientTask - объект задачи с ответом пользователя
     * @returns {Promise<boolean>} - true, если ответ верный
     */
    async verify(clientTask) {
        throw new Error("Метод verify должен быть реализован");
    }

    /**
     * Возвращает заголовок задачи.
     * @returns {string}
     */
    getTitle() {
        throw new Error("Метод getTitle должен быть реализован");
    }

    /**
     * Создает клиентскую версию задачи (с набором параметров по умолчанию или случайным).
     * @returns {Promise<ClientTask>}
     */
    async getClientTask() {
        throw new Error("Метод getClientTask должен быть реализован");
    }

    /**
     * Создает клиентскую версию задачи с конкретными параметрами.
     * @param {Object} parameters - карта параметров
     * @returns {Promise<ClientTask>}
     */
    async getClientTaskWithParameters(parameters) {
        throw new Error("Метод getClientTaskWithParameters должен быть реализован");
    }
}