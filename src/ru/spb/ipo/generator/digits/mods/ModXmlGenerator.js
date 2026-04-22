import { BaseGenerator } from '../../base/BaseGenerator.js';

/**
 * Генератор XML-описания для задач на остаток от деления (mod).
 *
 */
export class ModXmlGenerator extends BaseGenerator {
    constructor(sourceParams, funcParams, taskParams) {
        super(sourceParams, funcParams, taskParams);
    }

    /**
     * Создает блок проверки ответа (использует встроенный парсер выражений).
     *
     */
    getVerifier(funcParams) {
        let sb = `<verifier type="AnswerVerifier">\n`;
        sb += `<function type="Parser" exp="${funcParams.expression}" mod="${funcParams.mod}">\n`;
        sb += `</function>\n`;
        sb += `</verifier>`;
        return sb;
    }

    /**
     * Формирует текстовое описание задачи.
     *
     */
    generateDescription() {
        // Берем значения из funcParams (так как они передаются туда из ModSetPanel)
        return `Какой остаток дает число ${this.funcParams.expression} при делении на ${this.funcParams.mod}?`;
    }

    getParams() {
        return "";
    }

    getSource(sourceParams) {
        return "";
    }
}