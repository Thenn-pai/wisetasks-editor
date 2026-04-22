/**
 * Интерфейс (базовый класс) для доступа к данным конкурсов и задач.
 * Аналог ru.spb.ipo.engine.rmi.ContestProblemAccessor
 * @interface
 */
export class ContestProblemAccessor {

    /**
     * Возвращает название конкурса по его ID.
     * @param {number} contestId 
     * @returns {string}
     */
    getContestName(contestId) {
        throw new Error("Метод getContestName() не реализован");
    }

    /**
     * Возвращает список всех доступных конкурсов.
     * @returns {Promise<ContestProxy[]>}
     */
    async getContestList() {
        throw new Error("Метод getContestList() не реализован");
    }

    /**
     * Возвращает список задач для конкретного конкурса.
     * @param {number} contestId 
     * @returns {Promise<ProblemProxy[]>}
     */
    async getProblemList(contestId) {
        throw new Error("Метод getProblemList() не реализован");
    }

    /**
     * Загружает и возвращает серверную часть задачи.
     * @param {number} contestId 
     * @param {number} problemId 
     * @returns {Promise<ServerTask>}
     */
    async getProblem(contestId, problemId) {
        throw new Error("Метод getProblem() не реализован");
    }

    /**
     * Возвращает полный путь к файлу задачи.
     * @param {number} contestId 
     * @param {number} problemId 
     * @returns {string}
     */
    getFullFileName(contestId, problemId) {
        throw new Error("Метод getFullFileName() не реализован");
    }
}