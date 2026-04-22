/**
 * Класс для управления информационным окном (WiseTasks).
 * Аналог ru.spb.ipo.client.ui.common.InfoDialog
 */
export class InfoDialog {
    constructor() {
        // Данные о проекте из оригинального конструктора
        this.title = "WiseTasks";
        this.version = "v 0.71";
        this.copyright = "(C) 2006-2008, 2012 Wisetasks";
        
        // Информация о команде
        this.scientificAdviser = "Сергей Поздняков";
        this.developer = "Михаил Богданов";
        this.email = "max.kammerer@yahoo.com";
        
        this.isVisible = false;
    }

    /**
     * Возвращает структурированные данные для отображения в UI (например, в модальном окне React/Vue).
     * Заменяет метод initialize() и построение панелей Swing.
     */
    getInfoData() {
        return {
            title: this.title,
            version: this.version,
            copyright: this.copyright,
            adviserLabel: "Научный руководитель",
            adviserName: this.scientificAdviser,
            developerLabel: "Разработчик",
            developerName: this.developer,
            email: this.email
        };
    }

    /**
     * Симуляция закрытия окна (аналог myClose и JDialog.dispose).
     */
    close() {
        this.isVisible = false;
        console.log("Информационное окно закрыто");
    }

    /**
     * Метод для открытия окна.
     */
    show() {
        this.isVisible = true;
        const data = this.getInfoData();
        console.log(`--- ${data.title} ${data.version} ---`);
        console.log(data.copyright);
        console.log(`${data.adviserLabel}: ${data.adviserName}`);
        console.log(`${data.developerLabel}: ${data.developerName}`);
        console.log(`Email: ${data.email}`);
    }
}