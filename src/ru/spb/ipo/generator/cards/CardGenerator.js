import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class CardGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.selectedCards = []; 
        this.currentSuit = 'chervi'; 
        this.conditions = []; 
        
        // Добавлено разделение цветов: cardColor (для белых карт) и uiColor (для темных кнопок)
        this.suitsInfo = {
            'chervi': { name: 'Черви', symbol: '♥', cardColor: '#ef4444', uiColor: '#ef4444' },
            'bubi':   { name: 'Буби', symbol: '♦', cardColor: '#ef4444', uiColor: '#ef4444' },
            'tref':   { name: 'Трефы', symbol: '♣', cardColor: '#111111', uiColor: '#cbd5e1' },
            'pik':    { name: 'Пики', symbol: '♠', cardColor: '#111111', uiColor: '#cbd5e1' }
        };
        
        this.ranks = [
            { id: '6', label: '6' }, { id: '7', label: '7' }, { id: '8', label: '8' },
            { id: '9', label: '9' }, { id: '10', label: '10' }, { id: 'valet', label: 'В' },
            { id: 'dama', label: 'Д' }, { id: 'korol', label: 'К' }, { id: 'tuz', label: 'Т' }
        ];
    }

    fact(n) {
        if (n <= 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    combinations(n, k) {
        if (k < 0 || k > n) return 0;
        return Math.round(this.fact(n) / (this.fact(k) * this.fact(n - k)));
    }

    renderUI(container) {
        container.innerHTML = `
            <div style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto;">
                
                <div style="width: 300px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Как составить задачу?</h3>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 1: Сформируйте колоду</strong><br>
                            Нажмите «+ Колода 36 карт», чтобы добавить стандартный набор, или выберите конкретные карты вручную.
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 2: Укажите размер выборки</strong><br>
                            Параметр <b>k</b> определяет, сколько всего карт студент должен «вытянуть» из сформированной колоды (например, 5).
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 3: Задайте ограничения</strong><br>
                            Добавьте условия. Например: <i>«Среди вытянутых карт должно быть ровно 2 Пики и 1 Девятка»</i>.
                        </div>

                        <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 4: Сгенерируйте решение</strong><br>
                            Система сама напишет текст задачи для студента и покажет точный математический разбор.
                        </div>
                    </div>
                </div>

                <div style="flex: 1;">
                    <h2 style="margin-bottom: 20px; font-weight: 600;">Генератор: Комбинаторика Карт</h2>
                    
                    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                        <button id="select-36-btn" class="btn" style="background: #e67e22;">+ Колода 36 карт</button>
                        <button id="clear-cards-btn" class="btn" style="background: #a93226;">Очистить базу</button>
                    </div>

                    <div style="margin-bottom: 20px; padding: 15px; background: rgba(30, 41, 59, 0.4); border: 1px solid #334155; border-radius: 8px;">
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;" id="suits-container"></div>
                        <div id="cards-grid" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
                        <div style="margin-top: 15px; font-size: 14px; color: #94a3b8;">
                            Карт в базовой колоде: <strong id="cards-count" style="color: white; font-size: 16px;">0</strong>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid #3b82f6; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600; font-size: 15px;">Условия и ограничения:</label>
                        
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #334155;">
                            <span style="color: #cbd5e1;">Размер выборки (тянем <b>k</b> карт):</span>
                            <input type="number" id="combo-k" value="5" min="1" max="36" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                        </div>

                        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 10px;">
                            <select id="cond-type" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                                <option value="suit">Масть</option>
                                <option value="rank">Номинал (Ранг)</option>
                            </select>
                            <select id="cond-value" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;"></select>
                            <span style="color: #cbd5e1;">Количество:</span>
                            <input type="number" id="cond-count" value="2" min="1" max="36" style="width: 60px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                            <button id="add-cond-btn" class="btn" style="background: #3b82f6; margin-left: auto;">+ Добавить условие</button>
                        </div>

                        <div id="conditions-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
                    </div>

                    <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Создать и Решить задачу</button>

                    <div id="solution-box" style="display: none; padding: 25px; background: #1e293b; border-top: 4px solid #10b981; border-radius: 8px; margin-bottom: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                        <h4 style="margin: 0 0 15px 0; color: #10b981; font-size: 18px;">Сгенерированный текст:</h4>
                        <div id="problem-text" style="font-size: 16px; line-height: 1.6; color: #f8fafc; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #3b82f6;"></div>

                        <h4 style="margin: 0 0 15px 0; color: #f59e0b; font-size: 18px;">Математический разбор:</h4>
                        <div id="solution-text" style="font-size: 14px; line-height: 1.8; color: #cbd5e1;"></div>
                    </div>
                </div>
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
            this.generateProblemText(container);
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
        if (this.conditions.length === 0) return;

        this.conditions.forEach((cond, index) => {
            const tag = document.createElement('div');
            tag.style.display = 'flex';
            tag.style.justifyContent = 'space-between';
            tag.style.background = 'rgba(0,0,0,0.3)';
            tag.style.padding = '10px 15px';
            tag.style.border = '1px solid #475569';
            tag.style.borderRadius = '6px';
            
            // Используем uiColor для условий
            const suitData = Object.values(this.suitsInfo).find(s => s.name === cond.name);
            const nameColor = suitData ? suitData.uiColor : '#f59e0b';

            tag.innerHTML = `
                <span style="color: #cbd5e1;">В выборке должно быть: <strong style="color:#f8fafc; font-size: 15px;">${cond.count}</strong> шт. из группы «<strong style="color:${nameColor};">${cond.name}</strong>»</span>
                <span style="color: #ef4444; cursor: pointer; font-weight: bold; padding: 0 5px;" title="Удалить">✕</span>
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
            btn.style.background = isSelected ? '#3b82f6' : '#1e293b';
            btn.style.border = isSelected ? '1px solid #60a5fa' : '1px solid #475569';
            btn.style.padding = '8px 15px';
            // Используем uiColor для кнопок
            btn.innerHTML = `<span style="color: ${suitData.uiColor}; font-size: 16px;">${suitData.symbol}</span> <span style="color: ${isSelected ? '#fff' : '#cbd5e1'}">${suitData.name}</span>`;
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
            // Используем cardColor (черный/красный) для самих карт!
            cardEl.style.cssText = `width:45px; height:65px; border-radius:6px; cursor:pointer; user-select:none; display:flex; flex-direction:column; justify-content:center; align-items:center; color:${suitData.cardColor}; background:${isSelected ? '#fef08a' : '#f8fafc'}; border:${isSelected ? '3px solid #f59e0b' : '1px solid #cbd5e1'}; font-size:14px; font-weight:bold; box-shadow: ${isSelected ? '0 0 10px rgba(245, 158, 11, 0.4)' : '0 2px 4px rgba(0,0,0,0.1)'}; transition: transform 0.1s;`;
            cardEl.innerHTML = `${rank.label}<br><span style="font-size:22px; line-height:1;">${suitData.symbol}</span>`;
            
            cardEl.onmouseenter = () => cardEl.style.transform = 'translateY(-3px)';
            cardEl.onmouseleave = () => cardEl.style.transform = 'translateY(0)';
            
            cardEl.onclick = () => {
                if (isSelected) this.selectedCards = this.selectedCards.filter(c => c !== cardId);
                else this.selectedCards.push(cardId);
                this.renderCards();
            };
            this.cardsGrid.appendChild(cardEl);
        });
    }

    generateProblemText(container) {
        const k = container.querySelector('#combo-k').value;
        const textBox = container.querySelector('#problem-text');
        
        let text = `Из колоды в <b>${this.selectedCards.length}</b> карт вытаскивают случайным образом <b>${k}</b> карт. Подсчитайте количество наборов, в которых `;
        
        if (this.conditions.length === 0) {
            text += `нет дополнительных условий.`;
        } else {
            let condTexts = this.conditions.map(cond => {
                if (cond.type === 'suit') return `карт масти «${cond.name}» ровно ${cond.count}`;
                else return `имеется карта «${cond.name}» в количестве ${cond.count}`;
            });
            text += condTexts.join(', ') + '.';
        }
        textBox.innerHTML = text;
    }

    solveMath(container) {
        const solutionBox = container.querySelector('#solution-box');
        const solutionText = container.querySelector('#solution-text');
        solutionBox.style.display = 'block';

        const N = this.selectedCards.length;
        const K = parseInt(container.querySelector('#combo-k').value);

        if (N === 0) {
            solutionText.innerHTML = "<span style='color:#ef4444;'>Ошибка: Колода пуста. Добавьте карты.</span>";
            return;
        }

        let totalWays = this.combinations(N, K);
        let log = `Всего комбинаций (без условий): C(${N}, ${K}) = <b style="color:white;">${totalWays}</b><br><br>`;

        if (this.conditions.length === 0) {
            log += `<strong style="color:#10b981; font-size:18px;">Ответ: ${totalWays} комбинаций.</strong>`;
            solutionText.innerHTML = log;
            return;
        }

        let remainingN = N;
        let remainingK = K;
        let naiveCombinations = 1;

        for (const cond of this.conditions) {
            const matchingCards = this.selectedCards.filter(cardId => {
                const parts = cardId.split('_');
                return cond.type === 'suit' ? parts[1] === cond.value : parts[0] === cond.value;
            });
            const poolSize = matchingCards.length;
            const needed = cond.count;

            const waysForThis = this.combinations(poolSize, needed);
            log += `• Выбираем «${cond.name}» (${needed} из ${poolSize}): C(${poolSize}, ${needed}) = <b>${waysForThis}</b><br>`;
            
            naiveCombinations *= waysForThis;
            remainingN -= poolSize;
            remainingK -= needed;
        }

        const remainingWays = this.combinations(remainingN, remainingK);
        log += `• Добираем остальные ${remainingK} карт из оставшихся ${remainingN}: C(${remainingN}, ${remainingK}) = <b>${remainingWays}</b><br>`;
        naiveCombinations *= remainingWays;

        let exactCount = this.calculateExactCombinations(K);
        
        if (exactCount === naiveCombinations) {
             log += `<br><strong style="color:#10b981; font-size:18px;">Итоговый ответ: ${exactCount} комбинаций.</strong>`;
        } else {
             log += `<br><div style="background: rgba(245, 158, 11, 0.1); border-left: 3px solid #f59e0b; padding: 10px; margin-top: 10px;">`;
             log += `<span style="color:#f59e0b; font-weight:bold;">⚠️ Обнаружено пересечение множеств!</span><br>`;
             log += `Наивный расчет дал ответ ${naiveCombinations}, но алгоритм нашел карту, подходящую под оба условия одновременно (например, Девятку Пик).<br><br>`;
             log += `<b>Правильный ход решения строится на разделении гипотез:</b><br>`;
             log += `1) <i>Случай А:</i> Мы вытянули карту-пересечение. Тогда нам нужно добрать на 1 карту меньше из первого условия и на 1 меньше из второго.<br>`;
             log += `2) <i>Случай Б:</i> Мы НЕ вытянули эту карту. Тогда мы тянем карты строго из "чистых" остатков мастей и номиналов.<br>`;
             log += `Сумма этих непересекающихся случаев дает верный ответ.</div><br>`;
             log += `<strong style="color:#10b981; font-size:18px;">Точный ответ (после сложения гипотез): ${exactCount} комбинаций.</strong>`;
        }
        
        solutionText.innerHTML = log;
    }

    calculateExactCombinations(K) {
        let count = 0;
        const deck = this.selectedCards;
        const conds = this.conditions;

        const generateCombinations = (start, combo) => {
            if (combo.length === K) {
                let isValid = true;
                for (let cond of conds) {
                    let matchCount = 0;
                    for (let card of combo) {
                        const parts = card.split('_');
                        if (cond.type === 'suit' && parts[1] === cond.value) matchCount++;
                        if (cond.type === 'rank' && parts[0] === cond.value) matchCount++;
                    }
                    if (matchCount !== cond.count) {
                        isValid = false;
                        break;
                    }
                }
                if (isValid) count++;
                return;
            }
            for (let i = start; i < deck.length; i++) {
                combo.push(deck[i]);
                generateCombinations(i + 1, combo);
                combo.pop();
            }
        };

        generateCombinations(0, []);
        return count;
    }
}