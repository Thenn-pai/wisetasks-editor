/**
 * Класс для работы с точными дробями.
 * Аналог ru.spb.ipo.engine.utils.FractionalNumber
 */
export class FractionalNumber {
    /**
     * @param {bigint|number} numerator 
     * @param {bigint|number} denominator 
     */
    constructor(numerator, denominator = 1n) {
        this.numerator = BigInt(numerator);
        this.denominator = BigInt(denominator);

        if (this.denominator === 0n) {
            throw new Error("Знаменатель не может быть равен нулю");
        }
    }

    /**
     * Нахождение наибольшего общего делителя (Алгоритм Евклида)
     */
    static gcd(a, b) {
        a = a < 0n ? -a : a;
        b = b < 0n ? -b : b;
        while (b > 0n) {
            a %= b;
            [a, b] = [b, a];
        }
        return a;
    }

    /**
     * Сокращение дроби и нормализация знака
     */
    normalize() {
        if (this.denominator === 0n) return this;

        // Если знаменатель отрицательный, переносим минус вверх
        if (this.denominator < 0n) {
            this.numerator = -this.numerator;
            this.denominator = -this.denominator;
        }

        const common = FractionalNumber.gcd(this.numerator, this.denominator);
        if (common > 1n) {
            this.numerator /= common;
            this.denominator /= common;
        }
        return this;
    }

    add(other) {
        const newNumerator = this.numerator * other.denominator + other.numerator * this.denominator;
        const newDenominator = this.denominator * other.denominator;
        return new FractionalNumber(newNumerator, newDenominator).normalize();
    }

    subtract(other) {
        const newNumerator = this.numerator * other.denominator - other.numerator * this.denominator;
        const newDenominator = this.denominator * other.denominator;
        return new FractionalNumber(newNumerator, newDenominator).normalize();
    }

    multiply(other) {
        return new FractionalNumber(this.numerator * other.numerator, this.denominator * other.denominator).normalize();
    }

    divide(other) {
        if (other.numerator === 0n) throw new Error("Деление на ноль (числитель делителя равен 0)");
        return new FractionalNumber(this.numerator * other.denominator, this.denominator * other.numerator).normalize();
    }

    /**
     * Возвращает целую часть от деления
     */
    round() {
        this.normalize();
        return this.numerator / this.denominator;
    }

    isZero() {
        return this.numerator === 0n;
    }

    equals(o) {
        if (!(o instanceof FractionalNumber)) return false;
        
        // Клонируем и нормализуем для сравнения
        const n1 = new FractionalNumber(this.numerator, this.denominator).normalize();
        const n2 = new FractionalNumber(o.numerator, o.denominator).normalize();

        return n1.numerator === n2.numerator && n1.denominator === n2.denominator;
    }

    compareTo(o) {
        if (!(o instanceof FractionalNumber)) return -1;
        
        // Сравнение a/b и c/d через a*d и b*c
        const left = this.numerator * o.denominator;
        const right = this.denominator * o.numerator;

        if (left < right) return -1;
        if (left > right) return 1;
        return 0;
    }

    toString() {
        this.normalize();
        if (this.denominator === 1n) return this.numerator.toString();
        return `${this.numerator}/${this.denominator}`;
    }

    getNumerator() { return this.numerator; }
    getDenominator() { return this.denominator; }
}