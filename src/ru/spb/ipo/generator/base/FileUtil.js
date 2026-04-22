/**
 * Работа с файлами и структурами задач.
 *
 */
export class ListIdEntry {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.parent = null;
    }
    toString() { return this.name; }
}

export class FileUtil {
    // В вебе здесь будет логика обращения к API или локальному хранилищу
    static async insertString(filename, toInsert, before) {
        console.log(`Вставка в ${filename}: ${toInsert} перед ${before}`);
    }
}