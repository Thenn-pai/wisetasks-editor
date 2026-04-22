import { TaskDeserializationException } from './TaskDeserializationException.js';

/**
 * Исключение, связанное с ошибками в XML-структуре задачи.
 *
 */
export class XmlException extends TaskDeserializationException {
    /**
     * @param {string} message - Сообщение об ошибке
     * @param {Error|null} cause - Исходная причина (опционально)
     *
     */
    constructor(message, cause = null) {
        super(message, cause);
        this.name = "XmlException";
    }
}