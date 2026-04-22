/**
 * Класс конфигурации и констант.
 *
 */
export class Config {
    // Типы элементов
    static TYPE_ROOTELEMENT = "root";
    static TYPE_FUNCTION = "function";
    static TYPE_SET = "set";
    static TYPE_DESCPARAMSET = "description-params";
    static TYPE_VERPARAMSET = "verifier-params";
    static TYPE_DESCRIPTION = "description";
    static TYPE_ELEMENT = "element";
    static TYPE_COMMAND = "command";
    static TYPE_TEXT = "text";
    static TYPE_PARAM = "param";

    // Битовые флаги операций
    static ADD_SET = 1;
    static ADD_FUNCTION = 2;
    static ADD_COMMAND = 4;
    static ADD_PARAM = 16;
    static UPDATE = 32;
    static DELETE = 64;
    static ADD_TEXT = 128;
    static ADD_VPARAMSET = 256;

    static getOperation(name) {
        return Config[name] || 0;
    }

    /**
     * В Java этот метод использовал Apache Commons Digester.
     * В JS мы предполагаем использование стороннего парсера (например, xml2js).
     */
    static parseConfig(xmlStringOrPath) {
        console.warn("В JS здесь должен быть вызов XML-парсера для сборки дерева из tgconfig.xml");
        return new Config();
    }
}