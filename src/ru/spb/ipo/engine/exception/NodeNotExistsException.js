import { XmlException } from './XmlException.js';

/**
 * Исключение, выбрасываемое при отсутствии узла.
 * @extends XmlException
 */
export class NodeNotExistsException extends XmlException {
    constructor(message) {
        super(message);
        this.name = "NodeNotExistsException";
    }
}