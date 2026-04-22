/**
 * Узел визуального дерева задач.
 *
 */
export class TaskTreeNode {
    constructor(content) {
        // Может принимать либо KernelElement, либо строку (для текстовых узлов)
        if (typeof content === 'string') {
            this.myElement = null;
            this.text = content;
        } else {
            this.myElement = content;
            this.text = content.getPresentableString();
        }
        this.children = [];
        this.parent = null;
    }

    isText() {
        return this.myElement === null;
    }

    getElement() {
        return this.myElement;
    }

    getText() {
        return this.text;
    }

    setText(text) {
        this.text = text;
    }

    addChild(child) {
        child.parent = this;
        this.children.push(child);
    }

    getChildAt(index) {
        return this.children[index];
    }

    getChildCount() {
        return this.children.length;
    }

    // Возвращает строковое представление для отрисовки в UI
    getPresentableString() {
        if (this.myElement) {
            return this.myElement.getPresentableString();
        }
        return this.text;
    }

    /**
     * Ищет дочерний текстовый узел (используется для редактирования CDATA)
     *
     */
    getTextChild() {
        for (let child of this.children) {
            if (child.isText()) return child;
        }
        const newText = new TaskTreeNode("");
        this.addChild(newText);
        return newText;
    }
}