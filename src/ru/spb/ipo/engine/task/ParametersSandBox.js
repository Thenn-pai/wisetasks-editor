import { Parameter } from './Parameter.js';

/**
 * Класс для управления наборами параметров задачи.
 * Отвечает за генерацию комбинаций значений и случайный выбор.
 * Аналог ru.spb.ipo.engine.task.ParametersSandbox
 */
export class ParametersSandbox {
    constructor(node) {
        this.type = "";
        this.class2parameters = new Map(); // TreeMap заменен на Map (в JS порядок вставки сохраняется)
        this.parameters = [];
        this.parameterNames = null;
        this.classedParameters = null;

        if (!node || node.isEmptyWrapper()) {
            this.type = "none";
            return;
        }

        this.type = node.getAttrIfExists("type", "none");

        // Парсим параметры из узлов XML
        const parameterNodes = node.getChilds("parameter");
        for (const pNode of parameterNodes) {
            const name = pNode.getAttr("name");
            const pClass = pNode.getAttr("class");
            const values = [];

            // Собираем значения для каждого параметра
            const valueNodes = pNode.getChilds("value");
            for (const vNode of valueNodes) {
                // Здесь предполагается наличие объекта или структуры Value
                values.push({
                    text: vNode.getText(),
                    value: vNode.getAttrIfExists("value", vNode.getText())
                });
            }

            const parameter = new Parameter(name, pClass, values);
            this.parameters.push(parameter);

            if (!this.class2parameters.has(pClass)) {
                this.class2parameters.set(pClass, []);
            }
            this.class2parameters.get(pClass).push(parameter);
        }
    }

    isEmpty() {
        return this.type === "none" || this.parameters.length === 0;
    }

    /**
     * Возвращает итератор по всем возможным комбинациям параметров.
     * Реализовано через генератор JavaScript.
     */
    *getIterator() {
        if (this.isEmpty()) return;

        // Подготовка индексов для перебора (аналог счетчика в Java)
        const counts = this.parameters.map(p => p.getValues().length);
        const currentIndices = new Array(this.parameters.length).fill(0);
        
        let hasNext = true;
        while (hasNext) {
            const result = {};
            for (let i = 0; i < this.parameters.length; i++) {
                const parameter = this.parameters[i];
                const valueIndex = currentIndices[i];
                const value = parameter.getValues()[valueIndex];
                
                result[parameter.getName()] = value.value;
                result[parameter.getName() + "-text"] = value.text;
            }

            yield result;

            // Логика инкремента индексов (счетчик)
            for (let i = 0; i < currentIndices.length; i++) {
                currentIndices[i]++;
                if (currentIndices[i] < counts[i]) {
                    break;
                } else {
                    if (i === currentIndices.length - 1) {
                        hasNext = false;
                    }
                    currentIndices[i] = 0;
                }
            }
        }
    }

    /**
     * Получить случайный набор параметров
     */
    getRandomParameters() {
        if (this.isEmpty()) {
            return {};
        }

        // Кэшируем все комбинации, если это еще не сделано
        if (!this.classedParameters) {
            this.classedParameters = Array.from(this.getIterator());
        }

        const randomIndex = Math.floor(Math.random() * this.classedParameters.length);
        return this.classedParameters[randomIndex];
    }

    /**
     * Список имен всех параметров
     */
    getParameterNames() {
        if (this.isEmpty()) return [];
        if (!this.parameterNames) {
            this.parameterNames = Object.freeze(this.parameters.map(p => p.getName()));
        }
        return this.parameterNames;
    }
}