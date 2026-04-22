/**
 * Вспомогательный класс для работы с пользовательским интерфейсом (ошибки, уведомления).
 * Аналог ru.spb.ipo.engine.utils.UIUtil
 */
export class UIUtil {

    /**
     * Показать ошибку
     * @param {any} parent - Родительский компонент (в JS можно передать null или DOM-элемент)
     * @param {Error|Object|string} e - Объект ошибки или исключение
     */
    static showError(parent, e) {
        this.showErrorWithMessage(parent, null, e);
    }

    /**
     * Показать ошибку с дополнительным сообщением
     * @param {any} parent 
     * @param {string|null} message - Дополнительный текст
     * @param {Error|Object|string} e - Исключение
     */
    static showErrorWithMessage(parent, message, e) {
        // Формируем текст ошибки
        const errorDetail = e instanceof Error ? e.message : String(e);
        const fullMessage = message ? `${message}\n${errorDetail}` : errorDetail;

        // Вывод в консоль (для отладки)
        console.error("[UI Error]:", fullMessage);

        // Если это браузер — можно использовать alert
        if (typeof window !== 'undefined') {
            alert(fullMessage);
        }
        
        // В будущем здесь можно добавить вызов красивого модального окна 
        // вашего веб-интерфейса
    }
}