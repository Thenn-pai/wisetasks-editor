import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class CardGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.selectedCards = []; 
        this.currentSuit = 'chervi'; 
        
        this.suitsInfo = {
            'chervi': { name: 'Черви', symbol: '♥', color: '#ff4d4d' },
            'bubi':   { name: 'Буби', symbol: '♦', color: '#ff4d4d' },
            'tref':   { name: 'Трефы', symbol: '♣', color: '#e0e0e0' },
            'pik':    { name: 'Пики', symbol: '♠', color: '#e0e0e0' }
        };
        
        this.ranks = [
            { id: '6', label: '6' }, { id: '7', label: '7' }, { id: '8', label: '8' },
            { id: '9', label: '9' }, { id: '10', label: '10' }, { id: 'valet', label: 'В' },
            { id: 'dama', label: 'Д' }, { id: 'korol', label: 'К' }, { id: 'tuz', label: 'Т' }
        ];
    }

    getHelpString() {
        return "Генератор комбинаторных задач с картами";
    }

    renderUI(container) {
        container.innerHTML = `
            <h3 style="margin-bottom: 15px;">${this.getHelpString()}</h3>
            
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <button id="select-36-btn" class="btn" style="background: #e67e22;">+ Колода 36 карт</button>
                <button id="clear-cards-btn" class="btn" style="background: #a93226;">Очистить</button>
            </div>

            <div style="margin-bottom: 15px; padding: 10px; background: #252526; border: 1px solid #333; border-radius: 5px;">
                <label style="display:block; margin-bottom: 8px; color: #ccc;">1. Ручной выбор (Масть):</label>
                <div id="suits-container" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>

            <div style="margin-bottom: 15px; padding: 10px; background: #252526; border: 1px solid #333; border-radius: 5px;">
                <label style="display:block; margin-bottom: 8px; color: #ccc;">2. Кликните на карту для добавления/удаления:</label>
                <div id="cards-grid" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
            </div>

            <div style="margin-bottom: 15px; padding: 15px; background: #1b2a3a; border: 1px solid #2c3e50; border-radius: 5px;">
                <label style="display:block; margin-bottom: 8px; color: #64b5f6; font-weight: bold;">3. Условие выборки (Комбинаторика):</label>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: #ccc;">Сколько карт тянем (k):</span>
                    <input type="number" id="combo-k" value="3" min="1" max="36" style="width: 60px; padding: 5px; background: #1e1e1e; color: white; border: 1px solid #555; border-radius: 3px;">
                </div>
            </div>

            <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #28a745; font-size: 16px; padding: 12px; border-radius: 5px; margin-bottom: 15px;">Сгенерировать XML комбинации</button>

            <div style="padding-bottom: 30px;">
                <label style="display:block; margin-bottom: 8px; color: #ccc;">База выборки (<span id="cards-count">0</span> шт.):</label>
                <div id="selected-cards-list" style="min-height: 40px; background: #1e1e1e; padding: 10px; border: 1px solid #444; border-radius: 3px; display: flex; flex-wrap: wrap; gap: 5px;">
                </div>
            </div>
        `;

        this.suitsContainer = container.querySelector('#suits-container');
        this.cardsGrid = container.querySelector('#cards-grid');
        this.selectedList = container.querySelector('#selected-cards-list');
        this.cardsCountLabel = container.querySelector('#cards-count');

        this.attachEvents(container);
        this.renderSuits();
        this.renderCards();
        this.updateSelectedView();
    }

    attachEvents(container) {
        container.querySelector('#generate-xml-btn').onclick = () => this.generateXmlToEditor(container);

        container.querySelector('#select-36-btn').onclick = () => {
            this.selectedCards = [];
            for (const suit of Object.keys(this.suitsInfo)) {
                for (const rank of this.ranks) {
                    this.selectedCards.push(`${rank.id}_${suit}`);
                }
            }
            this.renderCards();
            this.updateSelectedView();
        };

        container.querySelector('#clear-cards-btn').onclick = () => {
            this.selectedCards = [];
            this.renderCards();
            this.updateSelectedView();
        };
    }

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

            btn.innerHTML = `<span style="color: ${suitData.color}; font-size: 18px;">${suitData.symbol}</span> ${suitData.name}`;
            
            btn.onclick = () => {
                this.currentSuit = suitKey;
                this.renderSuits(); 
                this.renderCards(); 
            };
            this.suitsContainer.appendChild(btn);
        }
    }

    renderCards() {
        this.cardsGrid.innerHTML = '';
        const suitData = this.suitsInfo[this.currentSuit];

        this.ranks.forEach(rank => {
            const cardId = `${rank.id}_${this.currentSuit}`;
            const isSelected = this.selectedCards.includes(cardId);

            const cardEl = document.createElement('div');
            cardEl.style.width = '42px';
            cardEl.style.height = '62px';
            cardEl.style.background = isSelected ? '#fffacd' : '#ffffff'; 
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

            cardEl.innerHTML = `
                <div style="font-size: 14px; font-weight: bold;">${rank.label}</div>
                <div style="font-size: 24px; line-height: 1;">${suitData.symbol}</div>
            `;

            cardEl.onmouseenter = () => cardEl.style.transform = 'translateY(-3px)';
            cardEl.onmouseleave = () => cardEl.style.transform = 'translateY(0)';

            cardEl.onclick = () => {
                if (isSelected) {
                    this.selectedCards = this.selectedCards.filter(c => c !== cardId);
                } else {
                    this.selectedCards.push(cardId);
                }
                this.renderCards(); 
                this.updateSelectedView(); 
            };

            this.cardsGrid.appendChild(cardEl);
        });
    }

    updateSelectedView() {
        this.cardsCountLabel.textContent = this.selectedCards.length;

        if (this.selectedCards.length === 0) {
            this.selectedList.innerHTML = '<em style="color: #666;">Карты не выбраны</em>';
            return;
        }

        this.selectedList.innerHTML = '';
        this.selectedCards.forEach(cardId => {
            const parts = cardId.split('_');
            const rankData = this.ranks.find(r => r.id === parts[0]);
            const suitData = this.suitsInfo[parts[1]];

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

    generateXmlToEditor(container) {
        const xmlEditor = document.getElementById('xml-editor');
        const k = container.querySelector('#combo-k').value;
        
        let xml = `<root>\n`;
        xml += `  <task>\n`;
        xml += `    <source>\n`;
        xml += `      \n`;
        xml += `      <set type="CombinationSet" k="${k}">\n`;
        xml += `        <set>\n`;
        
        this.selectedCards.forEach(card => {
            xml += `          <element type="OneCard" value="${card}"/>\n`;
        });
        
        xml += `        </set>\n`;
        xml += `      </set>\n`;
        xml += `    </source>\n`;
        xml += `    \n`;
        xml += `  </task>\n`;
        xml += `</root>`;
        
        xmlEditor.value = xml;
        
        xmlEditor.style.backgroundColor = '#2c3e50';
        setTimeout(() => xmlEditor.style.backgroundColor = '#1e1e1e', 300);
    }
}