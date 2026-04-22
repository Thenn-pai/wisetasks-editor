import { UserChoice } from './UserChoice.js';
import { LocalContestProblemAccessor } from './LocalContestProblemAccessor.js';
// Припускаємо, що ProblemsForContest буде реалізований пізніше
// import { ProblemsForContest } from '../ProblemsForContest.js';


export class ServerImpl {

    /**
     * @param {ContestProblemAccessor} [accessor] - Аксесор для доступу до даних
     */
    constructor(accessor = null) {
        // У Java конструктор за замовчуванням створював LocalContestProblemAccessor
        this.accessor = accessor || new LocalContestProblemAccessor();
    }

    /**
     * Повертає список доступних конкурсів.
     * @returns {Promise<ContestProxy[]>}
     */
    async getContestList() {
        return await this.accessor.getContestList();
    }

    /**
     * Повертає список задач для обраного конкурсу.
     * @param {UserChoice} uc 
     * @returns {Promise<ProblemProxy[]>}
     */
    async getProblemList(uc) {
        // Логіка делегується статичному методу ProblemsForContest
        const pPerContest = await this._getProblemsPerContest(uc.getContestId());
        return pPerContest.getProbelmList();
    }

    /**
     * Перевіряє відповідь користувача.
     * @param {UserChoice} uc 
     * @param {ClientTask} ct 
     * @returns {Promise<boolean>}
     */
    async verify(uc, ct) {
        const pPerContest = await this._getProblemsPerContest(uc.getContestId());
        const problem = pPerContest.getProblem(uc.getProblemId());
        return await problem.verify(ct);
    }

    /**
     * Отримує дані задачі для клієнта.
     * @param {UserChoice} uc 
     * @returns {Promise<ClientTask>}
     */
    async getProblem(uc) {
        const pPerContest = await this._getProblemsPerContest(uc.getContestId());
        const problem = pPerContest.getProblem(uc.getProblemId());
        return await problem.getClientTask();
    }

    /**
     * Оновлює об'єкт UserChoice даними конкурсу.
     * @param {UserChoice} userChoice 
     * @param {number} contestId 
     * @returns {UserChoice}
     */
    getUC(userChoice, contestId) {
        userChoice.setContestId(contestId);
        userChoice.setContestName(this.accessor.getContestName(contestId));
        return userChoice;
    }

    /**
     * Авторизація користувача (спрощена версія).
     * @param {string} login 
     * @param {string} password 
     * @returns {Promise<UserChoice>}
     */
    async authorize(login, password) {
        // Повертає новий об'єкт UserChoice з логіном як clientId
        return new UserChoice(login);
    }

    /** @returns {ContestProblemAccessor} */
    getAccessor() {
        return this.accessor;
    }

    /**
     * Внутрішній допоміжний метод для отримання задач конкурсу.
     * @private
     */
    async _getProblemsPerContest(contestId) {
        // В оригіналі: ProblemsForContest.getProblemsPerContest(id, accessor)
        // Для JS робимо динамічний імпорт, щоб уникнути циклічних залежностей
        const { ProblemsForContest } = await import('../ProblemsForContest.js');
        return ProblemsForContest.getProblemsPerContest(contestId, this.accessor);
    }
}