/**
 * Исключение аутентификации.
 * Аналог ru.spb.ipo.engine.exception.AuthentificationException
 */
export class AuthentificationException extends Error {
    constructor(cause) {
        // Принимает сообщение об ошибке или объект исключения
        super(cause instanceof Error ? cause.message : cause);
        this.name = "AuthentificationException";
        this.cause = cause;
    }
}