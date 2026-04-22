import { Function } from './Function.js';
import { ContainerElement } from '../elements/ContainerElement.js';
import { IntElement } from '../elements/IntElement.js';

/**
 * Функция подсчета вхождений элементов.
 * Аналог ru.spb.ipo.engine.functions.Count
 */
export class Count extends Function {

    constructor() {
        super();
        this.fe = null;     // Итоговый контейнер с результатами
        this.length = 0;    // Длина входного массива
        this.array = [];    // Рабочий массив для сортировки
        this.axis = 0;      // Ось (индекс внутри вложенного элемента), по которой считать
    }

    /**
     * Инициализация из XML. Читает атрибут "axis".
     * @param {Node} node 
     */
    async initFunction(node) {
        await super.initFunction(node);
        const m = Function.getAttributes(node);
        if (m.axis) {
            // В Java использовался FractionalNumber, в JS берем целое число
            this.axis = parseInt(m.axis.toString());
        }
    }

    /**
     * Вычисляет количество повторений элементов.
     * @param {Element} parameter 
     * @returns {ContainerElement}
     */
    compute(parameter) {
        const element = this.fns[0].compute(parameter);
        
        // Ленивая инициализация структуры при первом вызове
        if (this.fe === null) {
            this.length = element.getLength();
            this.array = new Array(this.length);
            const temp = new Array(this.length);
            for (let i = 0; i < temp.length; i++) {
                temp[i] = new IntElement(0);
            }
            this.fe = new ContainerElement(temp);
        }

        // Подготовка данных для подсчета
        for (let i = 1; i <= this.length; i++) {
            if (this.axis !== 0) {
                this.array[i - 1] = element.getElementAt(i).getElementAt(this.axis);
            } else {
                this.array[i - 1] = element.getElementAt(i);
            }
        }

        // Сортируем массив для удобства подсчета дубликатов
        // Важно: метод sort в JS требует компаратор для корректной работы с объектами
        this.array.sort((a, b) => a.compareTo(b));

        let index = 1;
        let prev = this.array[0];
        let count = 1;

        // Основной цикл подсчета
        for (let i = 1; i < this.length; i++) {
            if (this.array[i].equals(prev)) {
                count++;
            } else {
                this.fe.getElementAt(index).setInt(count);
                index++;
                count = 1;
            }
            prev = this.array[i];
        }

        // Записываем последний результат
        this.fe.getElementAt(index).setInt(count);
        index++;

        // Заполняем оставшиеся ячейки нулями
        for (let i = index; i <= this.length; i++) {
            this.fe.getElementAt(i).setInt(0);
        }

        // Финальная сортировка результатов (как в оригинале)
        if (this.fe.getElements() !== null) {
            this.fe.getElements().sort((a, b) => a.compareTo(b));
        }

        return this.fe;
    }
}