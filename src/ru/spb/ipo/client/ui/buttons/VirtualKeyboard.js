import { VirtualButton } from './VirtualButton.js';

/**
 * Менеджер виртуальной клавиатуры.
 *
 */
export class VirtualKeyboard {
    constructor(components = []) {
        this.components = components;
    }

    /**
     * Поиск кнопки по тексту (префиксу)
     */
    getButton(textPrefix) {
        for (let comp of this.components) {
            if (comp instanceof VirtualButton) {
                if (comp.textKey.startsWith(textPrefix)) return comp;
            } else if (comp instanceof VirtualKeyboard) {
                const found = comp.getButton(textPrefix);
                if (found) return found;
            }
        }
        return null;
    }

    /**
     * Установка параметров для выпадающих меню
     */
    static setParameters(strs) {
        // Логика активации/деактивации кнопок функций и параметров
        if (!strs || strs.length === 0) {
            // VirtualButton.PARAMETERS.setEnabled(false);
        } else {
            // VirtualButton.PARAMETERS.putClientProperty("POPUP", strs);
            // VirtualButton.PARAMETERS.setEnabled(true);
        }
    }
}