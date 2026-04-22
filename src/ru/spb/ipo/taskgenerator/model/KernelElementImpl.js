import { KernelElement } from './KernelElement.js';

/**
 * Базовая реализация узла дерева.
 *
 */
export class KernelElementImpl extends KernelElement {
    constructor() {
        super();
        this.myChildren = [];
        this.myParent = null;
    }

    addChild(child) {
        if (!child) return;
        child.setParent(this);
        this.myChildren.push(child);
    }

    getChildren() {
        return this.myChildren;
    }

    getParent() {
        return this.myParent;
    }

    setParent(parent) {
        this.myParent = parent;
    }

    removeChild(child) {
        const index = this.myChildren.indexOf(child);
        if (index > -1) {
            this.myChildren.splice(index, 1);
        }
    }
}