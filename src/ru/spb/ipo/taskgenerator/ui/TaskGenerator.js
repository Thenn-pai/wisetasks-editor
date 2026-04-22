import { TaskTreeModel } from './TaskTreeModel.js';
import { MainMenu } from './MainMenu.js';
import { GraphicFactory } from './GraphicFactory.js';

/**
 * Главный класс приложения "Генератор задач".
 *
 */
export class TaskGenerator {
    static TITLE = "Редактор задач";
    static instance = null;

    constructor() {
        TaskGenerator.instance = this;
        this.modelTree = new TaskTreeModel();
        this.mainMenu = new MainMenu();
        
        // Регистрация корневого элемента в фабрике
        GraphicFactory.elementsMap.set(
            this.modelTree.getRoot().getElement(), 
            this.modelTree.getRoot()
        );

        console.log(`${TaskGenerator.TITLE} инициализирован.`);
    }

    static getFrame() {
        return TaskGenerator.instance;
    }

    /**
     * Обновляет заголовок окна в зависимости от файла
     */
    setTitleWithFile(fileName) {
        const name = fileName || "Новая задача";
        document.title = `${TaskGenerator.TITLE} - ${name}`;
    }
}