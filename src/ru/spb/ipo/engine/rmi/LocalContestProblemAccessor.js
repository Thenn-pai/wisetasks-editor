import { ProblemProxy } from './ProblemProxy.js';
import { ContestProxy } from './ContestProxy.js';

/**
 * Класс для доступа к локальным файлам конкурсов и задач.
 * Аналог ru.spb.ipo.engine.rmi.LocalContestProblemAccessor
 */
export class LocalContestProblemAccessor {

    constructor() {
        this.problemsperContest = new Map();
        this.contests = null; // Будет объектом с методами getTitles, getFile и т.д.
        this.factory = null;  // TaskFactory
        this.baseUrl = "./tasks/"; // Базовый путь к папке с задачами
    }

    /**
     * Загружает список конкурсов.
     * @returns {Promise<ContestProxy[]>}
     */
    async getContestList() {
        if (!this.contests) {
            await this._loadContestsConfig();
        }

        const titles = this.contests.getTitles();
        const proxies = titles.map((title, index) => new ContestProxy(title, index));
        return proxies;
    }

    /**
     * Загружает список задач для конкретного конкурса.
     * @param {number} contestId 
     * @returns {Promise<ProblemProxy[]>}
     */
    async getProblemList(contestId) {
        if (this.problemsperContest.has(contestId)) {
            return this.problemsperContest.get(contestId);
        }

        if (!this.contests) await this._loadContestsConfig();

        const contestFile = this.contests.getFile(contestId);
        const url = `${this.baseUrl}${contestFile}/problems.xml`;

        try {
            const response = await fetch(url);
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
            
            const problemNodes = xmlDoc.getElementsByTagName("problem");
            const proxies = [];

            for (let i = 0; i < problemNodes.length; i++) {
                const title = problemNodes[i].getAttribute("title");
                proxies.push(new ProblemProxy(title, i));
            }

            // Сортировка по названию, как в оригинале
            proxies.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));

            this.problemsperContest.set(contestId, proxies);
            return proxies;
        } catch (e) {
            console.error("Ошибка при загрузке списка задач:", e);
            return [];
        }
    }

    /**
     * Возвращает название конкурса.
     */
    getContestName(contestId) {
        return this.contests ? this.contests.getTitles()[contestId] : "Unknown";
    }

    /**
     * Получает полный путь к файлу задачи.
     */
    getFullFileName(contestId, problemId) {
        const problems = this.problemsperContest.get(contestId);
        if (!problems) return "";
        
        const fileName = problems[problemId].getTitle();
        return `${this.contests.getFile(contestId)}/${fileName}`;
    }

    /**
     * Загружает саму задачу через фабрику.
     */
    async getProblem(contestId, problemId) {
        const filePath = this.getFullFileName(contestId, problemId);
        if (!this.factory) {
            const { TaskFactory } = await import('../task/TaskFactory.js');
            this.factory = new TaskFactory();
        }
        return await this.factory.createServerTask(filePath, problemId);
    }

    /**
     * Вспомогательный метод для загрузки общего конфига конкурсов.
     * @private
     */
    async _loadContestsConfig() {
        // Здесь должна быть логика загрузки файла со списком конкурсов
        // В JS реализации это обычно JSON или XML
        this.contests = {
            getTitles: () => ["Демонстрационный конкурс"],
            getFile: (id) => "demo"
        };
    }
}