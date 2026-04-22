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
    const propertiesPanel = document.getElementById('properties-panel'); // Наша правая панель
    
    let selectedNode = app.modelTree.getRoot();

    // Функция отрисовки панели свойств
    function renderPropertiesPanel(node) {
        propertiesPanel.innerHTML = ''; // Очищаем старые свойства

        // Корень пока не редактируем
        if (!node || node === app.modelTree.getRoot()) {
            propertiesPanel.innerHTML = '<p class="placeholder-text">Выберите элемент в дереве для редактирования</p>';
            return;
        }

        const element = node.getElement();
        
        // Создаем заголовок
        const title = document.createElement('h3');
        title.textContent = `Настройки элемента`;
        propertiesPanel.appendChild(title);

        // Создаем поле ввода для типа (type)
        const label = document.createElement('label');
        label.textContent = 'Атрибут type:';
        label.style.display = 'block';
        label.style.marginTop = '15px';
        label.style.fontSize = '14px';
        label.style.color = '#ccc';

        const input = document.createElement('input');
        input.type = 'text';
        // Пытаемся достать текущий тип (адаптируй под методы твоего Element.js, если нужно)
        input.value = element.getType ? element.getType() : 'Unknown';
        input.style.width = '100%';
        input.style.padding = '8px';
        input.style.marginTop = '8px';
        input.style.backgroundColor = '#1e1e1e';
        input.style.color = '#ce9178';
        input.style.border = '1px solid #333';
        input.style.borderRadius = '4px';
        input.style.outline = 'none';

        // Когда мы печатаем в поле, обновляем дерево и XML
        input.oninput = (e) => {
            const newValue = e.target.value;
            if (element.setType) {
                element.setType(newValue);
            } else if (element.setAttribute) {
                element.setAttribute('type', newValue);
            }
            renderTree(); // Перерисовываем левое дерево
            Actions.updateXml(); // Обновляем XML снизу
        };

        label.appendChild(input);
        propertiesPanel.appendChild(label);
    }

    function renderTree() {
        treeRootElement.innerHTML = ''; 
        const rootNode = app.modelTree.getRoot();
        
        function createNodeHtml(node, container) {
            const li = document.createElement('li');
            li.className = 'tree-node';
            li.innerHTML = node.getPresentableString ? node.getPresentableString() : "Элемент";
            
            if (selectedNode === node) li.classList.add('selected');

            li.onclick = (e) => {
                e.stopPropagation();
                selectedNode = node;
                document.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
                li.classList.add('selected');
                
                // Вызываем отрисовку свойств при клике!
                renderPropertiesPanel(node);

                if (typeof Actions.elementSelected === 'function') {
                    Actions.elementSelected(node);
                }
            };

            container.appendChild(li);

            if (node.getChildCount && node.getChildCount() > 0) {
                const ul = document.createElement('ul');
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
        renderTree();
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
            
            // Если удалили элемент, очищаем правую панель
            renderPropertiesPanel(selectedNode);
            
            renderTree();
            Actions.updateXml();
        }
    });

    renderTree();
    Actions.updateXml();
    renderPropertiesPanel(selectedNode); // Первоначальный вызов
});