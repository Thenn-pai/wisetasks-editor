/**
 * Валидатор числового ввода.
 *
 */
export class ValidatedTextField {
    static verify(text, max) {
        try {
            const value = parseInt(text);
            if (isNaN(value) || value < 0 || value > max) {
                return {
                    isValid: false,
                    message: `Значение должно быть числом от 0 до ${max}`
                };
            }
            return { isValid: true, value };
        } catch (e) {
            return { isValid: false, message: "Неверный формат числа" };
        }
    }
}