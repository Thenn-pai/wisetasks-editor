import { TaskGenerator } from './src/ru/spb/ipo/taskgenerator/ui/TaskGenerator.js';
import { Actions } from './src/ru/spb/ipo/taskgenerator/util/Actions.js';
import { ElementUtil } from './src/ru/spb/ipo/taskgenerator/util/ElementUtil.js';
import { Writer } from './src/ru/spb/ipo/taskgenerator/xml/Writer.js';
import { ElementFactory } from './src/ru/spb/ipo/taskgenerator/util/ElementFactory.js';
import { GraphicFactory } from './src/ru/spb/ipo/taskgenerator/ui/GraphicFactory.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Wisetasks Web Editor: Инициализация...");
    
    const app = new TaskGenerator();
    const treeRootElement = document.getElementById('task-tree');
    const xmlEditor = document.getElementById('xml-editor');
    const propertiesPanel = document.getElementById('properties-panel');
    
    let selectedNode = app.modelTree.getRoot();

    // --- Отрисовка панели свойств ---
    function renderPropertiesPanel(node) {
        propertiesPanel.innerHTML = ''; 

        if (!node || node === app.modelTree.getRoot()) {
            propertiesPanel.innerHTML = '<p class="placeholder-text">Выберите элемент в дереве для редактирования</p>';
            return;
        }

        const element = node.getElement();
        if (!element) return;
        
        const title = document.createElement('h3');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = node.getPresentableString();
        title.textContent = `Настройки: ${tempDiv.textContent.trim()}`;
        propertiesPanel.appendChild(title);

        const label = document.createElement('label');
        label.textContent = 'Атрибут type:';
        label.style.display = 'block';
        label.style.marginTop = '15px';
        label.style.color = '#ccc';

        const input = document.createElement('input');
        input.type = 'text';
        
        let currentType = '';
        if (element.getType) currentType = element.getType();
        else if (element.type) currentType = element.type;
        else if (element.attributes && element.attributes.type) currentType = element.attributes.type;

        input.value = currentType;
        input.style.width = '100%';
        input.style.padding = '8px';
        input.style.marginTop = '8px';
        input.style.backgroundColor = '#1e1e1e';
        input.style.color = '#ce9178';
        input.style.border = '1px solid #333';
        input.style.borderRadius = '4px';

        input.oninput = (e) => {
            const newValue = e.target.value;
            if (element.setType) element.setType(newValue);
            else if (element.setAttribute) element.setAttribute('type', newValue);
            else element.type = newValue;
            
            renderTree(); 
            Actions.updateXml(); 
        };

        label.appendChild(input);
        propertiesPanel.appendChild(label);
    }

    // --- Отрисовка дерева ---
    function renderTree() {
        treeRootElement.innerHTML = ''; 
        const rootNode = app.modelTree.getRoot();
        
        function createNodeHtml(node, container) {
            const li = document.createElement('li');
            li.style.listStyle = 'none';
            
            const textSpan = document.createElement('div');
            textSpan.innerHTML = node.getPresentableString ? node.getPresentableString() : "Элемент";
            textSpan.style.padding = '4px 8px';
            textSpan.style.cursor = 'pointer';
            textSpan.style.borderRadius = '3px';
            textSpan.style.display = 'inline-block';
            
            if (selectedNode === node) {
                textSpan.style.backgroundColor = '#007acc';
                textSpan.style.color = 'white';
            }

            textSpan.onclick = (e) => {
                e.stopPropagation(); 
                selectedNode = node;
                renderTree(); 
                renderPropertiesPanel(node); 
                if (typeof Actions.elementSelected === 'function') Actions.elementSelected(node);
            };

            li.appendChild(textSpan);
            container.appendChild(li);

            if (node.getChildCount && node.getChildCount() > 0) {
                const ul = document.createElement('ul');
                ul.style.paddingLeft = '15px';
                ul.style.borderLeft = '1px solid #444';
                ul.style.marginLeft = '5px';
                for (let i = 0; i < node.getChildCount(); i++) {
                    createNodeHtml(node.getChildAt(i), ul);
                }
                li.appendChild(ul);
            }
        }

        if (rootNode) createNodeHtml(rootNode, treeRootElement);
    }

    Actions.updateXml = function() {
        try {
            const rootNode = app.modelTree.getRoot();
            if (rootNode && rootNode.getElement()) {
                const doc = Writer.generateXmlTree(rootNode.getElement());
                const rawXml = Writer.getString(doc);
                xmlEditor.value = rawXml.replace(/></g, '>\n<'); 
            }
        } catch (err) {
            console.error("Ошибка XML:", err);
        }
    };

    function performInsert(type, kind) {
        const targetNode = selectedNode || app.modelTree.getRoot();
        const parentElement = targetNode.getElement();
        const childElement = ElementFactory.buildElementFromType(type, kind);
        parentElement.addChild(childElement); 
        const childNode = GraphicFactory.getView(childElement);
        targetNode.addChild(childNode); 
        
        selectedNode = childNode; 
        renderTree();
        renderPropertiesPanel(selectedNode);
        Actions.updateXml();
    }

    document.getElementById('btn-add-function').onclick = () => performInsert(ElementUtil.E_FUNCTION, 'And');
    document.getElementById('btn-add-set').onclick = () => performInsert(ElementUtil.E_SET, 'DecartSet');

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Delete' && selectedNode) {
            const root = app.modelTree.getRoot();
            if (selectedNode === root) return;
            const parentNode = selectedNode.getParent ? selectedNode.getParent() : selectedNode.parent;
            const parentElement = parentNode.getElement ? parentNode.getElement() : parentNode.element;
            const currentElement = selectedNode.getElement ? selectedNode.getElement() : selectedNode.element;

            if (parentElement && currentElement) parentElement.removeChild(currentElement);
            if (parentNode.remove) parentNode.remove(selectedNode);

            selectedNode = parentNode;
            renderTree();
            renderPropertiesPanel(selectedNode);
            Actions.updateXml();
        }
    });

    // --- Логика переключения генераторов (МЕНЮ) ---
    document.getElementById('generator-select').addEventListener('change', async (e) => {
        const selectedTask = e.target.value;
        console.log("Загружаем логику для:", selectedTask);

        // Базовый редактор
        if (selectedTask === 'base') {
            document.getElementById('btn-add-function').style.display = 'inline-block';
            document.getElementById('btn-add-set').style.display = 'inline-block';
            treeRootElement.parentElement.style.display = 'block'; 
            renderTree();
            renderPropertiesPanel(selectedNode);
            return;
        }

        document.getElementById('btn-add-function').style.display = 'none';
        document.getElementById('btn-add-set').style.display = 'none';

        let modulePath = ''; 
        
        try {
            let className = '';

            if (selectedTask === 'cards') {
                modulePath = './src/ru/spb/ipo/taskgenerator/generator/cards/CardGenerator.js';
                className = 'CardGenerator';
            }

            if (modulePath) {
                const module = await import(modulePath);
                const generatorInstance = new module[className]();
                
                treeRootElement.parentElement.style.display = 'none';
                
                propertiesPanel.innerHTML = `
                    <h3>Генератор: ${generatorInstance.getHelpString ? generatorInstance.getHelpString() : className}</h3>
                    <p style="color: #4CAF50;">Класс успешно инициализирован!</p>
                `;
            } else {
                propertiesPanel.innerHTML = `<h3>${selectedTask}</h3><p>Этот генератор еще не подключен в main.js.</p>`;
            }

        } catch (error) {
            console.error("Ошибка при загрузке генератора:", error);
            propertiesPanel.innerHTML = `
                <h3 style="color: #ff5555;">Файл не найден (Ошибка 404)</h3>
                <p>Не удалось загрузить модуль по пути:</p>
                <code style="display:block; padding:10px; background:#1e1e1e; color:#ce9178; margin-bottom:15px;">${modulePath}</code>
                <p><b>Что нужно проверить:</b></p>
                <ol>
                    <li style="margin-bottom: 5px;">Точное имя файла в VS Code. Может он называется <code>CardsGenerator.js</code> (с буквой s) или <code>cardGenerator.js</code> (с маленькой буквы)? На GitHub это важно!</li>
                    <li style="margin-bottom: 5px;">Проверь первую строчку внутри самого файла <code>CardGenerator.js</code>. Если он импортирует <code>BaseGeneratorUI</code>, и путь к нему написан с ошибкой, файл тоже не загрузится.</li>
                </ol>
            `;
        }
    });

    // --- Первый запуск ---
    renderTree();
    Actions.updateXml();
    renderPropertiesPanel(selectedNode);
});