import { ServerTask } from './ServerTask.js';
import { NodeImpl } from './NodeImpl.js';
import { ParametersSandbox } from './ParametersSandbox.js';
import { Preprocessor } from './Preprocessor.js';
import { ClientTaskImpl } from './ClientTaskImpl.js';
import { TaskConstant } from './TaskConstant.js'; 
// Verifier импортируем, когда перенесем его
// import { Verifier } from '../verify/Verifier.js';

/**
 * Основная реализация серверной логики задачи.
 * Аналог ru.spb.ipo.engine.task.ServerTaskImpl
 */
export class ServerTaskImpl extends ServerTask {

    /**
     * @param {string} taskFile - путь к файлу или содержимое XML
     * @param {number} problemId 
     * @param {JavaTaskFactory} factory 
     */
    constructor(taskFile, problemId, factory) {
        super();
        this.taskFile = taskFile;
        this.problemId = problemId;
        this.factory = factory;
        this.doc = null; // Здесь будет храниться DOM документ
    }

    /**
     * Инициализация задачи (загрузка и парсинг XML)
     */
    async init() {
        // В вебе мы используем fetch для получения файла
        const response = await fetch(this.taskFile);
        const xmlText = await response.text();
        const parser = new DOMParser();
        this.doc = parser.parseFromString(xmlText, "text/xml");
        
        if (this.doc.getElementsByTagName("parsererror").length > 0) {
            throw new Error("Ошибка парсинга XML в задаче: " + this.taskFile);
        }
    }

    getTitle() {
        const root = new NodeImpl(this.doc.documentElement);
        return root.getAttrIfExists("title", "Без названия");
    }

    async verify(ct) {
        const root = new NodeImpl(this.doc.documentElement);
        const metaData = root.getChild(TaskConstant.METADATA);
        const verifierNode = metaData.getChild(TaskConstant.VERIFIER);
        
        // Динамически создаем верификатор (нужно будет портировать папку verify)
        // const verifier = Verifier.generateVerifier(verifierNode);
        // return verifier.verify(ct.getAnswer(), ct.getGenParams());
        
        console.warn("Метод verify ожидает портирования папки verify");
        return false;
    }

    async getClientTask() {
        const root = new NodeImpl(this.doc.documentElement);
        const metaData = root.getChild(TaskConstant.METADATA);
        const sandboxNode = metaData.getChildIfExists(TaskConstant.PARAMETERS);
        
        const sandbox = new ParametersSandbox(sandboxNode);
        const randomParams = sandbox.getRandomParameters();
        
        return await this.getClientTaskWithParameters(randomParams);
    }

    async getClientTaskWithParameters(parameters) {
        const root = new NodeImpl(this.doc.documentElement);
        const descriptionNode = root.getChild(TaskConstant.DESCRIPTION);
        const metaData = root.getChild(TaskConstant.METADATA);
        
        // Генерируем описание, подставляя параметры и разворачивая циклы
        const processedDesc = await Preprocessor.executeTask(descriptionNode, parameters);
        
        const verifierNode = metaData.getChild(TaskConstant.VERIFIER);
        const verifierSandbox = new ParametersSandbox(verifierNode.getChildIfExists(TaskConstant.PARAMETERS));

        const task = new ClientTaskImpl(
            this.getTitle(),
            processedDesc.getText(),
            parameters,
            this.problemId,
            verifierSandbox.getParameterNames()
        );

        // Обработка изображений
        const imgsNode = descriptionNode.getChildIfExists(TaskConstant.IMAGES);
        if (imgsNode) {
            const images = imgsNode.getChilds(TaskConstant.IMAGE);
            const imagePaths = images.map(img => {
                // Путь к картинкам в вебе обычно относительный
                return `tasks/imgs/${img.getText()}`;
            });
            task.setImages(imagePaths);
        }

        return task;
    }
}