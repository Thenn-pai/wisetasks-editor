import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class EquationGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.conditions = [];
        this.pageTitle = 'Уравнения';
        this.operators = {
            '<=': '≤',
            '>=': '≥',
            '=': '=',
            '<': '<',
            '>': '>'
        };
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
                
                <div style="width: 280px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Уравнения</h3>
                        <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 1: База</b><br>Задайте конечную сумму <b>S</b> и количество переменных <b>k</b>.</p>
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 2: Ограничения</b><br>Задайте рамки для переменных (например, x₁ ≤ 2).</p>
                            <p><b style="color: white;">Шаг 3: Расчет</b><br>Задача отправится в раздел решений.</p>
                        </div>
                    </div>
                </div>

                <div style="flex: 1;">
                    <h2 style="margin-bottom: 20px; font-weight: 600;">Генератор: Решения уравнения</h2>
                    
                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(30, 41, 59, 0.4); border: 1px solid #334155; border-radius: 8px;">
                        <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">Базовые ограничения:</label>
                        
                        <div style="display: flex; align-items: center; gap: 25px; flex-wrap: wrap;">
                            <div>
                                <span style="color: #cbd5e1; margin-right: 10px;">Конечная сумма (S):</span>
                                <input type="number" id="eq-sum" value="25" min="1" max="100" style="width: 80px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                            </div>
                            
                            <div>
                                <span style="color: #cbd5e1; margin-right: 10px;">Количество неизвестных (k):</span>
                                <select id="eq-vars" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                                    ${[2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" ${n===4?'selected':''}>${n}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid #3b82f6; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">Ограничения на переменные:</label>

                        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 15px;">
                            <select id="cond-var" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                                </select>
                            <select id="cond-op" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                                ${Object.entries(this.operators).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
                            </select>
                            <input type="number" id="cond-val" value="2" min="0" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                            <button id="add-cond-btn" class="btn" style="background: #3b82f6; margin-left: auto;">+ Добавить</button>
                        </div>

                        <div id="conditions-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
                    </div>

                    <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Создать задачу</button>
                </div>
            </div>
        `;

        this.attachEvents(container);
        this.updateVarDropdown(container);
    }

    attachEvents(container) {
        const varsSelect = container.querySelector('#eq-vars');
        varsSelect.addEventListener('change', () => this.updateVarDropdown(container));

        container.querySelector('#add-cond-btn').onclick = () => {
            const varIndex = parseInt(container.querySelector('#cond-var').value);
            const op = container.querySelector('#cond-op').value;
            const val = parseInt(container.querySelector('#cond-val').value);

            const exists = this.conditions.some(c => c.varIndex === varIndex && c.op === op && c.val === val);
            if (!exists) {
                this.conditions.push({ varIndex, op, val });
                this.renderConditions(container);
            }
        };

        container.querySelector('#generate-xml-btn').onclick = () => {
            this.generateAndSaveTask(container);
        };
    }

    updateVarDropdown(container) {
        const k = parseInt(container.querySelector('#eq-vars').value);
        const varSelect = container.querySelector('#cond-var');
        varSelect.innerHTML = '';
        for (let i = 1; i <= k; i++) {
            varSelect.innerHTML += `<option value="${i}">x${i}</option>`;
        }
    }

    renderConditions(container) {
        const list = container.querySelector('#conditions-list');
        list.innerHTML = '';
        this.conditions.forEach((cond, index) => {
            const tag = document.createElement('div');
            tag.style.display = 'flex';
            tag.style.justifyContent = 'space-between';
            tag.style.background = 'rgba(0,0,0,0.3)';
            tag.style.padding = '10px 15px';
            tag.style.border = '1px solid #475569';
            tag.style.borderRadius = '6px';
            
            tag.innerHTML = `
                <span style="color: #cbd5e1; font-size: 15px;">Ограничение: <strong style="color:#f59e0b;">x${cond.varIndex} ${this.operators[cond.op]} ${cond.val}</strong></span>
                <span style="color: #ef4444; cursor: pointer; font-weight: bold; padding: 0 5px;" title="Удалить">✕</span>
            `;
            tag.querySelector('span:last-child').onclick = () => {
                this.conditions.splice(index, 1);
                this.renderConditions(container);
            };
            list.appendChild(tag);
        });
    }

    generateAndSaveTask(container) {
        const S = parseInt(container.querySelector('#eq-sum').value);
        const K = parseInt(container.querySelector('#eq-vars').value);
        
        const varsStr = Array.from({length: K}, (_, i) => `x<sub>${i+1}</sub>`).join(' + ');
        
        let text = `Найдите количество целых неотрицательных решений уравнения:<br>`;
        text += `<div style="font-size: 18px; margin: 10px 0; color: #f59e0b;">${varsStr} = ${S}</div>`;
        
        if (this.conditions.length > 0) {
            text += `Удовлетворяющих следующим ограничениям: `;
            const condTexts = this.conditions.map(c => `x<sub>${c.varIndex}</sub> ${this.operators[c.op]} ${c.val}`);
            text += `<b>${condTexts.join(', ')}</b>.`;
        } else {
            text += `Дополнительных ограничений нет.`;
        }

        if (this.conditions.length === 0) {
            const baseWays = this.combinations(S + K - 1, K - 1);
            
            this.saveTask({
                title: `Уравнение: S = ${S}, k = ${K}`,
                descriptionHtml: text,
                solutionHtml: '',
                answerText: baseWays.toString(),
                category: this.pageTitle
            });
            alert("Задача успешно сгенерирована и добавлена в раздел «Решение задач»!");
            return;
        }

        let domains = Array.from({length: K}, () => ({ min: 0, max: S }));
        let isValid = true;

        this.conditions.forEach(c => {
            const d = domains[c.varIndex - 1];
            if (c.op === '<=') d.max = Math.min(d.max, c.val);
            if (c.op === '<') d.max = Math.min(d.max, c.val - 1);
            if (c.op === '>=') d.min = Math.max(d.min, c.val);
            if (c.op === '>') d.min = Math.max(d.min, c.val + 1);
            if (c.op === '=') { d.min = Math.max(d.min, c.val); d.max = Math.min(d.max, c.val); }
        });

        for (let i = 0; i < K; i++) {
            let d = domains[i];
            if (d.min > d.max) isValid = false;
        }

        if (!isValid) {
            alert("Ошибка: Система неравенств противоречива! Некоторые переменные имеют взаимоисключающие условия.");
            return;
        }

        const exactCount = this.calculateDP(S, K, domains);
        
        this.saveTask({
            title: `Уравнение: S = ${S}, k = ${K}`,
            descriptionHtml: text,
            solutionHtml: '',
            answerText: exactCount.toString(),
            category: this.pageTitle
        });
        alert("Задача успешно сгенерирована и добавлена в раздел «Решение задач»!");
    }

    calculateDP(S, K, domains) {
        let dp = new Array(S + 1).fill(0);
        dp[0] = 1;

        for (let i = 0; i < K; i++) {
            let nextDp = new Array(S + 1).fill(0);
            let d = domains[i];
            
            for (let currSum = 0; currSum <= S; currSum++) {
                if (dp[currSum] > 0) {
                    for (let val = d.min; val <= d.max; val++) {
                        if (currSum + val <= S) {
                            nextDp[currSum + val] += dp[currSum];
                        }
                    }
                }
            }
            dp = nextDp;
        }
        return dp[S];
    }
}