import { XmlException } from './XmlException.js';

/**
 * Исключение: параметр не установлен.
 * Аналог ru.spb.ipo.engine.exception.ParameterNotSetException
 */
export class ParameterNotSetException extends XmlException {
    constructor(message) {
        super(message);
        this.name = "ParameterNotSetException";
    }
}