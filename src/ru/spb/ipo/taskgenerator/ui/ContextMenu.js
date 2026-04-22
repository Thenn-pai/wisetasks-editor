import { Config } from '../config/Config.js';
import { Actions } from '../util/Actions.js';

/**
 * Контекстное меню для узлов дерева.
 *
 */
export class ContextMenu {
    /**
     * Определяет, какие пункты меню активны для данного элемента
     *
     */
    getAvailableActions(operations) {
        return {
            canAddFunction: (operations & Config.ADD_FUNCTION) > 0,
            canAddSet: (operations & Config.ADD_SET) > 0,
            canAddCommand: (operations & Config.ADD_COMMAND) > 0,
            canDelete: (operations & Config.DELETE) > 0,
            canAddParam: (operations & Config.ADD_PARAM) > 0
        };
    }

    insertAction(type, kind) {
        Actions.insert(type, kind);
    }

    deleteAction() {
        Actions.delete();
    }
}