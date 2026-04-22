import { Element } from '../model/Element.js';
import { Comment } from '../model/Comment.js';
import { Parameter } from '../model/Parameter.js';
import { ElementUtil } from '../util/ElementUtil.js';

/**
 * Сериализует дерево объектов модели обратно в XML.
 *
 */
export class Writer {
    
    /**
     * Генерирует DOM Document из KernelElement
     */
    static generateXmlTree(rootKernelElement) {
        try {
            // Создаем пустой XML документ
            const doc = document.implementation.createDocument(null, "", null);
            this.buildXmlTree(rootKernelElement, doc, doc);
            return doc;
        } catch (e) {
            console.error("Ошибка при генерации XML дерева:", e);
            return null;
        }
    }

    /**
     * Конвертирует DOM Document в строку
     */
    static getString(doc) {
        if (!doc) return "";
        const serializer = new XMLSerializer();
        return serializer.serializeToString(doc);
    }

    /**
     * Рекурсивное построение XML-дерева
     */
    static buildXmlTree(element, parentNode, doc) {
        if (!element) return;

        let newNode = null;

        if (element instanceof Element) {
            newNode = doc.createElement(element.getName());
            
            // Добавление атрибутов
            if (element.attributesList) {
                element.attributesList.forEach(attr => {
                    newNode.setAttribute(attr.getName(), attr.getValue());
                });
            }

            // Текст внутри тега
            const text = ElementUtil.getSafe(element.getText());
            if (text !== "") {
                newNode.appendChild(doc.createTextNode(text));
            }

            // Специфичная обработка Parameter
            if (element instanceof Parameter) {
                const list = element.getValues(); // Возвращает массив KeyValue
                list.forEach(vd => {
                    const name = vd.getKey();
                    let description = vd.getValue();
                    
                    const valueNode = doc.createElement("value");
                    valueNode.appendChild(doc.createTextNode(name));
                    newNode.appendChild(valueNode);
                    
                    description = ElementUtil.getSafe(description);
                    if (description !== "") {
                        valueNode.setAttribute("text", description);
                    }
                });
            }
        } else if (element instanceof Comment) {
            // Обработка комментариев
            newNode = doc.createComment(element.getText());
        }
        
        // Рекурсивный обход детей
        if (newNode) {
            parentNode.appendChild(newNode);
            
            const children = element.getChildren();
            if (children && Array.isArray(children)) {
                children.forEach(child => {
                    this.buildXmlTree(child, newNode, doc);
                });
            }
        }
    }
}