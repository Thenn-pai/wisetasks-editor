/**
 * Класс данных для информационного диалога.
 * Аналог ru.spb.ipo.common.ui.InfoDialog
 */
export class InfoDialog {
    constructor() {
        // Заголовок и версия
        this.title = "WiseTasks";
        this.version = "v 0.71";
        
        // Текстовые поля из метода initialize()
        this.copyright = "(C) 2006-2008, 2012 Wisetasks";
        this.scientificAdviserLabel = "Научный руководитель";
        this.scientificAdviserName = "Сергей Поздняков";
        this.developerLabel = "Разработчик";
        this.developerName = "Михаил Богданов";
        this.email = "max.kammerer@yahoo.com";

        // Цвета (если пригодятся для стилизации под оригинал)
        this.style = {
            titleColor: "#0000FF", // Color.BLUE
            titleFont: "Verdana",
            fontSize: 14
        };
    }

    /**
     * Возвращает объект для рендеринга в UI
     */
    getData() {
        return {
            title: `${this.title} ${this.version}`,
            copyright: this.copyright,
            team: [
                { label: this.scientificAdviserLabel, name: this.scientificAdviserName },
                { label: this.developerLabel, name: this.developerName }
            ],
            contact: this.email
        };
    }

    /**
     * Метод-заглушка для совместимости с логикой закрытия
     */
    dispose() {
        console.log("Диалог InfoDialog уничтожен");
    }
}