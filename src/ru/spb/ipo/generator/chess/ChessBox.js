import { ComplexElement } from '../base/ComplexElement.js';

/**
 * Описание выбранной шахматной фигуры и параметров доски.
 *
 */
export class ChessBox extends ComplexElement {
    constructor(figura, axis, isDiag, isPob) {
        super();
        this.figura = `фигур вида ${figura} на нашем поле`;
        this.axis = axis.toString();
        this.isDiag = isDiag;
        this.isPob = isPob;
    }

    generateXml() {
        return ""; // В оригинале метод пустой
    }

    toDescription() {
        return this.toString();
    }

    toString() {
        let text = this.isDiag ? `${this.axis} ${this.figura} без главной диагонали` : `${this.axis} ${this.figura}`;
        return this.isPob ? `${text} без побочной диагонали` : text;
    }
}