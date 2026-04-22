import { Node } from './Node.js';

/**
 * Реализация узла данных задачи на базе браузерного DOM.
 * Аналог ru.spb.ipo.engine.task.NodeImpl
 */
export class NodeImpl extends Node {

    /**
     * @param {Element|Attr} domNode - стандартный узел DOM (Element или Attr)
     */
    constructor(domNode) {
        super();
        this.node = domNode;
    }

    makeCopy() {
        return new NodeImpl(this.node.cloneNode(true));
    }

    getNodeName() {
        return this.node.nodeName;
    }

    getChilds(name) {
        const children = Array.from(this.node.childNodes);
        const results = [];

        for (const child of children) {
            // В JS проверяем тип узла (1 = Element) и имя
            if (child.nodeType === 1 && (!name || child.nodeName === name)) {
                results.push(new NodeImpl(child));
            }
        }
        return results;
    }

    getAttr(name) {
        const value = this.getAttrIfExists(name, null);
        if (value === null) {
            throw new Error(`Атрибут '${name}' для вершины ${this.getNodePath()} не выставлен!`);
        }
        return value;
    }

    getAttrIfExists(name, defaultValue) {
        if (this.node.hasAttribute && this.node.hasAttribute(name)) {
            return this.node.getAttribute(name);
        }
        return defaultValue;
    }

    getText() {
        // Логика поиска CDATA или текстового узла, как в Java
        const cdata = this.getChildIfExists("#cdata-section");
        if (cdata) return cdata.node.nodeValue;

        const text = this.getChildIfExists("#text");
        if (text) return text.node.nodeValue;

        return this.node.nodeValue || this.node.textContent || "";
    }

    getNodePath() {
        return this._getNodePathRecursive(this.node, this.node.nodeName);
    }

    _getNodePathRecursive(node, postfix) {
        if (node.parentNode) {
            return this._getNodePathRecursive(node.parentNode, node.parentNode.nodeName + "/" + postfix);
        }
        return postfix;
    }

    getChildIfExists(name) {
        const children = Array.from(this.node.childNodes);
        for (const child of children) {
            if (child.nodeName === name) {
                return new NodeImpl(child);
            }
        }
        return null;
    }

    getChild(name) {
        const child = this.getChildIfExists(name);
        if (!child) {
            throw new Error(`Child node with name ${name} not found at ${this.getNodePath()}`);
        }
        return child;
    }

    getAttrs() {
        const result = {};
        if (this.node.attributes) {
            for (let i = 0; i < this.node.attributes.length; i++) {
                const attr = this.node.attributes[i];
                result[attr.nodeName] = new NodeImpl(attr);
            }
        }
        return result;
    }

    update(newNodeValue) {
        if (newNodeValue !== null) {
            this.node.nodeValue = newNodeValue;
        }
    }

    addToParent(newChild) {
        this.node.parentNode.appendChild(newChild.node);
    }

    removeFromParent(oldChild) {
        this.node.parentNode.removeChild(oldChild.node);
    }

    isEmptyWrapper() {
        return !this.node;
    }

    getFunctionList() {
        const children = Array.from(this.node.childNodes);
        const functions = [];
        const funcTags = ["element", "constElement", "function", "current-set-element"];

        for (const child of children) {
            if (child.nodeType === 1 && funcTags.includes(child.nodeName)) {
                functions.push(new NodeImpl(child));
            }
        }
        return functions;
    }
}