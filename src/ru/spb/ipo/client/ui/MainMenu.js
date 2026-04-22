import { InfoDialog } from './common/InfoDialog.js';
import { Actions } from './utils/Actions.js';

/**
 * Логика главного меню.
 *
 */
export class MainMenu {
    constructor(client) {
        this.client = client;
    }

    // Аналог клика на "О программе..."
    actionAbout() {
        const info = new InfoDialog();
        info.show();
    }

    // Аналог клика на "Выход"
    actionExit() {
        Actions.close(0, this.client);
    }

    // Аналог выбора теста
    actionChooseTest() {
        this.client.openTests();
    }
}