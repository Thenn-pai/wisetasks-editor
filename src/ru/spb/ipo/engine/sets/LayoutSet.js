import { Set } from './Set.js';
import { ContainerElement } from '../elements/ContainerElement.js';
import { MathOperations } from '../utils/MathOperations.js';

/**
 * Класс, представляющий множество всех размещений (permutation) из n по k.
 * Аналог ru.spb.ipo.engine.sets.LayoutSet
 */
export class LayoutSet extends Set {

    /**
     * @param {Set} set - Исходное множество
     * @param {number} k - Размер размещения
     */
    constructor(set, k) {
        super();
        this.set = set;
        this.llength = k; // k
        this.slength = set.size(); // n
        
        // Количество размещений: A(n, k) = n! / (n-k)!
        this._size = MathOperations.layouts(this.slength, this.llength);
    }

    size() {
        return this._size;
    }

    /**
     * Итератор размещений.
     */
    *getIterator() {
        const n = this.slength;
        const k = this.llength;

        if (k > n || k < 0) return;

        // Текущее сочетание индексов
        let combination = Array.from({ length: k }, (_, i) => i + 1);
        let totalProcessed = 0;

        while (totalProcessed < this._size) {
            // Для каждого сочетания генерируем все перестановки
            let layout = Array.from({ length: k }, (_, i) => i + 1);
            let factK = MathOperations.factorial(k);

            for (let p = 0; p < factK; p++) {
                const elements = layout.map(idx => this.set.getElement(combination[idx - 1]));
                yield new ContainerElement(elements);
                totalProcessed++;

                if (totalProcessed >= this._size) break;
                this._nextLayout(layout);
            }

            if (totalProcessed < this._size) {
                this._nextCombination(combination, n, k);
            }
        }
    }

    /**
     * Генерация следующей перестановки (алгоритм Нарайаны)
     * @private
     */
    _nextLayout(layout) {
        let i = layout.length - 2;
        while (i >= 0 && layout[i] >= layout[i + 1]) i--;
        if (i < 0) return false;

        let j = layout.length - 1;
        while (layout[j] <= layout[i]) j--;

        [layout[i], layout[j]] = [layout[j], layout[i]];

        let left = i + 1;
        let right = layout.length - 1;
        while (left < right) {
            [layout[left], layout[right]] = [layout[right], layout[left]];
            left++;
            right--;
        }
        return true;
    }

    /**
     * Генерация следующего сочетания
     * @private
     */
    _nextCombination(comb, n, k) {
        let i = k - 1;
        while (i >= 0 && comb[i] === n - k + i + 1) i--;
        if (i < 0) return false;

        comb[i]++;
        for (let j = i + 1; j < k; j++) {
            comb[j] = comb[i] + j - i;
        }
        return true;
    }

    /**
     * Эмуляция Java-итератора
     */
    getJavaLikeIterator() {
        const it = this.getIterator();
        let current = null;
        let done = false;

        return {
            hasNext: () => !done,
            next: () => {
                const res = it.next();
                if (res.done) {
                    done = true;
                    return null;
                }
                return res.value;
            },
            reset: () => {
                // В JS нужно создавать новый генератор
                throw new Error("Reset not implemented for generators. Create a new iterator.");
            }
        };
    }
}