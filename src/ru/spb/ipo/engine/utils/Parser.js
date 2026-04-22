import { FractionalNumber } from './FractionalNumber.js';

/**
 * Парсер математических выражений.
 * Реализует алгоритм перевода в обратную польскую нотацию.
 * Аналог ru.spb.ipo.engine.utils.Parser
 */
export class Parser {
    static termO = "(";
    static termC = ")";
    static termM = "*";
    static termD = "/";
    static termP = "+";
    static termMin = "-";

    constructor() {
        this.stack = [];
        this.pol = []; // Выходная очередь (польская запись)
        this.k = 0;    // Указатель для внутреннего парсинга скобок
    }

    /**
     * Основной метод парсинга строки в FractionalNumber
     * @param {string} exp 
     * @returns {FractionalNumber}
     */
    parse(exp) {
        if (!exp) return new FractionalNumber(0n);
        
        // Очистка строки от пробелов
        exp = exp.replace(/\s+/g, '');
        
        try {
            this.makePol(exp);
            return this.calculate();
        } catch (e) {
            throw new Error(`Ошибка при разборе выражения "${exp}": ${e.message}`);
        }
    }

    /**
     * Возвращает приоритет операции
     */
    getPriority(s) {
        if (s === Parser.termP || s === Parser.termMin) return 1;
        if (s === Parser.termM || s === Parser.termD) return 2;
        return 0;
    }

    /**
     * Преобразование в обратную польскую запись
     */
    makePol(exp) {
        this.stack = [];
        this.pol = [];
        let i = 0;

        while (i < exp.length) {
            let s = exp[i];

            if (s === Parser.termO) {
                this.stack.push(s);
            } else if (s === Parser.termC) {
                while (this.stack.length > 0 && this.stack[this.stack.length - 1] !== Parser.termO) {
                    this.pol.push(this.stack.pop());
                }
                this.stack.pop(); // Удаляем открывающую скобку
            } else if (this.isOperator(s)) {
                // Обработка отрицательных чисел в начале или после скобки
                if (s === Parser.termMin && (i === 0 || exp[i - 1] === Parser.termO)) {
                    this.pol.push("0"); // Превращаем -X в 0-X
                }
                while (this.stack.length > 0 && 
                       this.getPriority(this.stack[this.stack.length - 1]) >= this.getPriority(s)) {
                    this.pol.push(this.stack.pop());
                }
                this.stack.push(s);
            } else {
                // Читаем число (включая многозначные)
                let num = "";
                while (i < exp.length && !this.isOperator(exp[i]) && 
                       exp[i] !== Parser.termO && exp[i] !== Parser.termC) {
                    num += exp[i];
                    i++;
                }
                this.pol.push(num);
                i--; // Возвращаемся на один шаг назад, так как цикл i++ увеличит счетчик
            }
            i++;
        }

        while (this.stack.length > 0) {
            this.pol.push(this.stack.pop());
        }
    }

    isOperator(s) {
        return [Parser.termP, Parser.termMin, Parser.termM, Parser.termD].includes(s);
    }

    /**
     * Вычисление результата на основе польской записи
     */
    calculate() {
        let calcStack = [];

        for (let token of this.pol) {
            if (this.isOperator(token)) {
                let b = calcStack.pop();
                let a = calcStack.pop();

                switch (token) {
                    case Parser.termP: calcStack.push(a.add(b)); break;
                    case Parser.termMin: calcStack.push(a.subtract(b)); break;
                    case Parser.termM: calcStack.push(a.multiply(b)); break;
                    case Parser.termD: calcStack.push(a.divide(b)); break;
                }
            } else {
                // Создаем FractionalNumber из строки (поддержка BigInt внутри)
                calcStack.push(new FractionalNumber(BigInt(token)));
            }
        }

        return calcStack[0];
    }

    /**
     * Вспомогательный метод для парсинга массивов чисел в скобках (напр. "(1, 2, 3)")
     * Аналог метода parseBigInteger из Java
     */
    parseBigIntArray(sb) {
        // Логика выделения содержимого внутри внешних скобок и сплит по запятой
        // Реализуется аналогично Java через счетчик открытых/закрытых скобок
        // ... (пропущено для краткости, если потребуется — дополню)
    }
}