import { Verifier } from './Verifier.js';
// Зависимости, которые потребуются в будущем:
// import { Set as EngineSet } from '../sets/Set.js';
// import { Function } from '../functions/Function.js';
// import { ToDigit } from '../functions/ToDigit.js';
// import { FractionalNumber } from '../utils/FractionalNumber.js';

/**
 * Верификатор для проверки списков ответов.
 * Аналог ru.spb.ipo.engine.verifiers.ListVerifier
 */
export class ListVerifier extends Verifier {

    constructor(node) {
        super(node);
        this.af = null;
        this.source = null;
        this.normilizer = null;

        this.init(node);
    }

    init(node) {
        // Извлекаем исходное множество
        const sourceSetNode = node.getChild("sourceSet")?.getChild("set");
        if (sourceSetNode) {
            // this.source = EngineSet.generateSet(sourceSetNode);
        }

        const verifierNode = node.getChild("verifier");
        if (verifierNode) {
            // Функция фильтрации элементов
            const funcNode = verifierNode.getChild("function");
            // this.af = Function.generateFunction(funcNode);

            const norm = verifierNode.getAttribute("normalize");
            if (norm) {
                // this.normilizer = new Parser().parse(norm);
            }
        }
    }

    /**
     * Проверка списка ответов
     * @param {VerifySandbox} sandbox 
     */
    verify(sandbox) {
        if (!this.source || !this.af) return false;

        // Получаем ответы пользователя и помещаем их в Set для быстрого поиска
        // В JS используем стандартный Set
        const userAnswers = new Set();
        const rawAnswers = sandbox.clientTask.getAnswers(); // Предполагаем массив ответов
        
        rawAnswers.forEach(ans => {
            // В Java отсекались null, в JS добавим проверку на валидность
            if (ans !== undefined && ans !== null) {
                userAnswers.add(ans.toString()); 
            }
        });

        const size = this.source.getSize();
        let iteration = 0;
        const it = this.source.iterator();

        while (it.hasNext()) {
            const e = it.next();

            // Если элемент 'e' должен быть в ответе по условию функции 'af'
            if (this.af.compute(e) === true) {
                // Вычисляем значение, которое должен был ввести пользователь
                // В Java: ToDigit.computeAnswer(e)
                const expectedAnswer = e.toDigit(); // Упростим логику до метода элемента

                if (userAnswers.has(expectedAnswer.toString())) {
                    // Если пользователь ввел это число, удаляем его из списка "ожиданий"
                    userAnswers.delete(expectedAnswer.toString());
                } else {
                    // Если число должно быть, но пользователь его не ввел — ошибка
                    return false;
                }
            }
            
            // Обновляем шкалу прогресса
            Verifier.setCompleted(iteration++ / size);
        }

        Verifier.setCompleted(1.0);

        // Если после проверки всех системных элементов в userAnswers еще что-то осталось,
        // значит пользователь ввел лишние (неправильные) числа.
        // Если размер 0 — всё идеально.
        return userAnswers.size === 0;
    }
}