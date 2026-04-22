import { SimpleVerifier } from './SimpleVerifier.js';

/**
 * Верификатор для подсчета количества (вариант SimpleVerifier).
 * Аналог ru.spb.ipo.engine.verifiers.CountVerifier
 */
export class CountVerifier extends SimpleVerifier {
    /**
     * @param {Node} node - XML узел с описанием задачи
     */
    constructor(node) {
        // Просто вызываем конструктор родителя
        super(node);
    }
}