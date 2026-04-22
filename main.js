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

    // Отрисовка панели свойств
    function renderPropertiesPanel(node) {
        propertiesPanel.innerHTML = ''; 

        if (!node || node === app.modelTree.getRoot()) {
            propertiesPanel.innerHTML = '<p class="placeholder-text">Выберите элемент в дереве для редактирования</p>';
            return;
        }

        const element = node.getElement();
        if (!element) return;
        
        const title = document.createElement('h3');
        // Очищаем название от HTML-тегов раскраски для красивого заголовка
        title.textContent = `Настройки: ${node.getPresentableString().replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}`;
        propertiesPanel.appendChild(title);

        const label = document.createElement('label');
        label.textContent = 'Атрибут type:';
        label.style.display = 'block';
        label.style.marginTop = '15px';
        label.style.color = '#ccc';

        const input = document.createElement('input');
        input.type = 'text';
        
        // Надежно достаем текущий тип элемента
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

        // Обновляем данные при вводе текста
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

    // Отрисовка дерева (Исправленная версия)
    function renderTree() {
        treeRootElement.innerHTML = ''; 
        const rootNode = app.modelTree.getRoot();
        
        function createNodeHtml(node, container) {
            const li = document.createElement('li');
            li.style.listStyle = 'none';
            
            // Делаем кликабельным только текст (span), а не весь список
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
                e.stopPropagation(); // Блокируем клик по родителю
                selectedNode = node;
                renderTree(); 
                renderPropertiesPanel(node); 
                if (typeof Actions.elementSelected === 'function') Actions.elementSelected(node);
            };

            li.appendChild(textSpan);
            container.appendChild(li);

            // Рекурсия для детей
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
        
        selectedNode = childNode; // Авто-выбор нового элемента
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

    renderTree();
    Actions.updateXml();
    renderPropertiesPanel(selectedNode);
    // Логика переключения между 8 задачами
    document.getElementById('generator-select').addEventListener('change', (e) => {
        const selectedTask = e.target.value;
        console.log("Выбрана задача:", selectedTask);
        // Здесь мы будем подключать логику из папки src/generator/...
        alert("В разработке: Переключение на модуль " + selectedTask);
    });
});