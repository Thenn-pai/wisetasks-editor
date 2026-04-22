import { TaskTreeNode } from './TaskTreeNode.js';
import { Element } from '../model/Element.js';

/**
 * Модель всего дерева задачи.
 *
 */
export class TaskTreeModel {
    constructor() {
        // Создаем корневой узел <root>
        this.root = new TaskTreeNode(new Element("root"));
    }

    getRoot() {
        return this.root;
    }
}