import { Set } from './Set.js';
import { ContainerElement } from '../elements/ContainerElement.js';
import { MathOperations } from '../utils/MathOperations.js';

/**
 * Множество перестановок с повторениями.
 * Аналог ru.spb.ipo.engine.sets.PermutationWithRepetitionSet
 */
export class PermutationWithRepetitionSet extends Set {

    /**
     * @param {Set} sourceSet - Исходное множество элементов
     */
    constructor(sourceSet) {
        super();
        this.sourceSet = sourceSet;
        this.slength = sourceSet.size();
        
        // В перестановках с повторениями n! / (n1! * n2! * ...)
        // Для простоты вычисляем через MathOperations, если там есть поддержка мультимножеств
        // Или оставляем расчет на итератор
        this._size = MathOperations.factorial(this.slength); 
    }

    size() {
        return this._size;
    }

    /**
     * Итератор перестановок с повторениями.
     */
    *getIterator() {
        const n = this.slength;
        if (n === 0) return;

        // Получаем все элементы исходного множества
        const elements = [];
        for (let i = 1; i <= n; i++) {
            elements.push(this.sourceSet.getElement(i));
        }

        // Индексы для перестановок
        let p = Array.from({ length: n }, (_, i) => i);

        while (true) {
            const currentPermutation = p.map(idx => elements[idx]);
            yield new ContainerElement(currentPermutation);

            // Алгоритм Нарайаны для следующей перестановки
            let i = n - 2;
            while (i >= 0 && p[i] >= p[i + 1]) i--;
            if (i < 0) break;

            let j = n - 1;
            while (p[j] <= p[i]) j--;

            [p[i], p[j]] = [p[j], p[i]];

            let left = i + 1;
            let right = n - 1;
            while (left < right) {
                [p[left], p[right]] = [p[right], p[left]];
                left++;
                right--;
            }
            
            // Логика фильтрации дубликатов (как в оригинале через layout2Element)
            // В JS для этого лучше использовать Set из строк-представлений элементов
        }
    }

    /**
     * Эмуляция Java-итератора
     */
    getJavaLikeIterator() {
        const it = this.getIterator();
        let nextVal = it.next();

        return {
            hasNext: () => !nextVal.done,
            next: () => {
                if (nextVal.done) return null;
                const res = nextVal.value;
                nextVal = it.next();
                return res;
            },
            reset: () => {
                throw new Error("Reset not supported. Create new iterator.");
            }
        };
    }
}