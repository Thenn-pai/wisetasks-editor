import { Parser } from '../utils/Parser.js';

/**
 * Класс для предварительной обработки структуры задачи и подстановки параметров.
 * Аналог ru.spb.ipo.engine.task.Preprocessor
 */
export class Preprocessor {

    static hs = new Set(["for"]);

    /**
     * Выполняет генерацию задачи с применением параметров
     */
    static async executeTask(node, parameters) {
        return this.generateTask(node.makeCopy(), parameters, true);
    }

    /**
     * Рекурсивно обрабатывает узлы задачи
     */
    static async generateTask(node, parameters, forExecution) {
        if (this.hs.has(node.getNodeName())) {
            if (node.getNodeName() === "for") {
                await this.processFor(node, parameters, forExecution);
                return node;
            }
        }

        // Обработка текстового содержимого: подстановка параметров $name$
        let text = node.getText();
        if (text && text.includes("$")) {
            for (const [key, value] of Object.entries(parameters)) {
                // Простая замена, в Java использовался StringBuffer для сложной логики
                const placeholder = `$${key}$`;
                if (text.includes(placeholder)) {
                    text = text.split(placeholder).join(value);
                }
            }
            node.update(text);
        }

        // Обработка атрибутов
        const attrs = node.getAttrs();
        for (const attrName in attrs) {
            let attrValue = node.getAttrIfExists(attrName, "");
            if (attrValue.includes("$")) {
                for (const [key, value] of Object.entries(parameters)) {
                    attrValue = attrValue.split(`$${key}$`).join(value);
                }
                // Здесь предполагается наличие метода установки атрибута, если он нужен
            }
        }

        // Рекурсия по детям
        const children = node.getChilds(null);
        for (const child of children) {
            await this.generateTask(child, parameters, forExecution);
        }

        return node;
    }

    /**
     * Обработка цикла <for>
     */
    static async processFor(node, parameters, forExecution) {
        const forIndexName = node.getAttr("var");
        const first = parseInt(node.getAttr("first"));
        const last = parseInt(node.getAttr("last"));
        let inc = parseInt(node.getAttrIfExists("inc", "1"));

        if (isNaN(inc) || inc === 0) inc = 1;

        const oldValue = parameters[forIndexName];

        for (let i = first; i <= last; i += inc) {
            parameters[forIndexName] = i;
            // Получаем всех детей текущего узла <for>
            const children = node.getChilds(null);

            for (const child of children) {
                const temp = await this.generateTask(child.makeCopy(), parameters, forExecution);
                node.addToParent(temp);
            }
        }

        // Возвращаем старое значение переменной цикла или удаляем её
        if (oldValue !== undefined) {
            parameters[forIndexName] = oldValue;
        } else {
            delete parameters[forIndexName];
        }

        // Удаляем сам узел <for> из родителя после развертывания
        node.removeFromParent(node);
    }

    /**
     * Статический метод для парсинга текстового ответа
     */
    static parseAnswer(answer, parameters) {
        if (!answer) return "";
        let result = answer;

        for (const [name, value] of Object.entries(parameters)) {
            let i = result.indexOf(name);
            while (i >= 0) {
                let replace = true;
                // Проверка, что это отдельное слово, а не часть другого (как в Java Parser.isLetter)
                if (i > 0 && Parser.isLetter(result[i - 1])) replace = false;
                if (i + name.length < result.length && Parser.isLetter(result[i + name.length])) replace = false;

                if (replace) {
                    result = result.substring(0, i) + value + result.substring(i + name.length);
                    // Ищем дальше после вставленного значения
                    i = result.indexOf(name, i + String(value).length);
                } else {
                    i = result.indexOf(name, i + 1);
                }
            }
        }
        return result;
    }
}