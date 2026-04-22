import { TaskTreeNode } from './TaskTreeNode.js';
import { Parameter } from '../model/Parameter.js';
import { Element } from '../model/Element.js';
import { ElementUtil } from '../util/ElementUtil.js';

/**
 * Фабрика визуальных элементов. Синхронизирует KernelElement и TaskTreeNode.
 *
 */
export class GraphicFactory {
    static elementsMap = new Map();

    /**
     * Добавляет элемент в модель и визуальное дерево
     */
    static addChild(parent, element) {
        this.insertChild(parent, element);
        parent.addChild(element);
    }

    static insertChild(parent, element) {
        const parentNode = this.elementsMap.get(parent);
        if (!parentNode) return;

        const childNode = this.getView(element);
        this.elementsMap.set(element, childNode);
        parentNode.addChild(childNode);
    }

    /**
     * Создает визуальный узел для элемента модели
     *
     */
    static getView(element) {
        const newNode = new TaskTreeNode(element);
        
        if (element instanceof Element) {
            let text = "";
            
            if (element instanceof Parameter) {
                // Сборка текста параметров из KeyValue
                text = element.getValues()
                    .map(vd => {
                        let line = vd.getKey();
                        if (vd.getValue()) line += `  - [${vd.getValue()}]`;
                        return line;
                    })
                    .join('\n');
            } else {
                text = element.getText();
            }

            if (text && text.trim() !== "") {
                newNode.addChild(new TaskTreeNode(text));
            }
        }

        // Рекурсивно добавляем детей
        const children = element.getChildren();
        if (children) {
            children.forEach(child => {
                const childNode = this.getView(child);
                this.elementsMap.set(child, childNode);
                newNode.addChild(childNode);
            });
        }

        return newNode;
    }
}