/**
 * Утилита для логирования сообщений.
 * Аналог ru.spb.ipo.engine.utils.MyLogger
 */
export class MyLogger {

    /**
     * Возвращает объект для логирования. 
     * В JS возвращаем глобальный объект console или кастомный прокси.
     * @param {string} name 
     */
    static getLogger(name = "root") {
        // В Java это возвращает java.util.logging.Logger
        // В JS мы можем вернуть обертку над консолью с именем
        return {
            info: (msg) => console.log(`[${name}] INFO: ${msg}`),
            error: (msg) => console.error(`[${name}] ERROR: ${msg}`),
            warn: (msg) => console.warn(`[${name}] WARN: ${msg}`)
        };
    }

    /**
     * Простой вывод строки в консоль.
     * Аналог System.out.println(str)
     * @param {string} str 
     */
    static log(str) {
        console.log(str);
    }
}