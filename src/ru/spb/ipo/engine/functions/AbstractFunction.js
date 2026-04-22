import { Parser } from '../utils/Parser.js';

export class AbstractFunction {
    static parser = new Parser();
    static #ce = null; // Приватное поле для ленивой инициализации CurrentElement

    /** @abstract */
    compute(parameter) {
        throw new Error("Метод compute должен быть реализован");
    }

    /**
     * Фабричный метод. Импорты перенесены внутрь, чтобы избежать ReferenceError.
     */
    static async generateAbstractFunction(node) {
        const name = node.getNodeName();

        if (name === "element") {
            const { ConstElement } = await import('./ConstElement.js');
            return await ConstElement.generateElement(node);
        }

        if (name === "constElement") {
            const { Element } = await import('../elements/Element.js');
            return await Element.generateElement(node);
        }

        if (name === "function") {
            const { Function } = await import('./Function.js');
            return await Function.generateFunction(node);
        }

        if (name === "current-set-element") {
            if (!AbstractFunction.#ce) {
                const { CurrentElement } = await import('./CurrentElement.js');
                AbstractFunction.#ce = new CurrentElement();
            }
            return AbstractFunction.#ce;
        }

        return null;
    }

    /**
     * Извлекает атрибуты узла.
     */
    static getAttributes(n) {
        const attrs = n.getAttrs();
        const result = {};
        if (!attrs) return result;

        for (const [key, attrNode] of Object.entries(attrs)) {
            if (attrNode.getNodeName() !== "type") {
                result[key] = AbstractFunction.parser.parse(attrNode.getText());
            }
        }
        return result;
    }
}