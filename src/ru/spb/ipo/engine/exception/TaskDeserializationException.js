/**
 * Исключение при разборе задачи.
 *
 */
export class TaskDeserializationException extends Error {
    constructor(message, cause = null) {
        super(message);
        this.name = "TaskDeserializationException";
        this.cause = cause;
    }
}