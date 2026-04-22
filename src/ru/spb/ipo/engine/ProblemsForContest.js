/**
 * Класс для управления списком задач конкретного конкурса (задачника).
 * Аналог Java-класса ru.spb.ipo.engine.ProblemsForContest
 */
export class ProblemsForContest {
    // Статический кэш для хранения экземпляров ProblemsForContest по ID конкурса
    // Аналог private static Map contestMap в Java
    static #contestMap = new Map();

    constructor(contestId, accessor) {
        this.contestId = contestId;
        this.accessor = accessor;
        this.problemProxies = []; // Список прокси-объектов задач
        this.serverTasks = new Map(); // Кэш загруженных задач (id -> task)
    }

    /**
     * Инициализация списка задач.
     * В JS мы делаем это асинхронно, заменяя конструкторную логику Java.
     */
    async init() {
        try {
            // accessor — это наш API-клиент (вместо RMI)
            this.problemProxies = await this.accessor.getProblemList(this.contestId);
        } catch (e) {
            throw new Error(`Не могу составить список задач для ${this.contestId}: ${e.message}`);
        }
    }

    /**
     * Возвращает список доступных задач (прокси)
     * @returns {Array}
     */
    getProblemList() {
        return this.problemProxies;
    }

    /**
     * Получает полную информацию о задаче по ID.
     * Реализует логику кэширования (Lazy Loading).
     * @param {number|string} id 
     */
    async getProblem(id) {
        // Проверяем, есть ли задача в локальном кэше
        if (this.serverTasks.has(id)) {
            return this.serverTasks.get(id);
        }

        // Если нет — запрашиваем у сервера (accessor)
        try {
            const task = await this.accessor.getProblem(this.contestId, id);
            this.serverTasks.set(id, task);
            return task;
        } catch (e) {
            throw new Error(`Ошибка загрузки задачи ${id}: ${e.message}`);
        }
    }

    /**
     * Статический метод для получения (или создания) менеджера задач конкурса.
     * Аналог public static ProblemsForContest getProblemsPerContest в Java.
     */
    static async getProblemsPerContest(contestId, accessor) {
        if (!this.#contestMap.has(contestId)) {
            const problems = new ProblemsForContest(contestId, accessor);
            await problems.init();
            this.#contestMap.set(contestId, problems);
        }
        return this.#contestMap.get(contestId);
    }
}