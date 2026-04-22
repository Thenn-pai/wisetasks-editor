import { ClientUI } from '../ClientUI.js';
import { Actions } from '../utils/Actions.js';
import { FileAccessUtil } from '../../../engine/utils/FileAccessUtil.js';
import { SystemProperties } from '../../../engine/utils/SystemProperties.js';

/**
 * Класс GnomeApplet.
 * Аналог ru.spb.ipo.client.ui.applet.GnomeApplet
 */
export class GnomeApplet {

    constructor() {
        this.clientUI = null;
        this.isStarted = false;
        // В Node.js параметры можно передавать через process.env или аргументы командной строки
        this.parameters = new Map(); 
    }

    /**
     * Симуляция получения параметров апплета
     */
    getParameter(name) {
        return this.parameters.get(name);
    }

    /**
     * Инициализация логики апплета
     */
    async init() {
        try {
            const remote = this.getParameter("remote");
            const useRemoteProxy = remote === 'true';

            if (useRemoteProxy) {
                // Настройка системных свойств для удаленного доступа
                SystemProperties.put(SystemProperties.NEED_LOGIN, "true");
                SystemProperties.put(SystemProperties.PROXY_CLASS, "ru.spb.ipo.engine.rmi.ServerAccessor");
                SystemProperties.put(SystemProperties.IS_APPLET, "true");
            } else {
                // Локальный запуск через утилиты доступа к файлам
                await FileAccessUtil.startApplet(this);
            }

            // Создание экземпляра интерфейса клиента
            const server = await ClientUI.getServer(null);
            this.clientUI = new ClientUI(server);

            console.log("Интерфейс инициализирован успешно");

        } catch (e) {
            // Обработка ошибок инициализации аналогично блокам catch в Java
            Actions.showMessage("Ошибка при инициализации аплета:\n" + e.message, "ERROR_MESSAGE");
            console.error(e);
            Actions.close(1, this);
        }
    }

    /**
     * Запуск процесса аутентификации
     */
    async start() {
        try {
            const loggedIn = await this.clientUI.getActions().login();
            if (!loggedIn) {
                Actions.close(0, this);
            } else {
                // Аналог логики из paint(): запуск тестов после старта
                if (!this.isStarted) {
                    this.isStarted = true;
                    this.clientUI.openTests();
                }
            }
        } catch (e) {
            Actions.showMessage("Ошибка входа в систему:\n" + e.message, "ERROR_MESSAGE");
            console.error(e);
            Actions.close(1, this);
        }
    }
}

// Точка входа для Node.js
if (import.meta.url === `file://${process.argv[1]}`) {
    const applet = new GnomeApplet();
    // Пример установки параметра из аргументов: node GnomeApplet.js remote=true
    const remoteArg = process.argv.find(arg => arg.startsWith('remote='));
    if (remoteArg) {
        applet.parameters.set('remote', remoteArg.split('=')[1]);
    }
    
    applet.init().then(() => applet.start());
}