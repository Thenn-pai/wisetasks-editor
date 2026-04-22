/**
 * Утилиты для UI элементов.
 *
 */
export class UIUtils {
    // Рекурсивное включение/отключение компонентов
    static enableAll(components, enabled) {
        components.forEach(comp => {
            comp.enabled = enabled;
            if (comp.children) UIUtils.enableAll(comp.children, enabled);
        });
    }

    static getColor(index) {
        // Массив цветов из BasketXmlGenerator
        const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]; 
        return colors[index] || "#000000";
    }
}