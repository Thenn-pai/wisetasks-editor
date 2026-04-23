import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class CardGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.selectedCards = []; 
        this.currentSuit = 'chervi'; 
        this.conditions = []; // Хранилище созданных ограничений (условий)
        
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
        return "Генератор и Решатель комбинаторных задач с картами";
    }

    // --- МАТЕМАТИЧЕСКОЕ ЯДРО ---
    fact(n) {
        if (n <= 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    combinations(n, k) {
        if (k < 0 || k > n) return 0;
        return this.fact(n) / (this.fact(k) * this.fact(n - k));
    }

    // --- ИНТЕРФЕЙС ---
    renderUI(container) {
        container.innerHTML = `
            <h3 style="margin-bottom: 15px;">${this.getHelpString()}</h3>
            
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <button id="select-36-btn" class="btn" style="background: #e67e22;">+ Колода 36 карт</button>
                <button id="clear-cards-btn" class="btn" style="background: #a93226;">Очистить базу</button>
            </div>

            <div style="margin-bottom: 15px; padding: 10px; background: #252526; border: 1px solid #333; border-radius: 5px;">
                <div style="display: flex; gap: 10px; margin-bottom: 10px;" id="suits-container"></div>
                <div id="cards-grid" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
                <div style="margin-top: 10px; font-size: 13px; color: #aaa;">
                    База для задачи: <strong id="cards-count" style="color: white;">0</strong> карт.
                </div>
            </div>

            <div style="margin-bottom: 15px; padding: 15px; background: #1b2a3a; border: 1px solid #2c3e50; border-radius: 5px;">
                <label style="display:block; margin-bottom: 10px; color: #64b5f6; font-weight: bold;">Условия задачи:</label>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <span style="color: #ccc;">Тянем всего карт (k):</span>
                    <input type="number" id="combo-k" value="5" min="1" max="36" style="width: 60px; padding: 5px; background: #1e1e1e; color: white; border: 1px solid #555; border-radius: 3px;">
                </div>

                <div style="background: #151f2b; padding: 10px; border-radius: 4px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                    <span style="color: #aaa;">Ограничение:</span>
                    <select id="cond-type" style="padding: 5px; background: #1e1e1e; color: white; border: 1px solid #555;">
                        <option value="suit">Масть</option>
                        <option value="rank">Номинал (Ранг)</option>
                    </select>
                    <select id="cond-value" style="padding: 5px; background: #1e1e1e; color: white; border: 1px solid #555;">
                        </select>
                    <span style="color: #aaa;">В количестве:</span>
                    <input type="number" id="cond-count" value="2" min="1" max="36" style="width: 50px; padding: 5px; background: #1e1e1e; color: white; border: 1px solid #555;">
                    <button id="add-cond-btn" class="btn" style="background: #007acc; padding: 5px 10px;">+ Добавить</button>
                </div>

                <div id="conditions-list" style="margin-top: 10px; display: flex; flex-direction: column; gap: 5px;"></div>
            </div>

            <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #28a745; font-size: 16px; padding: 12px; border-radius: 5px; margin-bottom: 15px;">Сгенерировать XML и Решить</button>

            <div id="solution-box" style="display: none; padding: 15px; background: #1e1e1e; border-left: 4px solid #e67e22; border-radius: 4px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 10px 0; color: #e67e22;">Ход решения:</h4>
                <div id="solution-text" style="font-size: 14px; line-height: 1.6; color: #ddd; font-family: monospace;"></div>
            </div>
        `;

        this.suitsContainer = container.querySelector('#suits-container');
        this.cardsGrid = container.querySelector('#cards-grid');
        this.cardsCountLabel = container.querySelector('#cards-count');
        this.conditionsList = container.querySelector('#conditions-list');
        
        this.attachEvents(container);
        this.renderSuits();
        this.renderCards();
        this.updateConditionDropdowns(container);
    }

    attachEvents(container) {
        container.querySelector('#select-36-btn').onclick = () => {
            this.selectedCards = [];
            for (const suit of Object.keys(this.suitsInfo)) {
                for (const rank of this.ranks) this.selectedCards.push(`${rank.id}_${suit}`);
            }
            this.renderCards();
        };

        container.querySelector('#clear-cards-btn').onclick = () => {
            this.selectedCards = [];
            this.renderCards();
        };

        const typeSelect = container.querySelector('#cond-type');
        typeSelect.onchange = () => this.updateConditionDropdowns(container);

        container.querySelector('#add-cond-btn').onclick = () => {
            const type = typeSelect.value;
            const val = container.querySelector('#cond-value').value;
            const name = container.querySelector('#cond-value').options[container.querySelector('#cond-value').selectedIndex].text;
            const count = parseInt(container.querySelector('#cond-count').value);

            this.conditions.push({ type, value: val, name, count });
            this.renderConditions();
        };

        container.querySelector('#generate-xml-btn').onclick = () => {
            this.generateXmlToEditor(container);
            this.solveMath(container);
        };
    }

    updateConditionDropdowns(container) {
        const type = container.querySelector('#cond-type').value;
        const valSelect = container.querySelector('#cond-value');
        valSelect.innerHTML = '';
        
        if (type === 'suit') {
            Object.entries(this.suitsInfo).forEach(([k, v]) => {
                valSelect.innerHTML += `<option value="${k}">${v.name}</option>`;
            });
        } else {
            this.ranks.forEach(r => {
                valSelect.innerHTML += `<option value="${r.id}">${r.label}</option>`;
            });
        }
    }

    renderConditions() {
        this.conditionsList.innerHTML = '';
        if (this.conditions.length === 0) {
            this.conditionsList.innerHTML = '<em style="color:#666; font-size:12px;">Условий пока нет</em>';
            return;
        }

        this.conditions.forEach((cond, index) => {
            const tag = document.createElement('div');
            tag.style.display = 'flex';
            tag.style.justifyContent = 'space-between';
            tag.style.background = '#252526';
            tag.style.padding = '5px 10px';
            tag.style.border = '1px solid #444';
            tag.style.borderRadius = '3px';
            
            tag.innerHTML = `
                <span style="color: #ccc;">Нужно <strong style="color:white;">${cond.count}</strong> шт. группы «<strong style="color:#e67e22;">${cond.name}</strong>»</span>
                <span style="color: red; cursor: pointer; font-weight: bold;" title="Удалить">X</span>
            `;
            
            tag.querySelector('span:last-child').onclick = () => {
                this.conditions.splice(index, 1);
                this.renderConditions();
            };
            this.conditionsList.appendChild(tag);
        });
    }

    renderSuits() {
        this.suitsContainer.innerHTML = '';
        for (const [suitKey, suitData] of Object.entries(this.suitsInfo)) {
            const btn = document.createElement('button');
            const isSelected = this.currentSuit === suitKey;
            btn.className = 'btn';
            btn.style.background = isSelected ? '#007acc' : '#333';
            btn.style.border = isSelected ? '1px solid #0098ff' : '1px solid #555';
            btn.style.padding = '5px 10px';
            btn.innerHTML = `<span style="color: ${suitData.color};">${suitData.symbol}</span> ${suitData.name}`;
            btn.onclick = () => { this.currentSuit = suitKey; this.renderSuits(); this.renderCards(); };
            this.suitsContainer.appendChild(btn);
        }
    }

    renderCards() {
        this.cardsGrid.innerHTML = '';
        const suitData = this.suitsInfo[this.currentSuit];
        this.cardsCountLabel.textContent = this.selectedCards.length;

        this.ranks.forEach(rank => {
            const cardId = `${rank.id}_${this.currentSuit}`;
            const isSelected = this.selectedCards.includes(cardId);
            const cardEl = document.createElement('div');
            cardEl.style.cssText = `width:35px; height:50px; border-radius:4px; cursor:pointer; user-select:none; display:flex; flex-direction:column; justify-content:center; align-items:center; color:${suitData.color}; background:${isSelected ? '#fffacd' : '#fff'}; border:${isSelected ? '2px solid #ff9800' : '1px solid #ccc'}; font-size:12px; font-weight:bold;`;
            cardEl.innerHTML = `${rank.label}<br><span style="font-size:16px">${suitData.symbol}</span>`;
            
            cardEl.onclick = () => {
                if (isSelected) this.selectedCards = this.selectedCards.filter(c => c !== cardId);
                else this.selectedCards.push(cardId);
                this.renderCards();
            };
            this.cardsGrid.appendChild(cardEl);
        });
    }

    // --- РЕШАТЕЛЬ ЗАДАЧИ ---
    solveMath(container) {
        const solutionBox = container.querySelector('#solution-box');
        const solutionText = container.querySelector('#solution-text');
        solutionBox.style.display = 'block';

        const N = this.selectedCards.length;
        const K = parseInt(container.querySelector('#combo-k').value);

        if (N === 0) {
            solutionText.innerHTML = "<span style='color:red;'>Ошибка: База карт пуста. Сначала добавьте карты в набор!</span>";
            return;
        }
        if (K > N) {
            solutionText.innerHTML = `<span style='color:red;'>Ошибка: Нельзя вытянуть ${K} карт из колоды в ${N} карт.</span>`;
            return;
        }

        let totalWays = this.combinations(N, K);
        let log = `Всего карт в базе: <b>N = ${N}</b><br>`;
        log += `Нужно вытянуть: <b>k = ${K}</b><br>`;
        log += `Всего возможных комбинаций без ограничений: C(${N}, ${K}) = <b>${totalWays}</b><br><br>`;

        if (this.conditions.length === 0) {
            log += `<strong style="color:#28a745;">Ответ: ${totalWays} комбинаций.</strong>`;
            solutionText.innerHTML = log;
            return;
        }

        log += `<span style="color:#64b5f6;">--- Применяем ограничения ---</span><br>`;
        let remainingN = N;
        let remainingK = K;
        let validCombinations = 1;

        for (const cond of this.conditions) {
            // Ищем подходящие карты в базе
            const matchingCards = this.selectedCards.filter(cardId => {
                const parts = cardId.split('_');
                return cond.type === 'suit' ? parts[1] === cond.value : parts[0] === cond.value;
            });

            const poolSize = matchingCards.length;
            const needed = cond.count;

            log += `> Условие: ${cond.name} (${needed} шт.)<br>`;
            log += `В базе таких карт: ${poolSize} шт.<br>`;

            if (needed > poolSize) {
                log += `<strong style="color:red;">Задача не имеет решения (0 вариантов).</strong> Вы просите ${needed} карт, а в колоде их всего ${poolSize}.`;
                solutionText.innerHTML = log;
                return;
            }

            const waysForThis = this.combinations(poolSize, needed);
            log += `Кол-во способов выбрать эти карты: C(${poolSize}, ${needed}) = ${waysForThis}<br><br>`;
            
            validCombinations *= waysForThis;
            remainingN -= poolSize;
            remainingK -= needed;
        }

        if (remainingK < 0) {
             log += `<strong style="color:red;">Ошибка: Вы запросили в условиях больше карт, чем размер выборки (k).</strong>`;
             solutionText.innerHTML = log;
             return;
        }

        log += `> Добираем остальные карты:<br>`;
        log += `Осталось дотянуть карт: ${remainingK}<br>`;
        log += `Осталось свободных карт в колоде: ${remainingN}<br>`;
        
        const remainingWays = this.combinations(remainingN, remainingK);
        log += `Способов добрать: C(${remainingN}, ${remainingK}) = ${remainingWays}<br><br>`;
        
        validCombinations *= remainingWays;

        log += `<strong style="color:#28a745; font-size:16px;">Итоговый ответ: ${validCombinations} комбинаций.</strong>`;
        solutionText.innerHTML = log;
    }

    // --- XML ГЕНЕРАТОР ---
    generateXmlToEditor(container) {
        const xmlEditor = document.getElementById('xml-editor');
        const k = container.querySelector('#combo-k').value;
        
        let xml = `<root>\n  <task>\n    <source>\n      <set type="CombinationSet" k="${k}">\n        <set>\n`;
        this.selectedCards.forEach(card => xml += `          <element type="OneCard" value="${card}"/>\n`);
        xml += `        </set>\n      </set>\n    </source>\n`;
        
        if (this.conditions.length > 0) {
            xml += `    <func type="Intersect">\n`;
            this.conditions.forEach(cond => {
                const xmlType = cond.type === 'suit' ? 'SuitFilter' : 'CardFilter'; // Можно адаптировать под вашу Java-логику
                xml += `      <func type="${xmlType}" value="${cond.value}" count="${cond.count}" />\n`;
            });
            xml += `    </func>\n`;
        }
        
        xml += `  </task>\n</root>`;
        xmlEditor.value = xml;
        xmlEditor.style.backgroundColor = '#2c3e50';
        setTimeout(() => xmlEditor.style.backgroundColor = '#1e1e1e', 300);
    }
}