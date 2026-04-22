/**
 * Утилиты для генерации XML-функций.
 *
 */
export class FuncUtil {
    static projection(axis, body = "<current-set-element/>") {
        return `<function type="Projection" axis="${axis}">\n\t\t${body}\n</function>\n`;
    }

    static equals(first, second) {
        return `<function type="Equals">\n\t\t${first}\n\t\t${second}\n</function>\n`;
    }

    static func(name, ...args) {
        const body = args.map(arg => `\t\t${arg}\n`).join('');
        return `<function type="${name}">\n${body}</function>\n`;
    }

    static constElement(value) {
        return `<constElement>${value}</constElement>\n`;
    }
}