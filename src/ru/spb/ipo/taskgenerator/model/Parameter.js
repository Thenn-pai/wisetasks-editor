import { Element } from './Element.js';
import { Config } from '../config/Config.js';
import { KeyValue } from './KeyValue.js';

/**
 * Элемент-параметр.
 *
 */
export class Parameter extends Element {
    constructor() {
        super(Config.TYPE_PARAM); // Используем константу из папки config
        this.parameters = []; // Аналог ArrayList
    }

    getText() {
        return super.getText();
        // Закомментированный код из Java-версии опущен для чистоты
    }

    setText(text) {
        if (!text || text.trim() === "") {
            return;
        }
        throw new Error("UnsupportedOperationException");
    }

    getValues() {
        return this.parameters;
    }

    addValue(value, description) {
        this.parameters.push(new KeyValue(value, description));
    }
}