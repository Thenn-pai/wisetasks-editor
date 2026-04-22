/**
 * Константы для имен узлов и атрибутов в XML-задачах.
 * Полное соответствие оригиналу ru.spb.ipo.engine.task.TaskConstant
 */
export const TaskConstant = {
    // Основные разделы и теги
    DESCRIPTION: "description",
    MATH_DESCRIPTION: "mathDescription",
    DESCRIPTION_PARAMS: "description-params",
    VERIFIER_PARAMS: "verifier-params",
    
    // Параметры
    PARAM: "param",
    PARAM_NAME: "name",
    PARAM_TYPE: "type",
    PARAM_TEXT: "text",
    PARAM_SET: "value",
    
    // Логика и проверка
    VERIFIER: "verifier",
    FUNCTION: "function",
    
    // Изображения
    IMAGES: "imgs",
    IMAGE: "img",

    // Добавим константы, которые часто встречаются в логике (из ServerTaskImpl)
    METADATA: "metadata",
    PARAMETERS: "parameters"
};

export default TaskConstant;