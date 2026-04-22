/**
 * Класс-песочница для хранения контекста задачи при проверке.
 * Аналог Java-класса ru.spb.ipo.engine.verifiers.VerifySandbox
 */
export class VerifySandbox {
    /**
     * @param {ClientTask} clientTask - Экземпляр задачи клиента
     */
    constructor(clientTask) {
        this.clientTask = clientTask;
    }
}