import { Actions } from './utils/Actions.js';
import { Logger } from './utils/Logger.js';
import { SystemProperties } from '../../engine/utils/SystemProperties.js';

/**
 * Основной контроллер интерфейса клиента.
 *
 */
export class ClientUI {
    static client = null;

    constructor(server) {
        this.server = server;
        this.actions = new Actions(this);
        ClientUI.client = this;
        
        // Состояние процесса (аналог JProgressBar / JDialog)
        this.isProcessing = false;
        this.progressValue = 0;
        
        // Хранилище для текущей задачи и набора задач
        this.currentProblem = null;
        this.currentContest = null;

        console.log("ClientUI: Система инициализирована.");
    }

    /**
     * Возвращает экземпляр сервера
     */
    getServer() {
        return this.server;
    }

    /**
     * Возвращает объект действий
     */
    getActions() {
        return this.actions;
    }

    /**
     * Установка прогресса выполнения (аналог setProcessed)
     */
    setProcessed(finished) {
        this.progressValue = Math.floor(100 * finished);
        console.log(`Прогресс: ${this.progressValue}%`);
    }

    /**
     * Логика открытия окна ожидания
     */
    startProcessedDialog() {
        this.isProcessing = true;
        // В вебе здесь можно включать overlay/spinner
        console.log("ClientUI: Запущен процесс проверки...");
    }

    /**
     * Остановка окна ожидания
     */
    stopProcessedDialog() {
        this.isProcessing = false;
        this.progressValue = 0;
        console.log("ClientUI: Процесс завершен.");
    }

    /**
     * Статический метод для обработки ошибок соединения
     */
    static proxyError(e) {
        console.error("Ошибка соединения:", e);
        Actions.showMessage("Ошибка соединения:\n" + e.message, 0); // JOptionPane.ERROR_MESSAGE -> 0
        // Вместо System.exit в браузере ничего не делаем или редиректим
    }

    /**
     * Заглушка для получения контент-панели
     */
    getContentPane() {
        // В вебе это может быть ссылка на корневой DOM-элемент
        return null; 
    }
}