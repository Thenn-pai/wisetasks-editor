export class DetailDigitPanel {
    constructor(parent) {
        this.parent = parent;
        this.leftCond = [];
        this.rightCond = [];
        this.condition = "=";
    }

    addToLeft(index) { this.leftCond.push(index.toString()); }
    addToRight(index) { this.rightCond.push(index.toString()); }
    
    // В JS возвращаем объект генератора, который нужно будет импортировать в месте вызова
    createGenerator() {
        // Требуется импорт DetailDigitGenerator там, где этот метод вызывается
        return { type: "DetailDigitGenerator", left: [...this.leftCond], right: [...this.rightCond], cond: this.condition };
    }
}