/**
 * Базовое системное исключение.
 * @extends Error
 */
export class SystemException extends Error {
    constructor(message, cause = null) {
        super(message);
        this.name = "SystemException";
        this.cause = cause;
    }
}