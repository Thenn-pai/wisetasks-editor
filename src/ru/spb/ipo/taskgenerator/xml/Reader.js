import { ElementFactory } from '../util/ElementFactory.js';
import { ElementUtil } from '../util/ElementUtil.js';
// В JS для парсинга XML используется встроенный DOMParser (в браузере)
// Если код будет работать в Node.js, потребуется установить пакет 'xmldom'

/**
 * Читает XML и строит дерево объектов модели.
 *
 */
export class Reader {
    constructor(xmlString) {
        this.rootElement = null;
        this.al = []; // В оригинале список Viewer-ов
        
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(xmlString, "text/xml");
            
            // Проверка на ошибки парсинга
            const parseError = doc.getElementsByTagName("parsererror");
            if (parseError.length > 0) {
                console.error("Ошибка парсинга XML");
                return;
            }

            const children = doc.childNodes;
            for (let i = 0; i < children.length; i++) {
                const node = children[i];
                // Ищем корневой элемент (ELEMENT_NODE = 1)
                if (node.nodeType === 1) { 
                    this.rootElement = this.buildTree(node);
                    break;
                }
            }
        } catch (e) {
            console.error("Ошибка при чтении XML:", e);
        }
    }

    buildTree(node) {
        if (this.isEmpty(node)) return null;

        const newElement = ElementFactory.buildElementFromNode(node);
        if (!newElement) return null;

        const children = node.childNodes;
        for (let i = 0; i < children.length; i++) {
            const n = children[i];
            const type = n.nodeType;

            // TEXT_NODE (3) или CDATA_SECTION_NODE (4) или COMMENT_NODE (8)
            if (type === 3 || type === 4 || type === 8) {
                const text = ElementUtil.getSafe(n.nodeValue);
                if (text !== "") {
                    // В JS проверяем наличие метода setText
                    if (typeof newElement.setText === 'function') {
                        newElement.setText(text);
                    }
                }
            } else if (type === 1) { // ELEMENT_NODE
                const childElement = this.buildTree(n);
                if (childElement) {
                    newElement.addChild(childElement);
                }
            }
        }
        return newElement;
    }

    isEmpty(node) {
        if (!node) return true;
        if (node.nodeType === 3 && node.nodeValue.trim() === "") return true;
        return false;
    }

    getRoot() {
        return this.rootElement;
    }
}