/**
 * Интерфейс сервера. Описывает основные методы для работы с конкурсами и задачами.
 * Аналог ru.spb.ipo.engine.rmi.Server
 * @interface
 */
export class Server {

    /**
     * Возвращает список доступных конкурсов.
     * @returns {Promise<ContestProxy[]>}
     */
    async getContestList() {
        throw new Error("Метод getContestList() не реализован");
    }

    /**
     * Возвращает список задач для конкретного выбора пользователя.
     * @param {UserChoice} userChoice 
     * @returns {Promise<ProblemProxy[]>}
     */
    async getProblemList(userChoice) {
        throw new Error("Метод getProblemList() не реализован");
    }

    /**
     * Проверяет решение пользователя.
     * @param {UserChoice} userChoice 
     * @param {ClientTask} clientTask 
     * @returns {Promise<boolean>}
     */
    async verify(userChoice, clientTask) {
        throw new Error("Метод verify() не реализован");
    }

    /**
     * Получает данные задачи (условие, настройки) для клиента.
     * @param {UserChoice} userChoice 
     * @returns {Promise<ClientTask>}
     */
    async getProblem(userChoice) {
        throw new Error("Метод getProblem() не реализован");
    }

    /**
     * Обновляет объект выбора пользователя для конкретного конкурса.
     * @param {UserChoice} userChoice 
     * @param {number} contestId 
     * @returns {Promise<UserChoice>}
     */
    async getUC(userChoice, contestId) {
        throw new Error("Метод getUC() не реализован");
    }

    /**
     * Авторизация пользователя.
     * @param {string} login 
     * @param {string} password 
     * @returns {Promise<UserChoice>}
     */
    async authorize(login, password) {
        throw new Error("Метод authorize() не реализован");
    }
}