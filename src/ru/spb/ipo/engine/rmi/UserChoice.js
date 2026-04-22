/**
 * Класс для хранения данных о выборе пользователя (текущая задача, конкурс).
 * Аналог ru.spb.ipo.engine.rmi.UserChoice
 */
export class UserChoice {

    /**
     * @param {string} clientId - Идентификатор клиента
     */
    constructor(clientId) {
        this.clientId = clientId;
        this.contestId = 0;
        this.problemId = 0;
        this.contestName = "";
    }

    getContestName() {
        return this.contestName;
    }

    setContestName(contestName) {
        this.contestName = contestName;
    }

    getContestId() {
        return this.contestId;
    }

    setContestId(contestId) {
        this.contestId = contestId;
    }

    getProblemId() {
        return this.problemId;
    }

    setProblemId(problemId) {
        this.problemId = problemId;
    }

    getClientId() {
        return this.clientId;
    }

    setClientId(clientId) {
        this.clientId = clientId;
    }
}