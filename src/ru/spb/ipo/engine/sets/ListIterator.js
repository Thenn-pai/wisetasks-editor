/**
 * Итератор для работы со списками (массивами) элементов.
 * Поддерживает возможность сброса (reset).
 * Аналог ru.spb.ipo.engine.sets.ListIterator
 */
export class ListIterator {
    /**
     * @param {Array} list - Массив элементов
     */
    constructor(list) {
        this.list = list;
        this.index = 0;
    }

    /**
     * Проверяет, есть ли следующий элемент
     * @returns {boolean}
     */
    hasNext() {
        return this.index < this.list.length;
    }

    /**
     * Возвращает следующий элемент и сдвигает указатель
     * @returns {any|null}
     */
    next() {
        if (!this.hasNext()) {
            return null;
        }
        return this.list[this.index++];
    }

    /**
     * Сбрасывает итератор в начало списка
     */
    reset() {
        this.index = 0;
    }
}