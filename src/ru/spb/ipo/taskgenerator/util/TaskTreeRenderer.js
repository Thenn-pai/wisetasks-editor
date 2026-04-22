/**
 * Визуальный отрисовщик узлов дерева.
 *
 * * Внимание: в веб-приложениях (React/Vue) это заменяется компонентом 
 * <TreeNode icon={isSet ? 'set-icon' : 'element-icon'} />
 */
export class TaskTreeRenderer {
    static getIconForElement(elementName) {
        if (elementName === "set") return "SET_ICON";
        if (elementName === "function") return "FUNCTION_ICON";
        return "ELEMENT_ICON";
    }
}