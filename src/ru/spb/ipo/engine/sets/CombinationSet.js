import { Set } from './Set.js';
import { ContainerElement } from '../elements/ContainerElement.js';
import { MathOperations } from '../utils/MathOperations.js';

/**
 * Класс, представляющий множество всех сочетаний из элементов другого множества.
 * Аналог ru.spb.ipo.engine.sets.CombinationSet
 */
export class CombinationSet extends Set {

    /**
     * @param {Set} set - Исходное множество
     * @param {number} k - Размер сочетания
     */
    constructor(set, k) {
        super();
        this.set = set;
        this.k = k;
        
        const n = set.size();
        // Вычисляем количество сочетаний C(n, k)
        this._size = MathOperations.combinations(n, k);
    }

    size() {
        return this._size;
    }

    /**
     * Возвращает итератор сочетаний.
     * В JS реализовано через генератор для удобства.
     */
    *getIterator() {
        const n = this.set.size();
        const k = this.k;

        if (k > n || k < 0) return;

        // Массив индексов для генерации сочетаний
        let combination = Array.from({ length: k }, (_, i) => i);

        while (true) {
            // Превращаем индексы в ContainerElement с реальными элементами
            const elements = combination.map(idx => this.set.getElement(idx + 1));
            yield new ContainerElement(elements);

            // Поиск следующего сочетания
            let i = k - 1;
            while (i >= 0 && combination[i] === n - k + i) {
                i--;
            }

            if (i < 0) break;

            combination[i]++;
            for (let j = i + 1; j < k; j++) {
                combination[j] = combination[i] + j - i;
            }
        }
    }

    /**
     * Метод для сброса итератора (в стиле Java итератора из оригинала)
     */
    getJavaLikeIterator() {
        const self = this;
        let index = 0;
        const it = this.getIterator();

        return {
            next() {
                if (!this.hasNext()) return null;
                index++;
                return it.next().value;
            },
            hasNext() {
                return index < self._size;
            },
            reset() {
                index = 0;
                // В JS генератор нельзя сбросить, нужно создавать новый
            }
        };
    }
}