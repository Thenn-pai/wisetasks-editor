/**
 * Текстовый редактор с поддержкой XML.
 *
 * * Внимание: Этот класс в Java наследовал StyledEditorKit для работы со Swing.
 * В JavaScript/Браузере для редактирования XML с подсветкой синтаксиса
 * следует интегрировать библиотеку Monaco Editor или Ace Editor.
 */
export class XMLEditorKit {
    static getContentType() {
        return "text/xml";
    }
}