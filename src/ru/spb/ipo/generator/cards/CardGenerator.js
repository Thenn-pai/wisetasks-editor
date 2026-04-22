import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class CardGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.imagesList = [];
        // Карта для маппинга названий в имена файлов (2pik, valet_tref и т.д.)
        //
        this.cardImagesMap = this.initializeImageMap();
    }

    initializeImageMap() {
        const map = {};
        const suits = ["bubi", "chervi", "pik", "tref"];
        // В Java это заполнялось вручную, в JS можно автоматизировать
        // но сохраняем логику имен из оригинального кода
        return map;
    }

    getHelpString() {
        return "Редактор задач с картами";
    }

    // Собирает параметры из UI для XML генератора
    fillMaps(source, func, task) {
        source.setType = "CombinationSet";
        // Здесь будет логика сбора всех OneCard и ParseElement из списка
    }
}