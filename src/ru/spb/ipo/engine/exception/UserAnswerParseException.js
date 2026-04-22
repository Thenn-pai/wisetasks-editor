/**
 * Исключение при ошибках разбора ответа пользователя.
 *
 */
export class UserAnswerParseException extends Error {
    constructor(message, cause = null) {
        super(message);
        this.name = "UserAnswerParseException";
        this.cause = cause;
    }
}