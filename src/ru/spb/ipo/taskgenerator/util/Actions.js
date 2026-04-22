import { Config } from '../config/Config.js';
import { ElementFactory } from './ElementFactory.js';
import { GraphicFactory } from '../ui/GraphicFactory.js';
import { ElementUtil } from './ElementUtil.js';
// В реальном JS проекте для работы с TaskGenerator понадобится менеджер состояний

/**
 * Основные операции над деревом (Добавить, Удалить, Открыть и т.д.).
 *
 */
export class Actions {
    
    static insert(type, kind) {
        // В JS нам нужен доступ к текущему выбранному узлу дерева.
        // Допустим, мы передаем его как аргумент, или берем из стейта:
        // const selectedNode = getSelectedNode();
        
        console.log(`Создание элемента типа ${type}, вид: ${kind}`);
        const modelElement = ElementFactory.buildElementFromType(type, kind);
        
        // Логика добавления атрибута для верификатора/параметров
        if (type === ElementUtil.E_VER_PARAMETERS) {
            modelElement.addAttribute("name", "verifier");
        } else if (type === ElementUtil.E_DESC_PARAMETERS) {
            modelElement.addAttribute("name", "description");
        }

        // В оригинале здесь шло добавление через GraphicFactory
        // GraphicFactory.addChild(selectedNode.getElement(), modelElement);
        return modelElement;
    }
    
    static delete(selectedNode) {
        if (!selectedNode || !selectedNode.parent) return;
        const parentElement = selectedNode.parent.getElement();
        parentElement.removeChild(selectedNode.getElement());
        
        // В UI: удалить узел из компонента дерева
        console.log(`Элемент ${selectedNode.getText()} удален`);
    }

    static addParameterSet(isDescription) {
        console.log(`Добавление блока параметров (isDescription=${isDescription})`);
        if (isDescription) {			
            this.insert(ElementUtil.E_DESC_PARAMETERS, null);
        } else {			
            this.insert(ElementUtil.E_VER_PARAMETERS, null);
        }
    }

    static save(file, rootNode) {
        console.log("Логика сохранения в XML файл (требует модуля xml/Writer.js)");
    }

    static open(file) {
        console.log("Логика чтения XML файла и построения дерева");
    }
}