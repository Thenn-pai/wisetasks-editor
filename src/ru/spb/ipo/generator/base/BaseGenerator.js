/**
 * Скелет для XML-генераторов. Формирует XML описание задачи.
 *
 */
export class BaseGenerator {
    constructor(sourceParams, funcParams, taskParams) {
        this.sourceParams = sourceParams;
        this.funcParams = funcParams;
        this.taskParams = taskParams;
    }

    // Формирование параметров описания
    getParams() {
        return `<description-params>\n\t<param name="length">\n \t\t<value>\${nabor}</value>\n \t</param>\n</description-params>`;
    }

    // Сборка полного XML описания задачи
    getDescription(sourceParams, funcParams, taskParams) {
        let genParam = this.getParams();
        const images = taskParams.images || [];
        let imageStr = images.map(str => `<img>${str}</img>`).join('\n');
        
        if (imageStr.length > 0) {
            imageStr = `<imgs>${imageStr}</imgs>`;
        }

        genParam = this.replace(genParam, taskParams);
        // ... (логика сборки строки XML)
        return genParam; 
    }

    // Утилита замены параметров ${key}
    replace(text, values) {
        let result = text;
        for (const key in values) {
            const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
            result = result.replace(regex, values[key]);
        }
        return result;
    }

    static wrapString(str) {
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;");
    }
}