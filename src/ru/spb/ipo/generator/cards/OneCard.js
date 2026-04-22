/**
 * Описывает наличие конкретной карты в наборе.
 *
 */
export class OneCard {
    constructor(rank, suit) {
        this.rank = rank; // ListElement достоинства
        this.suit = suit; // ListElement масти
    }

    generateXml() {
        return `<function type="Or">
            <for name="i" first="1" last="\${length}" inc="1">
                <function type="And">
                    ${this.rank.generateXml()}
                    ${this.suit.generateXml()}
                </function>
            </for>
        </function>`;
    }

    toString() {
        return `имеется ${this.rank} ${this.suit}`;
    }
}