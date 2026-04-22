/**
 * Базовый интерфейс для всех элементов дерева модели.
 *
 */
export class KernelElement {
    getPresentableString() {
        throw new Error("Метод getPresentableString() должен быть реализован");
    }
    
    addChild(child) {
        throw new Error("Метод addChild() должен быть реализован");
    }
    
    getChildren() {
        throw new Error("Метод getChildren() должен быть реализован");
    }
    
    getParent() {
        throw new Error("Метод getParent() должен быть реализован");
    }
    
    removeChild(child) {
        throw new Error("Метод removeChild() должен быть реализован");
    }
}