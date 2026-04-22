import { Set } from './Set.js';
// AbstractFunction будет импортирован, когда мы его создадим
// import { AbstractFunction } from '../functions/AbstractFunction.js';

/**
 * Множество-перечисление. Порядок элементов не важен.
 * Аналог ru.spb.ipo.engine.sets.EnumerationSet
 */
export class EnumerationSet extends Set {

    /**
     * @param {Element[]} elements - Опциональный массив готовых элементов
     */
    constructor(elements = []) {
        super();
        this.list = [...elements];
    }

    /**
     * Инициализация множества из XML узла.
     * Ищет теги <constElement> и учитывает атрибут dublicate.
     * @param {Node} node 
     */
    async initSet(node) {
        const nl = node.getChilds("constElement");
        
        for (const child of nl) {
            // Временно используем заглушку, пока не портирован AbstractFunction
            // const el = await AbstractFunction.generateAbstractFunction(child);
            const el = { 
                text: child.getText(), 
                clone: () => ({ ...el }) // Упрощенный клон
            };

            this.list.push(el);

            const repeat = child.getAttrIfExists("dublicate", null);
            if (repeat !== null) {
                const repeatNumber = parseInt(repeat);
                for (let j = 1; j < repeatNumber; j++) {
                    this.list.push(typeof el.clone === 'function' ? el.clone() : { ...el });
                }
            }
        }
    }

    /**
     * Возвращает элемент по индексу (1-based, как в оригинале)
     */
    getElement(index) {
        if (index < 1 || index > this.list.length) return null;
        return this.list[index - 1];
    }

    size() {
        return this.list.length;
    }

    /**
     * Стандартный итератор JS
     */
    *getIterator() {
        for (const item of this.list) {
            yield item;
        }
    }

    /**
     * Эмуляция Java-итератора с методом reset
     */
    getJavaLikeIterator() {
        let currentIndex = 0;
        const self = this;
        return {
            hasNext: () => currentIndex < self.list.length,
            next: () => self.list[currentIndex++],
            reset: () => { currentIndex = 0; }
        };
    }
}