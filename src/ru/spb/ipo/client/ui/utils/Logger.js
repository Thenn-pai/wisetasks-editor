/**
 * Утилита логирования.
 *
 */
export class Logger {
    static isFirst = false; //
    static tfield = null; // Аналог JTextArea

    /**
     * Добавляет сообщение в лог с меткой времени.
     *
     */
    static log(str) {
        if (!this.tfield) {
            console.log(`[LOG] ${str}`);
            return;
        }

        const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }); // Аналог SimpleDateFormat
        const message = `${time} ${str}`;

        if (!this.isFirst) {
            this.tfield.value += message; // Аналог append()
            this.isFirst = true;
        } else {
            this.tfield.value += "\n" + message;
        }
    }
}