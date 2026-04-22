/**
 * Базовый класс для выполнения действий кнопок.
 * Аналог ru.spb.ipo.client.ui.buttons.BaseExecutor
 */
export class BaseExecutor {
    constructor() {
        this.buttonValue = ""; //
        this.newValue = ""; //
        this.oldValue = ""; //
        this.position = 0; //
    }

    /**
     * Основной метод выполнения действия.
     * @param {HTMLInputElement} field - Поле ввода (аналог JTextField)
     * @param {Event} event - Событие клика
     */
    perform(field, event) {
        this.preExecute(field, event); //
        this.updateParameters(field, event); //
        this.postExecute(field, event); //
    }

    /**
     * Подготовка данных перед выполнением.
     *
     */
    preExecute(field, event) {
        // Предполагаем, что у кнопки есть свойство valueKey или data-атрибут
        this.buttonValue = event.target.dataset.valueKey || ""; // Аналог getValueKey()
        this.oldValue = field.value || ""; // Аналог getText()
        this.newValue = this.oldValue; //
        this.position = field.selectionStart || 0; // Аналог getCaretPosition()
    }

    /**
     * Логика обновления текста (вставка значения кнопки в позицию курсора).
     *
     */
    updateParameters(field, event) {
        const leftPart = this.oldValue.substring(0, this.position); //
        const rightPart = this.oldValue.substring(this.position); //
        
        this.newValue = leftPart + this.buttonValue + rightPart; //
        this.position += this.buttonValue.length; // Смещаем курсор на длину вставленного текста
    }

    /**
     * Применение изменений к полю ввода.
     *
     */
    postExecute(field, event) {
        if (this.newValue === null) this.newValue = ""; //
        
        field.value = this.newValue; // Аналог setText()

        // Установка позиции курсора (фокус на поле важен для применения selection)
        if (this.position > -1 && this.position <= this.newValue.length) {
            field.setSelectionRange(this.position, this.position); // Аналог setCaretPosition()
        }
    }
}