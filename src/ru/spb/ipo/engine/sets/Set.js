/**
 * Базовый абстрактный класс для всех множеств.
 * Аналог ru.spb.ipo.engine.sets.Set
 */
export class Set {

    constructor() {
        if (this.constructor === Set) {
            throw new TypeError('Нельзя создавать экземпляры абстрактного класса Set напрямую');
        }
    }

    /**
     * Инициализирует множество из XML-узла.
     * @param {Node} node 
     */
    async initSet(node) {
        // Базовая реализация может быть пустой, переопределяется в подклассах
    }

    /** @returns {number} Размер множества */
    size() {
        throw new Error("Метод size() должен быть реализован");
    }

    /** @returns {number} Длина кортежа (1 для простых чисел, k для наборов) */
    getLength() {
        return 1; 
    }

    /**
     * Возвращает элемент по его порядковому номеру (1-based).
     * @param {number} index 
     */
    getElement(index) {
        throw new Error("Метод getElement() должен быть реализован");
    }

    /** @returns {boolean} */
    isEmpty() {
        return this.size() === 0;
    }

    /** * Возвращает итератор.
     * Мы будем использовать метод getJavaLikeIterator для совместимости.
     */
    getJavaLikeIterator() {
        throw new Error("Метод getJavaLikeIterator() должен быть реализован");
    }

    /**
     * ФАБРИЧНЫЙ МЕТОД: Создает множество на основе атрибута "type" в XML.
     * Заменяет логику Class.forName().newInstance() из Java.
     * * @param {Node} node - XML узел <set>
     * @returns {Promise<Set>}
     */
    static async generateSet(node) {
        const shortType = node.getAttr("type");
        
        // Динамический импорт для предотвращения циклических зависимостей
        // и эмуляции рефлексии
        let setInstance;

        try {
            switch (shortType) {
                case "NumericSet":
                    const { NumericSet } = await import('./NumericSet.js');
                    setInstance = new NumericSet();
                    break;
                case "EnumerationSet":
                    const { EnumerationSet } = await import('./EnumerationSet.js');
                    setInstance = new EnumerationSet();
                    break;
                case "DecartSet":
                    const { DecartSet } = await import('./DecartSet.js');
                    // DecartSet в Java требует специфического конструктора, 
                    // здесь мы вызываем initSet позже
                    setInstance = new DecartSet([]); 
                    break;
                case "CombinationSet":
                    const { CombinationSet } = await import('./CombinationSet.js');
                    setInstance = new CombinationSet(null, 0);
                    break;
                case "LayoutSet":
                    const { LayoutSet } = await import('./LayoutSet.js');
                    setInstance = new LayoutSet(null, 0);
                    break;
                case "DistinctSet":
                    const { DistinctSet } = await import('./DistinctSet.js');
                    setInstance = new DistinctSet();
                    break;
                default:
                    throw new Error(`Неизвестный тип множества: ${shortType}`);
            }

            // Инициализируем созданный объект данными из XML
            if (setInstance.initSet) {
                await setInstance.initSet(node);
            }
            return setInstance;

        } catch (e) {
            console.error("Ошибка при генерации множества:", e);
            throw new Error(`Не могу создать множество типа ${shortType}: ${e.message}`);
        }
    }
}