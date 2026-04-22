import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class CardGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.selectedCards = []; // Массив для хранения выбранных карт
    }

    getHelpString() {
        return "Редактор задач с картами";
    }

    // Эта функция рисует интерфейс прямо в правой панели
    renderUI(container) {
        container.innerHTML = `
            <h3>${this.getHelpString()}</h3>
            
            <div style="margin-bottom: 20px; padding: 10px; background: #252526; border: 1px solid #333; border-radius: 5px;">
                <label style="display:block; margin-bottom: 8px; color: #ccc;">1. Выберите масть:</label>
                <button class="btn suit-btn" data-suit="chervi" style="margin-right: 5px; background: #007acc;">Черви</button>
                <button class="btn suit-btn" data-suit="bubi" style="margin-right: 5px; background: #555;">Буби</button>
                <button class="btn suit-btn" data-suit="tref" style="margin-right: 5px; background: #555;">Трефы</button>
                <button class="btn suit-btn" data-suit="pik" style="margin-right: 5px; background: #555;">Пики</button>
            </div>

            <div style="margin-bottom: 20px; padding: 10px; background: #252526; border: 1px solid #333; border-radius: 5px;">
                <label style="display:block; margin-bottom: 8px; color: #ccc;">2. Выберите карту:</label>
                <select id="card-rank" style="padding: 6px; background: #1e1e1e; color: white; border: 1px solid #555; border-radius: 3px;">
                    <option value="6">Шестерка</option>
                    <option value="7">Семерка</option>
                    <option value="8">Восьмерка</option>
                    <option value="9">Девятка</option>
                    <option value="10">Десятка</option>
                    <option value="valet">Валет</option>
                    <option value="dama">Дама</option>
                    <option value="korol">Король</option>
                    <option value="tuz">Туз</option>
                </select>
                <button id="add-card-btn" class="btn" style="margin-left: 10px;">Добавить в набор</button>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display:block; margin-bottom: 8px; color: #ccc;">Выбранные карты:</label>
                <div id="selected-cards-list" style="min-height: 50px; background: #1e1e1e; padding: 10px; border: 1px solid #444; border-radius: 3px;">
                    <em style="color: #666;">Карты не выбраны</em>
                </div>
                <button id="clear-cards-btn" class="btn" style="background: #a93226; margin-top: 10px; font-size: 12px;">Очистить список</button>
            </div>

            <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #28a745; font-size: 16px; padding: 10px;">Сгенерировать XML задачи</button>
        `;

        this.attachEventListeners(container);
    }

    // Подключаем логику кликов
    attachEventListeners(container) {
        let currentSuit = 'chervi';
        const suitBtns = container.querySelectorAll('.suit-btn');

        // Переключение мастей
        suitBtns.forEach(btn => {
            btn.onclick = (e) => {
                suitBtns.forEach(b => b.style.background = '#555');
                e.target.style.background = '#007acc';
                currentSuit = e.target.dataset.suit;
            };
        });

        // Добавление карты
        container.querySelector('#add-card-btn').onclick = () => {
            const rank = container.querySelector('#card-rank').value;
            const cardName = `${rank}_${currentSuit}`;
            
            if (!this.selectedCards.includes(cardName)) {
                this.selectedCards.push(cardName);
                this.updateCardsList(container);
            }
        };

        // Очистка списка
        container.querySelector('#clear-cards-btn').onclick = () => {
            this.selectedCards = [];
            this.updateCardsList(container);
        };

        // Генерация итогового XML
        container.querySelector('#generate-xml-btn').onclick = () => {
            this.generateXmlToEditor();
        };
    }

    // Обновление зеленого списка на экране
    updateCardsList(container) {
        const listDiv = container.querySelector('#selected-cards-list');
        if (this.selectedCards.length === 0) {
            listDiv.innerHTML = '<em style="color: #666;">Карты не выбраны</em>';
            return;
        }
        
        listDiv.innerHTML = this.selectedCards.map(c => 
            `<span style="display:inline-block; background:#007acc; color:white; padding:4px 8px; margin:3px; border-radius:15px; font-size:13px;">${c}</span>`
        ).join('');
    }

    // Функция вывода XML
    generateXmlToEditor() {
        const xmlEditor = document.getElementById('xml-editor');
        
        // Формируем структуру задачи для Wisetasks
        let xml = `<root>\n  <set type="CombinationSet">\n`;
        this.selectedCards.forEach(card => {
            xml += `    <element type="OneCard" value="${card}"/>\n`;
        });
        xml += `  </set>\n</root>`;
        
        xmlEditor.value = xml;
        
        // Подсвечиваем поле, чтобы было видно обновление
        xmlEditor.style.backgroundColor = '#2c3e50';
        setTimeout(() => xmlEditor.style.backgroundColor = '#1e1e1e', 300);
    }
}