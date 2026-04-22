/**
 * Глобальный обработчик исключений.
 *
 */
export class ExceptionHandler {
    static uncaughtException(e) {
        console.error("Необработанная ошибка:", e);
        // В будущем здесь можно вызывать UIUtil.showError для показа алерта на сайте
    }
}

// Регистрация обработчика для Node.js или Браузера
if (typeof window !== 'undefined') {
    window.onerror = (msg, url, line, col, error) => ExceptionHandler.uncaughtException(error);
} else {
    process.on('uncaughtException', (e) => ExceptionHandler.uncaughtException(e));
}