import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';

export class NumberSetPanel extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        this.naborSize = "5"; 
        this.maxDigit = "9";
        this.isNumberFlag = true;
    }

    fillMaps(source, func, task) {
        source.nabor = this.naborSize;
        source.maxDigit = this.maxDigit;
        source.isNumber = this.isNumberFlag;
    }
}