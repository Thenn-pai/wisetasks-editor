import { Logger } from '../../client/ui/utils/Logger.js';
import { ClientUI } from '../../client/ui/ClientUI.js';

/**
 * Базовый класс для всех верификаторов.
 * Аналог ru.spb.ipo.engine.verifiers.Verifier
 */
export class Verifier {
    constructor(node) {
        this.node = node;
    }

    /**
     * Основной метод проверки. Должен быть переопределен в наследниках.
     * @param {VerifySandbox} sandbox 
     * @returns {boolean}
     */
    verify(sandbox) {
        throw new Error("Метод verify() должен быть реализован в конкретном верификаторе");
    }

    /**
     * Статическая фабрика для создания верификатора.
     * В JS заменяет механизм Reflection (Class.forName).
     */
    static async createVerifier(node) {
        // Получаем узел <verifier>
        const verifierNode = node.getChild("verifier"); // Предполагается наличие метода getChild
        if (!verifierNode) {
            throw new Error("Не найден узел verifier в задаче");
        }

        const type = verifierNode.getAttribute("type");
        
        try {
            // В JS мы используем динамический импорт или заранее созданный реестр классов.
            // Для примера используем динамический импорт:
            const module = await import(`./${type}.js`);
            const VerifierClass = module.default || module[type];
            
            return new VerifierClass(node);
        } catch (e) {
            console.error(e);
            throw new Error(`Не могу найти или загрузить класс верификатора: ${type}`);
        }
    }

    /**
     * Обновляет прогресс-бар в интерфейсе.
     * @param {number} value - значение от 0 до 1
     */
    static setCompleted(value) {
        // В ClientUI мы уже реализовали метод setProcessed
        if (ClientUI.instance) {
            ClientUI.instance.setProcessed(value);
        }
    }
}