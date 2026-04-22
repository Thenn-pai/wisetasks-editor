import { KernelElementImpl } from './KernelElementImpl.js';

/**
 * Комментарий к узлу дерева.
 *
 */
export class Comment extends KernelElementImpl {
    constructor(text) {
        super();
        this.myText = text;
    }

    addChild(child) {
        throw new Error("UnsupportedOperationException");
    }

    getChildren() {
        return [];
    }

    getPresentableString() {
        // Аналог HtmlUtil.getHtmlString
        return `<span style="color: gray">&lt;!--${this.myText}--&gt;</span>`; 
    }

    getText() {
        return this.myText;
    }
}