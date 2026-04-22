import { AbstractFunction } from './AbstractFunction.js';

export class Function extends AbstractFunction {
    constructor() {
        super();
        this.fns = []; // Массив вложенных функций
    }

    async initFunction(node) {
        const ns = node.getFunctionList();
        this.fns = new Array(ns.length);
        for (let i = 0; i < ns.length; i++) {
            this.fns[i] = await AbstractFunction.generateAbstractFunction(ns[i]);
        }
    }

    /**
     * Динамически создает экземпляр функции по атрибуту 'type'.
     */
    static async generateFunction(node) {
        const shortType = node.getAttr("type");
        try {
            // В JS используем динамический импорт вместо Class.forName
            const module = await import(`./${shortType}.js`);
            const FnClass = module[shortType];
            const fn = new FnClass();
            await fn.initFunction(node);
            return fn;
        } catch (e) {
            throw new Error(`Ошибка десериализации функции ${shortType}: ${e.message}`);
        }
    }
}