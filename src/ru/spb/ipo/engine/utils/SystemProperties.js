/**
 * Класс для хранения системных настроек и конфигураций.
 * Аналог ru.spb.ipo.engine.utils.SystemProperties
 */
export class SystemProperties {
    // Константы ключей
    static REMOTE_HOST = "remoteHost";
    static RMI_PORT = "port";
    static PROXY_CLASS = "proxyClass";
    static SYSTEM_NAME = "WiseTasks";
    static IS_APPLET = "isApplet";
    static NEED_LOGIN = "needLogin";
    static ENV = "env";

    // Внутреннее хранилище настроек
    static #properties = new Map([
        [SystemProperties.REMOTE_HOST, "localhost"],
        [SystemProperties.RMI_PORT, "5001"],
        [SystemProperties.PROXY_CLASS, "ru.spb.ipo.engine.rmi.ServerImpl"],
        [SystemProperties.IS_APPLET, "false"],
        [SystemProperties.SYSTEM_NAME, "turtle"]
    ]);

    /**
     * Получить значение по ключу
     * @param {string} key 
     */
    static get(key) {
        return this.#properties.get(key);
    }

    /**
     * Установить значение
     * @param {string} key 
     * @param {any} value 
     */
    static put(key, value) {
        this.#properties.set(key, value);
        return value;
    }

    /**
     * Получить строку подключения (аналог RMI connection string)
     */
    static getConnectionString() {
        return this.getClientConnectionString();
    }

    /**
     * Получить клиентскую строку подключения
     */
    static getClientConnectionString() {
        const host = "192.168.1.2"; // В оригинале захардкожено
        const port = this.get(this.RMI_PORT);
        const name = this.get(this.SYSTEM_NAME);
        const conn = `rmi://${host}:${port}/${name}`;
        
        console.log(conn);
        return conn;
    }

    /**
     * Получить булево значение из строки
     * @param {string} key 
     */
    static getBooleanFromString(key) {
        const val = this.#properties.get(key);
        return val === "true" || val === true;
    }

    /**
     * Получить строковое значение
     * @param {string} key 
     */
    static getString(key) {
        return String(this.#properties.get(key));
    }
}