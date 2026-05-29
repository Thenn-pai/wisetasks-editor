
export class BaseGeneratorUI {
    constructor() {
        this.imagesList = [];
        this.file = null;
        this.isModified = false;
    }

   
    isEmpty(str) {
        return str === null || str === "";
    }

   
    getConditions(functionListModel) {
       
        return functionListModel || [];
    }

   
    getHelpString() {
        return "Генератор задач";
    }

    saveTask(taskData) {
        if (!window.taskStore) return;
        const task = {
            title: taskData.title || 'Без названия',
            descriptionHtml: taskData.descriptionHtml || '',
            solutionHtml: taskData.solutionHtml || '',
            answerText: taskData.answerText || '',
            category: taskData.category || 'Общее',
            ...taskData
        };
        return window.taskStore.addTask(task);
    }
}