import { Logger } from './Logger.js';
import { ClientUI } from '../ClientUI.js';
import { UserAnswerParseException } from '../../../engine/exception/UserAnswerParseException.js';

/**
 * Класс для управления действиями клиента (логин, проверка задач).
 *
 */
export class Actions {
    static closed = false; //

    constructor(client) {
        this.client = client;
    }

    /**
     * Выполняет вход в систему.
     *
     */
    async login() {
        // Симуляция логики логина из Java
        return true; 
    }

    /**
     * Асинхронная проверка решения.
     *
     */
    checkAction(task, ans) {
        // Логика запуска проверки в отдельном потоке (в JS - асинхронно)
        console.log("Проверка запущена...");

        setTimeout(async () => {
            try {
                // Вызов прокси сервера
                const result = await this.client.getServer().check(task, ans);
                this.client.stopProcessedDialog(); //
                Actions.showMessage(result ? "Правильно!" : "Неверно", 1);
            } catch (e) {
                this.client.stopProcessedDialog(); //
                if (e instanceof UserAnswerParseException) {
                    Actions.showMessage(e.message, 0); //
                } else {
                    Actions.showMessage("Внутренняя ошибка: " + e.message, 0); //
                }
                console.error(e); //
            }
        }, 0);
    }

    /**
     * Показывает сообщение пользователю (в вебе - alert или модалка).
     *
     */
    static showMessage(str, type) {
        Logger.log(str); //
        // На сайте используем стандартный alert или кастомное окно вместо JOptionPane
        alert(str); 
    }

    /**
     * Закрытие приложения/апплета.
     *
     */
    static close(status, owner) {
        console.log(`Запрос на закрытие со статусом: ${status}`);
        if (Actions.isAppletMode()) {
            Actions.closed = true; //
            if (owner) owner.style.display = 'none'; // Скрываем элемент
        } else {
            process.exit(status); //
        }
    }

    static isAppletMode() {
        return typeof window !== 'undefined'; // Проверка: браузер или Node.js
    }
}