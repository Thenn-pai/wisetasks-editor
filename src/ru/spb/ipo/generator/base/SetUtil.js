/**
 * Утилиты для формирования XML-множеств.
 *
 */
export class SetUtil {
    static decart(origin) {
        return `\t<set type="DecartSet">\n<for name="di" first="1" last="\${length}" inc="1">\n${origin}</for>\t</set>\n`;
    }

    static numericSet(first, last) {
        return `<set type="NumericSet" first="${first}" last="${last}"/>\n`;
    }
}