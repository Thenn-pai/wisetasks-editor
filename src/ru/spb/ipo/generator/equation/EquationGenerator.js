import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class EquationGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.conditions = [];
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
                
                <div style="width: 300px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Уравнения</h3>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">О чем этот генератор?</strong><br>
                            Он ищет количество целых неотрицательных решений для уравнения вида:<br>
                            <i style="color:#f59e0b;">x₁ + x₂ + ... + xₖ = S</i>
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 1: Базовые настройки</strong><br>
                            Задайте конечную сумму <b>S</b> и количество неизвестных переменных <b>k</b>.
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 2: Ограничения</strong><br>
                            По умолчанию каждая переменная может быть от 0 до S. Вы можете сузить рамки, добавив условия (например, x₁ ≤ 2 или x₂ ≥ 5).
                        </div>

                        <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 3: Метод решения</strong><br>
                            Система использует комбинаторный метод «Шаров и перегородок», а для сложных систем неравенств применяет Динамическое Программирование.
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

                    <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Сгенерировать и Решить</button>

                    <div id="solution-box" style="display: none; padding: 25px; background: #1e293b; border-top: 4px solid #10b981; border-radius: 8px; margin-bottom: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                        <h4 style="margin: 0 0 15px 0; color: #10b981; font-size: 18px;">Сгенерированное условие задачи:</h4>
                        <div id="problem-text" style="font-size: 16px; line-height: 1.6; color: #f8fafc; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #3b82f6;"></div>

                        <h4 style="margin: 0 0 15px 0; color: #f59e0b; font-size: 18px;">Математический разбор:</h4>
                        <div id="solution-text" style="font-size: 14px; line-height: 1.8; color: #cbd5e1;"></div>
                    </div>
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

            // Проверяем, нет ли уже точно такого же условия
            const exists = this.conditions.some(c => c.varIndex === varIndex && c.op === op && c.val === val);
            if (!exists) {
                this.conditions.push({ varIndex, op, val });
                this.renderConditions(container);
            }
        };

        container.querySelector('#generate-xml-btn').onclick = () => {
            this.generateProblemText(container);
            this.solveMath(container);
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

    generateProblemText(container) {
        const S = container.querySelector('#eq-sum').value;
        const K = container.querySelector('#eq-vars').value;
        const textBox = container.querySelector('#problem-text');
        
        // Создаем красивый текст уравнения: x1 + x2 + x3 + x4 = S
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
        
        textBox.innerHTML = text;
    }

    solveMath(container) {
        const solutionBox = container.querySelector('#solution-box');
        const solutionText = container.querySelector('#solution-text');
        solutionBox.style.display = 'block';

        const S = parseInt(container.querySelector('#eq-sum').value);
        const K = parseInt(container.querySelector('#eq-vars').value);

        let log = `<b style="color:#60a5fa;">Анализ уравнения:</b><br>`;
        log += `Сумма (S) = ${S}<br>Количество переменных (k) = ${K}<br><br>`;

        // Формула шаров и перегородок (Stars and Bars)
        const baseWays = this.combinations(S + K - 1, K - 1);
        log += `• Без ограничений применяется метод "Шаров и перегородок" (размещения с повторениями).<br>`;
        log += `Формула: C(S + k - 1, k - 1) = C(${S} + ${K} - 1, ${K} - 1) = C(${S + K - 1}, ${K - 1}) = <b>${baseWays}</b> решений.<br><br>`;

        if (this.conditions.length === 0) {
            log += `<strong style="color:#10b981; font-size:18px;">Ответ: ${baseWays} решений.</strong>`;
            solutionText.innerHTML = log;
            return;
        }

        log += `<b style="color:#f59e0b;">Применение ограничений (Динамическое Программирование):</b><br>`;
        
        // Строим домены допустимых значений для каждой переменной
        // Изначально каждая x_i может быть от 0 до S
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

        // Выводим рамки для наглядности
        for (let i = 0; i < K; i++) {
            let d = domains[i];
            if (d.min > d.max) isValid = false;
            
            let rangeText = "";
            if (d.min === d.max) rangeText = `строго ${d.min}`;
            else if (d.min === 0 && d.max === S) rangeText = `любое [0 ... ${S}]`;
            else rangeText = `от ${d.min} до ${d.max}`;
            
            log += `x<sub>${i+1}</sub>: ${rangeText}<br>`;
        }
        log += `<br>`;

        if (!isValid) {
            log += `<strong style="color:#ef4444; font-size:16px;">Система неравенств противоречива!</strong><br>Некоторые переменные имеют взаимоисключающие условия.`;
            solutionText.innerHTML = log;
            return;
        }

        // Запуск DP (Динамическое программирование)
        log += `Алгоритм вычисляет количество разбиений суммы по таблице допустимых диапазонов...<br><br>`;
        
        const exactCount = this.calculateDP(S, K, domains);
        
        if (exactCount === 0) {
             log += `<strong style="color:#ef4444; font-size:16px;">Ответ: 0 решений.</strong><br>В заданных диапазонах невозможно набрать ровно сумму ${S}.`;
        } else {
             log += `<strong style="color:#10b981; font-size:18px;">Итоговый точный ответ: ${exactCount} решений.</strong>`;
        }
        
        solutionText.innerHTML = log;
    }

    // Динамическое программирование для поиска решений
    // O(K * S^2) - для наших небольших чисел (S<=100) работает за 1 миллисекунду
    calculateDP(S, K, domains) {
        // dp[sum] = количество способов набрать сумму 'sum'
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