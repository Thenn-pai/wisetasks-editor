import { Verifier } from './Verifier.js';
// import { Function } from '../functions/Function.js';

/**
 * Верификатор для прямой проверки ответа через функцию.
 * Аналог ru.spb.ipo.engine.verifiers.AnswerVerifier
 */
export class AnswerVerifier extends Verifier {

    constructor(node) {
        super(node);
        this.fn = null; // Функция правильного ответа

        this.init(node);
    }

    init(node) {
        // В Java: node.getChild(VERIFIER).getChild(FUNCTION)
        // VERIFIER и FUNCTION — это константы "verifier" и "function"
        const verifierNode = node.getChild("verifier");
        if (verifierNode) {
            const funcNode = verifierNode.getChild("function");
            if (funcNode) {
                // this.fn = Function.generateFunction(funcNode);
            }
        }
    }

    /**
     * Проверка ответа
     * @param {VerifySandbox} sandbox 
     */
    verify(sandbox) {
        if (!this.fn) return false;

        // Вычисляем правильный ответ системы
        // В данном контексте функция вычисляется без входного элемента (null)
        const systemAnswer = this.fn.compute(null);

        // Получаем ответы пользователя
        const userAnswers = sandbox.clientTask.getAnswers();

        if (!userAnswers || userAnswers.length === 0) return false;

        // Сравнение. В Java: systemAnswer.equals(answers[0])
        // Предполагаем, что у результата функции есть метод equals
        if (systemAnswer && typeof systemAnswer.equals === 'function') {
            return systemAnswer.equals(userAnswers[0]);
        }

        // Запасной вариант сравнения для примитивов
        return systemAnswer == userAnswers[0];
    }
}