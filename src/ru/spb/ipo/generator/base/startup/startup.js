import { MenuFrame } from './MenuFrame.js';

/**
 * Главный входной файл для генераторов.
 *
 */
export class Startup {
    static main() {
        console.log("Запуск системы генераторов...");
        const menu = new MenuFrame();
        menu.show();
    }
}

// Запуск, если файл вызван напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
    Startup.main();
}