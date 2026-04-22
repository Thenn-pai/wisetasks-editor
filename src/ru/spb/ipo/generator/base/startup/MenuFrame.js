/**
 * Логика выбора доступных генераторов.
 *
 */
export class MenuFrame {
    constructor() {
        // Список доступных типов генераторов из оригинального конструктора
        this.generators = [
            { id: 'basket', name: 'Корзины' },
            { id: 'cards', name: 'Карты' },
            { id: 'chess', name: 'Шахматы' },
            { id: 'numbers', name: 'Числа' },
            { id: 'words', name: 'Слова' },
            { id: 'equation', name: 'Уравнения' },
            { id: 'mod', name: 'Остатки (Mod)' },
            { id: 'div', name: 'Делители (Div)' }
        ];
    }

    /**
     * Эмуляция отображения меню
     */
    show() {
        console.log("=== Доступные генераторы задач ===");
        this.generators.forEach(g => console.log(`- ${g.name} [${g.id}]`));
        console.log("Последняя редакция: Май 2016");
    }

    /**
     * Метод для запуска конкретного генератора (аналог нажатия кнопки)
     *
     */
    async launchGenerator(id) {
        console.log(`Запуск генератора: ${id}...`);
        // В будущем здесь будет динамический импорт нужного класса
    }
}