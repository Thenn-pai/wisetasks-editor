/**
 * Утилиты для комбинаторных вычислений.
 * Аналог ru.spb.ipo.engine.utils.MathOperations
 */
export class MathOperations {

    /**
     * Сочетания из n по k (C(n, k))
     * @param {number|bigint} n 
     * @param {number|bigint} k 
     * @returns {bigint}
     */
    static combination(n, k) {
        n = BigInt(n);
        k = BigInt(k);

        if (k === 0n || k === n) return 1n;
        if (k > n) return 0n;
        if (k < 0n || n <= 0n) return 0n;

        let a, b;
        if (k > n - k) {
            a = k;
            b = n - k;
        } else {
            a = n - k;
            b = k;
        }

        // Вычисляем n! / a! как произведение (a+1)*(a+2)*...*n
        let bi = a + 1n;
        for (let i = a + 2n; i <= n; i++) {
            bi *= i;
        }

        // Делим на b!
        for (let i = 2n; i <= b; i++) {
            bi /= i;
        }

        return bi;
    }

    /**
     * Размещения из n по k (A(n, k))
     * @param {number|bigint} n 
     * @param {number|bigint} k 
     * @returns {bigint}
     */
    static layout(n, k) {
        n = BigInt(n);
        k = BigInt(k);

        if (n < k) return 0n;
        if (k < 0n || n <= 0n) return 0n;
        if (k === 0n) return 1n;

        let bi = n;
        for (let i = n - 1n; i > n - k; i--) {
            bi *= i;
        }
        return bi;
    }

    /**
     * Факториал числа n!
     * @param {number|bigint} n 
     * @returns {bigint}
     */
    static factorial(n) {
        n = BigInt(n);
        if (n < 0n) return 0n;
        if (n === 0n) return 1n;

        let res = 1n;
        for (let i = 2n; i <= n; i++) {
            res *= i;
        }
        return res;
    }

    /**
     * Степень n^k
     * @param {number|bigint} n 
     * @param {number|bigint} k 
     * @returns {bigint}
     */
    static power(n, k) {
        return BigInt(n) ** BigInt(k);
    }
}