import { Set } from './Set.js';
import { SubstitutionSet } from './SubstitutionSet.js';
import { ContainerElement } from '../elements/ContainerElement.js';

/**
 * Множество уникальных кортежей, учитывающее эквивалентность через перестановки.
 * Аналог ru.spb.ipo.engine.sets.DistinctSet
 */
export class DistinctSet extends Set {

    constructor() {
        super();
        this.unique = [];
        this.len = 0;
    }

    /**
     * Инициализация множества из XML узла
     * @param {Node} node 
     */
    async init(node) {
        const lsets = node.getChilds("set");
        if (lsets.length === 0) {
            throw new Error("DistinctSet: должно быть хотя бы одно подмножество");
        }

        // Генерируем исходное множество (нужен метод Set.generateSet)
        const source = await Set.generateSet(lsets[0]);
        this.len = source.getLength ? source.getLength() : 0;

        if (source.isEmpty()) {
            this.unique = [];
            return;
        }

        // Если есть второе множество - это правила перестановок, иначе - стандартные перестановки
        let perm;
        if (lsets.length === 2) {
            perm = await Set.generateSet(lsets[1]);
        } else {
            perm = new SubstitutionSet(this.len);
        }

        this.unique = [];
        const it = source.getJavaLikeIterator();

        while (it.hasNext()) {
            const current = it.next();
            if (!(current instanceof ContainerElement)) {
                // Если элемент не контейнер, оборачиваем его для совместимости с perm.canMake
                // Но обычно здесь ожидаются именно кортежи (ContainerElement)
                continue; 
            }

            let found = false;
            for (let i = 0; i < this.unique.length; i++) {
                // canMake проверяет, можно ли из current получить уже имеющийся уникальный элемент
                if (perm.canMake(current, this.unique[i])) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                // В JS cloneNode используется для DOM, для объектов используем кастомный клон
                this.unique.push(current.clone ? current.clone() : current);
            }
        }
    }

    getElement(index) {
        if (index < 1 || index > this.unique.length) return null;
        return this.unique[index - 1];
    }

    getLength() {
        return this.len;
    }

    size() {
        return this.unique.length;
    }

    /**
     * Стандартный итератор JS
     */
    *getIterator() {
        for (const item of this.unique) {
            yield item;
        }
    }

    /**
     * Эмуляция Java-итератора
     */
    getJavaLikeIterator() {
        let index = 0;
        const self = this;
        return {
            hasNext: () => index < self.unique.length,
            next: () => self.unique[index++],
            reset: () => { index = 0; }
        };
    }
}