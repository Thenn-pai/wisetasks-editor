import { Config } from '../config/Config.js';
import { Element } from '../model/Element.js';
import { Comment } from '../model/Comment.js';
import { Parameter } from '../model/Parameter.js';
import { ElementUtil } from './ElementUtil.js';

/**
 * Фабрика элементов модели.
 *
 */
export class ElementFactory {
    
    // В JS стандартные типы узлов DOM:
    static TEXT_NODE = 3;
    static CDATA_SECTION_NODE = 4;
    static COMMENT_NODE = 8;

    static buildElementFromNode(node) {
        const type = node.nodeType;
        if (type === this.TEXT_NODE || type === this.CDATA_SECTION_NODE) {
            let text = ElementUtil.getSafe(node.nodeValue);
            if (text !== "") return new Comment(text);
        } else if (type === this.COMMENT_NODE) {
            let text = ElementUtil.getSafe(node.nodeValue);
            if (text !== "") return new Comment(text);
        } else {
            let element = null;
            if (node.nodeName === Config.TYPE_PARAM) {
                element = new Parameter();
            } else {
                element = new Element(node.nodeName); 
            }			 
            
            // Чтение атрибутов XML
            if (node.attributes) {
                for (let i = 0; i < node.attributes.length; i++) {
                    const attr = node.attributes[i];
                    element.addAttribute(attr.nodeName, attr.nodeValue);                
                }
            }
            return element;
        }
        return null;
    }
    
    static buildElementFromType(type, kind) {
        let name = "";		
        if (type === ElementUtil.E_FUNCTION) {
            name = Config.TYPE_FUNCTION;			
        } else if (type === ElementUtil.E_SET) {
            name = Config.TYPE_SET;
        } else if (type === ElementUtil.E_ADDITION) {
            name = kind;
        } else if (type === ElementUtil.E_PARAMETER) {
            name = Config.TYPE_PARAM;
        } else {
            name = kind; // Упрощение
        }
        
        if (type === ElementUtil.E_PARAMETER) {
            return new Parameter();
        }
        if (ElementUtil.isConstByName(kind)) {
            return new Element(kind);
        }
        
        const element = new Element(name);
        if (type === ElementUtil.E_SET) {
            element.addAttribute("type", kind);
        } else if (type === ElementUtil.E_FUNCTION) {
            element.addAttribute("type", kind);
        }
        return element;
    }
}