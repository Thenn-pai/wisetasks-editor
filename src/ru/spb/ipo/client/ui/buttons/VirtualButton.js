import { BaseExecutor } from './BaseExecutor.js';

/**
 * Представление виртуальной кнопки.
 *
 */
export class VirtualButton {
    static PERFORMER = new BaseExecutor();
    
    // Константы типов
    static DELETE = "delete";
    static LEFT = "left";
    static RIGHT = "right";

    constructor(textKey, valueKey, toolTip = "", type = 0, performer = null) {
        this.textKey = textKey;
        this.valueKey = valueKey;
        this.toolTip = toolTip;
        this.type = type;
        this.myPerformer = performer || VirtualButton.PERFORMER;
        this.enabled = true;
        this.clientProperties = new Map();
    }

    // Статические экземпляры кнопок (цифры, знаки)
    static ONE = new VirtualButton("1", "1");
    static TWO = new VirtualButton("2", "2");
    static PLUS = new VirtualButton("+", "+");
    static MINUS = new VirtualButton("-", "-");
    static LEFT_BRACKET = new VirtualButton("(", "(");
    static RIGHT_BRACKET = new VirtualButton(")", ")");
    
    // Кнопка BackSpace с кастомной логикой
    static DEL = new VirtualButton("BS", "delete", "BackSpace", 0, new (class extends BaseExecutor {
        updateParameters(field, event) {
            const pos = field.selectionStart;
            if (pos !== 0) {
                const val = field.value;
                this.newValue = val.substring(0, pos - 1) + val.substring(pos);
                this.position = pos - 1;
            }
        }
    })());

    static CLEAR = new VirtualButton("Очистить", "right", "Очистить", 0, new (class extends BaseExecutor {
        updateParameters(field) { field.value = ""; }
    })());

    perform(field, event) {
        if (this.enabled) {
            this.myPerformer.perform(field, event);
        }
    }

    putClientProperty(key, value) { this.clientProperties.set(key, value); }
    getClientProperty(key) { return this.clientProperties.get(key); }
    setEnabled(val) { this.enabled = val; }
}