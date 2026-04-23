import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class CardGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.selectedCards = []; // Тут храним выбранные карты
        this.currentSuit = 'chervi'; // Масть по умолчанию
        
        // База данных мастей со значками и цветами
        this.suitsInfo = {
            'chervi': { name: 'Черви', symbol: '♥', color: '#ff4d4d' },
            'bubi':   { name: 'Буби', symbol: '♦', color: '#ff4d4d' },
            'tref':   { name: 'Трефы', symbol: '♣', color: '#e0e0e0' },
            'pik':    { name: 'Пики', symbol: '♠', color: '#e0e0e0' }
        };
        
        // Значения карт
        this.ranks = [
            { id: '6', label: '6' }, { id: '7', label: '7' }, { id: '8', label: '8' },
            { id: '9', label: '9' }, { id: '10', label: '10' }, { id: 'valet', label: 'В' },
            { id: 'dama', label: 'Д' }, { id: 'korol', label: 'К' }, { id: 'tuz', label: 'Т' }
        ];
    }

    getHelpString() {
        return "Редактор задач с картами";
    }

    // Главная функция отрисовки
    renderUI(container) {
        container.innerHTML = `
            <h3>${this.getHelpString()}</h3>
            
            <div style="margin-bottom: 15px; padding: 10px; background: #252526; border: 1px solid #333; border-radius: 5px;">
                <label style="display:block; margin-bottom: 8px; color: #ccc;">1. Выберите масть:</label>
                <div id="suits-container" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>

            <div style="margin-bottom: 15px; padding: 10px; background: #252526; border: 1px solid #333; border-radius: 5px;">
                <label style="display:block; margin-bottom: 8px; color: #ccc;">2. Кликните на карту, чтобы добавить/убрать из набора:</label>
                <div id="cards-grid" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display:block; margin-bottom: 8px; color: #ccc;">Набор для XML:</label>
                <div id="selected-cards-list" style="min-height: 40px; background: #1e1e1e; padding: 10px; border: 1px solid #444; border-radius: 3px; display: flex; flex-wrap: wrap; gap: 5px;">
                    </div>
            </div>

            <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #28a745; font-size: 16px; padding: 10px; border-radius: 5px;">Сгенерировать XML</button>
        `;

        // Запоминаем элементы
        this.suitsContainer = container.querySelector('#suits-container');
        this.cardsGrid = container.querySelector('#cards-grid');
        this.selectedList = container.querySelector('#selected-cards-list');

        // Кнопка генерации XML
        container.querySelector('#generate-xml-btn').onclick = () => this.generateXmlToEditor();

        // Запускаем отрисовку внутренностей
        this.renderSuits();
        this.renderCards();
        this.updateSelectedView();
    }

    // Отрисовка кнопок мастей
    renderSuits() {
        this.suitsContainer.innerHTML = '';
        for (const [suitKey, suitData] of Object.entries(this.suitsInfo)) {
            const btn = document.createElement('button');
            const isSelected = this.currentSuit === suitKey;
            
            btn.className = 'btn';
            btn.style.background = isSelected ? '#007acc' : '#333';
            btn.style.border = isSelected ? '1px solid #0098ff' : '1px solid #555';
            btn.style.color = 'white';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.gap = '6px';
            btn.style.padding = '8px 12px';
            btn.style.borderRadius = '4px';

            // Иконка масти + текст
            btn.innerHTML = `<span style="color: ${suitData.color}; font-size: 18px;">${suitData.symbol}</span> ${suitData.name}`;
            
            btn.onclick = () => {
                this.currentSuit = suitKey;
                this.renderSuits(); // Обновляем цвета кнопок
                this.renderCards(); // Перерисовываем сетку карт под новую масть
            };
            this.suitsContainer.appendChild(btn);
        }
    }

    // Отрисовка сетки с картами
    renderCards() {
        this.cardsGrid.innerHTML = '';
        const suitData = this.suitsInfo[this.currentSuit];

        this.ranks.forEach(rank => {
            const cardId = `${rank.id}_${this.currentSuit}`;
            const isSelected = this.selectedCards.includes(cardId);

            const cardEl = document.createElement('div');
            // Стилизуем под настоящую игральную карту
            cardEl.style.width = '42px';
            cardEl.style.height = '62px';
            cardEl.style.background = isSelected ? '#fffacd' : '#ffffff'; // Желтеет при выборе
            cardEl.style.border = isSelected ? '2px solid #ff9800' : '1px solid #ccc';
            cardEl.style.borderRadius = '5px';
            cardEl.style.display = 'flex';
            cardEl.style.flexDirection = 'column';
            cardEl.style.justifyContent = 'center';
            cardEl.style.alignItems = 'center';
            cardEl.style.cursor = 'pointer';
            cardEl.style.color = suitData.color;
            cardEl.style.boxShadow = isSelected ? '0 0 8px rgba(255, 152, 0, 0.6)' : '0 2px 4px rgba(0,0,0,0.2)';
            cardEl.style.userSelect = 'none';
            cardEl.style.transition = 'transform 0.1s';

            // Наполнение карты (Цифра сверху, большая масть снизу)
            cardEl.innerHTML = `
                <div style="font-size: 14px; font-weight: bold;">${rank.label}</div>
                <div style="font-size: 24px; line-height: 1;">${suitData.symbol}</div>
            `;

            // Анимация при наведении
            cardEl.onmouseenter = () => cardEl.style.transform = 'translateY(-3px)';
            cardEl.onmouseleave = () => cardEl.style.transform = 'translateY(0)';

            // Клик по карте (добавить/убрать)
            cardEl.onclick = () => {
                if (isSelected) {
                    this.selectedCards = this.selectedCards.filter(c => c !== cardId);
                } else {
                    this.selectedCards.push(cardId);
                }
                this.renderCards(); // Перерисовываем карту (чтобы стала желтой)
                this.updateSelectedView(); // Обновляем список внизу
            };

            this.cardsGrid.appendChild(cardEl);
        });
    }

    // Обновление нижнего списка выбранных карт
    updateSelectedView() {
        if (this.selectedCards.length === 0) {
            this.selectedList.innerHTML = '<em style="color: #666;">Карты не выбраны</em>';
            return;
        }

        this.selectedList.innerHTML = '';
        this.selectedCards.forEach(cardId => {
            const parts = cardId.split('_');
            const rankData = this.ranks.find(r => r.id === parts[0]);
            const suitData = this.suitsInfo[parts[1]];

            // Маленький красивый тег
            const tag = document.createElement('div');
            tag.style.background = 'white';
            tag.style.color = suitData.color;
            tag.style.padding = '3px 8px';
            tag.style.borderRadius = '12px';
            tag.style.fontSize = '13px';
            tag.style.fontWeight = 'bold';
            tag.style.border = '1px solid #ccc';
            tag.style.display = 'flex';
            tag.style.alignItems = 'center';
            tag.style.gap = '4px';

            tag.innerHTML = `${rankData.label} <span style="font-size: 16px;">${suitData.symbol}</span>`;
            this.selectedList.appendChild(tag);
        });
    }

    // Вывод XML в редактор
    generateXmlToEditor() {
        const xmlEditor = document.getElementById('xml-editor');
        let xml = `<root>\n  <set type="CombinationSet">\n`;
        
        this.selectedCards.forEach(card => {
            xml += `    <element type="OneCard" value="${card}"/>\n`;
        });
        
        xml += `  </set>\n</root>`;
        
        xmlEditor.value = xml;
        
        // Подмигивание поля XML для эффекта загрузки
        xmlEditor.style.backgroundColor = '#2c3e50';
        setTimeout(() => xmlEditor.style.backgroundColor = '#1e1e1e', 300);
    }
}