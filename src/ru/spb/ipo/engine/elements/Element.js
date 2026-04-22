/**
 * Базовый абстрактный класс для всех элементов (данных) системы.
 * Аналог ru.spb.ipo.engine.elements.Element
 */
export class Element {

    constructor() {
        // Константы ptrue и pfalse будут инициализированы позже в IntElement 
        // или здесь через ленивую инициализацию, чтобы избежать циклических зависимостей
    }

    /**
     * Возвращает целое число, если элемент является числовым.
     * @returns {number}
     */
    getInt() {
        return 0;
    }

    /**
     * Для элементов, представляющих кортежи, возвращает длину кортежа.
     * @returns {number}
     */
    getLength() {
        return 0;
    }

    /**
     * Возвращает все дочерние элементы (для контейнеров).
     * @returns {Element[]}
     */
    getElements() {
        return null;
    }

    /**
     * Устанавливает числовое значение.
     * @param {number} i 
     */
    setInt(i) {}

    /**
     * Устанавливает элемент по индексу (для контейнеров).
     * @param {number} index 
     * @param {Element} element 
     */
    setElementAt(index, element) {}

    /**
     * Метод из интерфейса функции. Элемент при вычислении возвращает сам себя.
     * @returns {Element}
     */
    compute() {
        return this;
    }

    /**
     * Глубокое клонирование элемента.
     */
    clone() {
        return this; 
    }

    /**
     * Сравнение элементов.
     * @param {any} o 
     * @returns {number}
     */
    compareTo(o) {
        if (this === o) return 0;
        return this.toString().localeCompare(o.toString());
    }

    /**
     * Проверка на равенство через compareTo.
     */
    equals(o) {
        return this.compareTo(o) === 0;
    }

    /**
     * ФАБРИЧНЫЙ МЕТОД: Генерирует элемент из XML узла.
     * @param {Node} node 
     * @returns {Promise<Element>}
     */
    static async generateElement(node) {
        const enodes = node.getChilds("constElement");

        if (enodes && enodes.length > 0) {
            const { ContainerElement } = await import('./ContainerElement.js');
            const ea = [];
            for (let i = 0; i < enodes.size(); i++) {
                ea.push(await Element.generateElement(enodes.get(i)));
            }
            return new ContainerElement(ea);
        }

        const txt = node.getText().trim();
        const val = parseInt(txt);
        
        const { IntElement } = await import('./IntElement.js');
        return new IntElement(isNaN(val) ? 0 : val);
    }
}