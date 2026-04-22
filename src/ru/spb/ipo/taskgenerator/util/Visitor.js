/**
 * Паттерн Visitor для обхода KernelElement.
 *
 */
export class Visitor {
    visit(parent) {
        this.processElement(parent);
        const children = parent.getChildren();
        if (children && Array.isArray(children)) {
            children.forEach(child => this.visit(child));
        }
    }
    
    processElement(element) {
        throw new Error("Метод processElement должен быть переопределен в наследнике");
    }
}