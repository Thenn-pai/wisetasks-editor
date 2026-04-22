import { Verifier } from './Verifier.js';
//import { BigInt } from '../utils/BigIntPolyfill.js'; // Или используем встроенный BigInt

/**
 * Верификатор для поиска индекса (порядкового номера) элемента.
 * Аналог ru.spb.ipo.engine.verifiers.IndexVerifier
 */
export class IndexVerifier extends Verifier {

    constructor(node) {
        super(node);
        this.af = null;            // Функция-фильтр
        this.element2index = null; // Элемент, индекс которого ищем
        this.source = null;        // Исходное множество

        this.init(node);
    }

    init(node) {
        // Извлекаем множество
        const sourceSetNode = node.getChild("sourceSet")?.getChild("set");
        if (sourceSetNode) {
            // this.source = Set.generateSet(sourceSetNode);
        }

        const verifierNode = node.getChild("verifier");
        if (verifierNode) {
            // Функция, определяющая, какие элементы участвуют в нумерации
            const funcNode = verifierNode.getChild("function");
            // this.af = Function.generateFunction(funcNode);

            // Целевой элемент (константа), индекс которого нужно найти
            const constElemNode = verifierNode.getChild("indexingElement")?.getChild("constElement");
            if (constElemNode) {
                // В Java: AbstractFunction.generateAbstractFunction
                // this.element2index = AbstractFunction.generateAbstractFunction(constElemNode);
            }
        }
    }

    /**
     * Логика проверки индекса
     * @param {VerifySandbox} sandbox 
     */
    verify(sandbox) {
        if (!this.source || !this.af || !this.element2index) return false;

        const size = this.source.getSize();
        let iteration = 0;
        let count = 0n; // Счетчик найденных подходящих элементов (BigInt)
        let isFound = false;

        const it = this.source.iterator();

        while (it.hasNext()) {
            const e = it.next();

            // Если элемент удовлетворяет условию функции
            if (this.af.compute(e) === true) {
                count += 1n;

                // Проверяем, не является ли текущий элемент тем самым, что мы ищем
                // В JS используем метод equals, который должен быть у объектов Element
                if (e.equals(this.element2index)) {
                    isFound = true;
                    break; // Нашли, останавливаем цикл
                }
            }

            // Обновляем прогресс
            Verifier.setCompleted(iteration++ / size);
        }

        Verifier.setCompleted(1.0);

        if (isFound) {
            const userAnswers = sandbox.clientTask.getAnswers();
            // Сравниваем полученный порядковый номер с первым ответом пользователя
            // Приводим BigInt к строке или числу для корректного сравнения
            return count.toString() === userAnswers[0]?.toString();
        }

        return false;
    }
}