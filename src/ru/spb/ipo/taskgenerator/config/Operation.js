import { Config } from './Config.js';

/**
 * Битовые операции для прав и настроек.
 *
 */
export class Operation {
    constructor() {
        this.name = null;
        this.ops = 0;
    }

    setOperation(name) {
        try {
            // Замена Java-рефлексии на прямое обращение к свойству класса в JS
            const val = Config[name];
            if (val !== undefined) {
                this.ops |= val;
            }
        } catch (e) {
            console.error(e);
        }
    }

    getInt() {
        return this.ops;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    setSuper(name) {
        this.ops = this.ops | Config.getOperation(name);
    }
}