import { Set } from './Set.js';
import { ContainerElement } from '../elements/ContainerElement.js';

/**
 * Класс, представляющий декартово произведение n множеств.
 * Аналог ru.spb.ipo.engine.sets.DecartSet
 */
export class DecartSet extends Set {

    /**
     * @param {Set[]} sets - Массив исходных множеств
     */
    constructor(sets) {
        super();
        this.sets = sets;
        this.setsNumber = sets.length;
        
        // Вычисляем размер как произведение размеров всех подмножеств
        this._size = 1;
        for (let i = 0; i < this.setsNumber; i++) {
            this._size *= sets[i].size();
        }
    }

    size() {
        return this._size;
    }

    /**
     * Итератор декартова произведения.
     * Реализовано через рекурсивный генератор или вложенные циклы.
     */
    *getIterator() {
        if (this.setsNumber === 0) return;

        // Внутренняя рекурсивная функция для обхода всех множеств
        const self = this;
        function* generate(setIndex, currentElements) {
            if (setIndex === self.setsNumber) {
                // Все множества пройдены, возвращаем готовую комбинацию
                yield new ContainerElement([...currentElements]);
                return;
            }

            const currentSet = self.sets[setIndex];
            // Используем итератор текущего множества
            for (const element of currentSet.getIterator()) {
                currentElements.push(element);
                yield* generate(setIndex + 1, currentElements);
                currentElements.pop(); // Откат для следующей итерации
            }
        }

        yield* generate(0, []);
    }

    /**
     * Эмуляция Java-итератора из оригинала (с методом reset)
     */
    getJavaLikeIterator() {
        const iterators = this.sets.map(s => s.getJavaLikeIterator());
        const setsCount = this.setsNumber;
        let last = new Array(setsCount);
        let beforeFirst = true;
        let hasMore = this._size > 0;

        return {
            hasNext: () => hasMore,
            
            next: () => {
                if (!hasMore) return null;

                const elms = new Array(setsCount);

                if (beforeFirst) {
                    beforeFirst = false;
                    for (let i = 0; i < setsCount; i++) {
                        elms[i] = iterators[i].next();
                    }
                    last = [...elms];
                    return new ContainerElement(elms);
                }

                // Логика инкремента, как в оригинале
                let i = setsCount - 1;
                let foundNext = false;

                while (i >= 0 && !foundNext) {
                    if (iterators[i].hasNext()) {
                        elms[i] = iterators[i].next();
                        foundNext = true;
                    } else {
                        iterators[i].reset();
                        elms[i] = iterators[i].next();
                        i--;
                    }
                }

                if (!foundNext) {
                    hasMore = false;
                    return null;
                }

                // Заполняем элементы, которые не изменились
                for (let j = 0; j < i; j++) {
                    elms[j] = last[j];
                }
                
                last = [...elms];
                return new ContainerElement(elms);
            },

            reset: () => {
                iterators.forEach(it => it.reset());
                beforeFirst = true;
                hasMore = this._size > 0;
            }
        };
    }
}