/**
 * Панель свойств элемента.
 *
 */
export class SmartPanel {
    constructor() {
        this.mode = "DISABLE"; // Режимы: PARAMETER, DESCRIPTION, ELEMENT, DISABLE
        this.currentElement = null;
    }

    /**
     * Переключает вид панели в зависимости от выбранного узла
     */
    updateForNode(node) {
        if (!node || node.isText()) {
            this.mode = "DISABLE";
            return;
        }

        const element = node.getElement();
        this.currentElement = element;

        // Логика выбора режима из Java
        if (element.getName() === "param") {
            this.mode = "PARAMETER";
        } else if (element.getName() === "description") {
            this.mode = "DESCRIPTION";
        } else {
            this.mode = "ELEMENT";
        }
    }
}