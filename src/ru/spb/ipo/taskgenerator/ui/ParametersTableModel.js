import { AttributeTableModel } from './AttributeTableModel.js';

/**
 * Таблица для редактирования параметров генерации/верификации.
 *
 */
export class ParametersTableModel extends AttributeTableModel {
    constructor() {
        super();
        this.columns = ["Значение", "Описание"];
    }
}