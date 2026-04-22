import { TaskGenerator } from './src/ru/spb/ipo/taskgenerator/ui/TaskGenerator.js';
import { Actions } from './src/ru/spb/ipo/taskgenerator/util/Actions.js';
import { ElementUtil } from './src/ru/spb/ipo/taskgenerator/util/ElementUtil.js';
import { Writer } from './src/ru/spb/ipo/taskgenerator/xml/Writer.js';
import { ElementFactory } from './src/ru/spb/ipo/taskgenerator/util/ElementFactory.js';
import { GraphicFactory } from './src/ru/spb/ipo/taskgenerator/ui/GraphicFactory.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Приложение инициализируется...");
    
    const app = new TaskGenerator(); //
    const treeRootElement = document.getElementById('task-tree');
    const xmlEditor = document.getElementById('xml-editor');
    
    let selectedNode = app.modelTree.getRoot(); //

    function renderTree() {
        treeRootElement.innerHTML = ''; 
        const rootNode = app.modelTree.getRoot();
        
        function createNodeHtml(node, container) {
            const li = document.createElement('li');
            li.className = 'tree-node';
            
            // Поддержка HTML из Java-логики
            li.innerHTML = node.getPresentableString ? node.getPresentableString() : "Элемент";
            
            if (selectedNode === node) li.classList.add('selected');

            li.onclick = (e) => {
                e.stopPropagation();
                selectedNode = node;
                document.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
                li.classList.add('selected');
                
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
            console.error("Ошибка при генерации XML:", err);
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

    document.getElementById('btn-add-function').onclick = () => {
        performInsert(ElementUtil.E_FUNCTION, 'And');
    };

    document.getElementById('btn-add-set').onclick = () => {
        performInsert(ElementUtil.E_SET, 'DecartSet');
    };

    // Исправленный блок удаления узла
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Delete' && selectedNode) {
            const root = app.modelTree.getRoot();
            if (selectedNode === root) {
                console.warn("Нельзя удалить корень дерева!");
                return;
            }

            // Ищем родителя разными способами (метод или свойство)
            const parentNode = selectedNode.getParent ? selectedNode.getParent() : selectedNode.parent;
            
            if (!parentNode) {
                console.error("Родитель узла не найден!");
                return;
            }

            const parentElement = parentNode.getElement ? parentNode.getElement() : parentNode.element;
            const currentElement = selectedNode.getElement ? selectedNode.getElement() : selectedNode.element;

            // Удаляем из модели данных
            if (parentElement && currentElement) {
                parentElement.removeChild(currentElement);
            }

            // Удаляем из визуального дерева
            if (parentNode.remove) {
                parentNode.remove(selectedNode);
            }

            selectedNode = parentNode;
            renderTree();
            Actions.updateXml();
        }
    });

    renderTree();
    Actions.updateXml();
});