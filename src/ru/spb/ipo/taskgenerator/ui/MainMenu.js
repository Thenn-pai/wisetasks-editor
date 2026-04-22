import { Actions } from '../util/Actions.js';

/**
 * Логика главного меню приложения.
 *
 */
export class MainMenu {
    onNewTask() { Actions.newTask(); }
    
    onOpen(file) { Actions.open(file); }
    
    onSave(file) { Actions.save(file); }

    onAddDescriptionParams() { Actions.addParameterSet(true); }

    onAddVerifierParams() { Actions.addParameterSet(false); }

    onExit() {
        if (confirm("Вы уверены, что хотите выйти?")) {
            window.close();
        }
    }
}