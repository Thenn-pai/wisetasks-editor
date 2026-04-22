/**
 * Класс для сборки итогового XML документа задачи.
 *
 */
export class XmlGenerator {
    
    /**
     * Формирует текстовое описание и параметры задачи
     * @param {string} functionList - список условий текстом
     * @param {number|string} numbers - количество вытаскиваемых карт
     */
    getDescription(functionList, numbers) {
        const genParam = `
<description-params>
    <param name="length">
        <value>${numbers}</value>
    </param>
</description-params>`;

        return `<description>\n<![CDATA[${functionList}\n]]></description>\n${genParam}`;
    }

    /**
     * Генерирует структуру исходного множества (колоды)
     *
     */
    getSource(coloda, numbers) {
        // Логика: делим общее число карт на 4 масти, чтобы получить диапазон достоинств
        const ranksRange = Math.floor(coloda / 4);
        
        return `
<sourceSet> 
    <set type="CombinationSet" length="${numbers}"> 
        <set type="DecartSet">
            <set type="NumericSet" first="1" last="${ranksRange}"/>
            <set type="NumericSet" first="1" last="4"/>
        </set>
    </set>
</sourceSet>`;
    }

    /**
     * Создает блок верификатора (проверки условий)
     */
    getVerifier(func) {
        return `
<verifier type="CountVerifier">
    <function type="And">
        <constElement>1</constElement>
        ${func}
    </function>
</verifier>`;
    }

    /**
     * Финальная сборка всего XML
     */
    generateFullXml(coloda, number, functionList, func, title) {
        let xml = `<?xml version="1.0" encoding="windows-1251"?>\n`;
        xml += `<task title="${title}">\n`;
        xml += this.getDescription(functionList, number) + "\n";
        xml += ` <mathDescription>\n`;
        xml += this.getSource(parseInt(coloda), number) + "\n";
        xml += this.getVerifier(func) + "\n";
        xml += ` </mathDescription>\n`;
        xml += `</task>`;
        
        return xml;
    }
}