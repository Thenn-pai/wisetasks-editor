import { BaseGenerator } from '../base/BaseGenerator.js';
import { FuncUtil } from '../base/FuncUtil.js';

/**
 * Генератор XML-описания для задач с корзинами.
 *
 */
export class BasketXmlGenerator extends BaseGenerator {
    static ballColors = ["белый", "черный", "синий", "красный", "зеленый"];
    
    // Цвета в HEX для веба
    static colors = ["#FFFFFF", "#505050", "#0064FA", "#FF0000", "#008000"];

    constructor(source, func, task) {
        super(source, func, task);
    }

    getDescription(sourceParams, funcParams, taskParams) {
        let genParam = this.getParams();
        const images = taskParams.images || [];
        
        // В этой папке картинки лежат в подкаталоге maras
        let imageStr = images.map(str => `<img>maras/${str}</img>`).join('\n');
        if (imageStr.length > 0) {
            imageStr = `<imgs>maras/${imageStr}</imgs>`;
        }

        const isCont = funcParams.isCont || false;
        const toFind = funcParams.toFind || [];
        let toFindString = "";

        // Собираем строку цветов для сравнения
        toFind.forEach(ce => {
            for (let j = 0; j < ce.numbers; j++) {
                toFindString += ce.color; 
            }
        });

        const condition = `<function type="${isCont ? 'Equals' : 'Like'}">\n` +
            `\t\t<current-set-element/>\n` +
            `\t\t${FuncUtil.constElement(toFindString)}\n` +
            `</function>\n`;

        // Здесь должна быть полная сборка XML (как в BaseGenerator)
        return condition; 
    }
}