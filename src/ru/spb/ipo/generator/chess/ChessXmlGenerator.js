import { BaseGenerator } from '../base/BaseGenerator.js';
import { ChessStringGeneration } from './ChessStringGeneration.js';

/**
 * Генератор XML-описания для шахматных задач.
 *
 */
export class ChessXmlGenerator extends BaseGenerator {
    constructor(sourceParams, funcParams, taskParams) {
        super(sourceParams, funcParams, taskParams);
        this.n = parseInt(sourceParams.nabor);
        this.m = parseInt(sourceParams.resultX);
    }

    getDescription(sourceParams, funcParams, taskParams) {
        let genParam = this.getParams(funcParams.numberFigur);
        const images = taskParams.images || [];
        
        let imageStr = images.map(str => `<img>chess/${str}</img>`).join('\n'); // Картинки лежат в папке chess/
        if (imageStr.length > 0) {
            imageStr = `<imgs>${imageStr}</imgs>`;
        }

        genParam = this.replace(genParam, sourceParams);
        return `<description>\n<![CDATA[${taskParams.description}\n]]>${imageStr}</description>\n${genParam}`;
    }

    getVerifier(funcParams) {
        let sb = ChessStringGeneration.Starter();
        let rookM = 0;
        const numberFigur = funcParams.numberFigur;
        const isKill = funcParams.isKill;

        // Выбор логики в зависимости от фигуры
        switch (funcParams.chooseY) {
            case 1: sb += ChessStringGeneration.Slon(isKill); rookM = numberFigur - 1; break;
            case 2: sb += ChessStringGeneration.Koni(isKill); rookM = numberFigur; break;
            case 3: sb += ChessStringGeneration.Ladya(isKill); rookM = numberFigur - 1; break;
            case 5: sb += ChessStringGeneration.Ferz(isKill); rookM = numberFigur - 1; break;
            case 6: sb += ChessStringGeneration.Pesh(isKill); rookM = numberFigur - 1; break;
            case 7: sb += ChessStringGeneration.Korol(isKill); rookM = numberFigur - 1; break;
        }

        if (isKill) rookM = numberFigur;
        // Диагонали
        if (funcParams.isDiag) sb += ChessStringGeneration.Diag();
        if (funcParams.isPob) sb += ChessStringGeneration.PobDiag(this.n);

        sb += ChessStringGeneration.Footer(rookM, numberFigur);
        return sb;
    }

    getParams(numberFigur) {
        return `<description-params>\n\t<param name="n">\n \t\t<value>\${nabor}</value>\n \t</param>\n\t<param name="m">\n \t\t<value>\${resultX}</value>\n \t</param>\n\t<param name="rook">\n \t\t<value>${numberFigur}</value>\n \t</param>\n</description-params>`;
    }
}