/**
 * Структура ключ-значение.
 *
 */
export class KeyValue {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    getValue() {
        return String(this.value);
    }

    getObject() {
        return this.value;
    }

    getKey() {
        return this.key;
    }

    equals(obj) {
        if (obj instanceof KeyValue) {
            return this.key === obj.key;
        } else if (typeof obj === 'string') {
            return this.key === obj;
        }
        return false;
    }
}