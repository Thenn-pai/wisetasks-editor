/**
 * Логика управления таблицей атрибутов (имя = значение).
 *
 */
export class AttributeTableModel {
    constructor() {
        this.columns = ["Атрибут", "Значения"];
        this.data = []; // Массив объектов {key, value}
    }

    /**
     * Обновляет данные в таблице
     * @param {Array} pairs - массив массивов [[key, value], ...]
     */
    updateTable(pairs) {
        if (!pairs || pairs.length === 0) {
            this.data = [];
            return;
        }
        this.data = pairs.map(p => ({ key: p[0], value: p[1] }));
    }

    getValueAt(row, col) {
        const item = this.data[row];
        if (!item) return "";
        return col === 0 ? item.key : item.value;
    }

    getRowCount() {
        return this.data.length;
    }
}