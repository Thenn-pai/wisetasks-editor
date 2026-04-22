import { ElementUtil } from './ElementUtil.js';

/**
 * Утилита для раскраски текста (эмуляция HTML-тегов для Swing).
 *
 */
export class HtmlUtil {
    static getHtmlString(source, color = null) {
        if (color) {
            return `<span style="color: ${color}">${ElementUtil.getSafe(source)}</span>`;
        }
        return `<div>${ElementUtil.getSafe(source)}</div>`; 
    }
    
    static colorize(code, color) {
        return `<span style="color: ${color}">${ElementUtil.getSafe(code)}</span>`;
    }
    
    static colorizeAttribute(attribute) {
        const name = this.colorize(attribute.getName(), "blue");
        const value = this.colorize(attribute.getValue(), "green");
        return `${name} = ${value}`;
    }
}