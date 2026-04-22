import { ConstraintPanel } from '../base/ui/ConstraintPanel.js';
import { DetailDigitPanel } from './DetailDigitPanel.js';
import { DiifNumbersGenerator } from './DiifNumbersGenerator.js';
import { DiffNearGenerator } from './DiffNearGenerator.js';
import { OrderNumberGenerator } from './OrderNumberGenerator.js';

export class NumberFunctionPanel extends ConstraintPanel {
    constructor(gen) {
        super(gen);
        this.detailPanel = new DetailDigitPanel(null);
        
        this.conditions = [
            { text: "Набор состоит из различных цифр", gen: new DiifNumbersGenerator("Набор состоит из различных цифр") },
            { text: "Соседние цифры набора различны", gen: new DiffNearGenerator("Соседние цифры набора различны") },
            { text: "Цифры набора идут в убывающем порядке", gen: new OrderNumberGenerator(-1) },
            { text: "Цифры набора идут в возрастающем порядке", gen: new OrderNumberGenerator(1) },
            { text: "Цифры набора идут в неубывающем порядке", gen: new OrderNumberGenerator(2) },
            { text: "Цифры набора идут в невозрастающем порядке", gen: new OrderNumberGenerator(-2) }
        ];
    }

    addPredefinedCondition(index) {
        this.addCondition(this.conditions[index].gen);
    }
}