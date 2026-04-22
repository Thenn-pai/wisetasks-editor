import { Config } from '../config/Config.js';
import { Element } from '../model/Element.js';

/**
 * Утилиты для работы с элементами модели.
 *
 */
export class ElementUtil {
    static ELEMENT = 1;
    static ATTRIBUTE = 2;
    static COMMENT = 3;
    
    static E_SET = 1;
    static E_FUNCTION = 2;	
    static E_TASK = 3;
    static E_DESCRIPTION = 4;
    static E_PARAMETER = 6;
    static E_DESC_PARAMETERS = 7;
    static E_VER_PARAMETERS = 8;
    static E_SOURCE_SET = 9;	
    static E_UNKNOWN = 10;
    static E_ADDITION = 11;
    
    static getSafe(str) {
        if (str === null || str === undefined) return "";
        return str.trim();
    }

    static getPresentableText(elementText) {
        return this.getSafe(elementText);
    }
    
    static isConstByName(name) {
        return name === "constElement" || name === "current-set-element";
    }

    static isConst(element) {
        return this.isConstByName(element.getName());
    }

    static getElementType(element) {
        if (!element || !element.getName) return this.E_UNKNOWN;
        
        let type = "";
        // Заглушка: в оригинале здесь был запрос к Config.getInstance()
        // В JS мы можем просто проверять имя напрямую
        if (this.isConst(element) || element.getName() === Config.TYPE_FUNCTION) {
            return this.E_FUNCTION;
        } 		
        if (element.getName() === Config.TYPE_SET) return this.E_SET;
        if (element.getName() === Config.TYPE_PARAM) return this.E_PARAMETER;
        if (element.getName() === Config.TYPE_ROOTELEMENT) return this.E_TASK;
        if (element.getName() === Config.TYPE_DESCRIPTION) return this.E_DESCRIPTION;
        
        return this.E_UNKNOWN;		
    }
}