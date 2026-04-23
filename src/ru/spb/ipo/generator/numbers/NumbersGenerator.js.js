import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class NumbersGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.conditions = [];
        this.firstNotZero = true;
        
        this.conditionTypes = {
            'distinct': 'Набор состоит из различных цифр',
            'adjacent_distinct': 'Соседние цифры набора различны',
            'descending': 'Цифры набора идут в убывающем порядке (строго)',
            'ascending': 'Цифры набора идут в возрастающем порядке (строго)',
            'non_descending': 'Цифры набора идут в неубывающем порядке',
            'non_ascending': 'Цифры набора идут в невозрастающем порядке'
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
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Числа</h3>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 1: Выбор цифр</strong><br>
                            Укажите максимальную цифру (по умолчанию 9). Это задаст алфавит набора, например от 0 до 9.
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 2: Первая цифра</strong><br>
                            Если включена галочка "Первая цифра не 0", система будет рассматривать наборы как реальные числа (число не может начинаться с нуля).
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 3: Структура набора</strong><br>
                            Укажите размер набора (k) и добавьте математические ограничения: строгое возрастание, уникальность соседей и т.д.
                        </div>

                        <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 4: Расчет</strong><br>
                            Система выведет текст условия и пошагово распишет математику ответа.
                        </div>
                    </div>
                </div>

                <div style="flex: 1;">
                    <h2 style="margin-bottom: 20px; font-weight: 600;">Генератор: Упорядоченные числовые наборы</h2>
                    
                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(30, 41, 59, 0.4); border: 1px solid #334155; border-radius: 8px;">
                        <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">Формирование числовой базы:</label>
                        
                        <div style="display: flex; align-items: center; gap: 25px; flex-wrap: wrap;">
                            <div>
                                <span style="color: #cbd5e1; margin-right: 10px;">Цифры в наборе от 0 до:</span>
                                <select id="max-digit" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                                    ${[1,2,3,4,5,6,7,8,9].map(n => `<option value="${n}" ${n===9?'selected':''}>${n}</option>`).join('')}
                                </select>
                            </div>
                            
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #f8fafc;">
                                <input type="checkbox" id="first-not-zero" checked style="width: 18px; height: 18px; accent-color: #3b82f6;">
                                Первая цифра не 0
                            </label>

                            <div>
                                <span style="color: #cbd5e1; margin-right: 10px;">Размер набора (k):</span>
                                <input type="number" id="set-size" value="5" min="1" max="15" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid #3b82f6; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">Ограничения структуры:</label>

                        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 15px;">
                            <select id="cond-type" style="flex: 1; padding: 10px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                                ${Object.entries(this.conditionTypes).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
                            </select>
                            <button id="add-cond-btn" class="btn" style="background: #3b82f6;">+ Добавить</button>
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
    }

    attachEvents(container) {
        container.querySelector('#add-cond-btn').onclick = () => {
            const type = container.querySelector('#cond-type').value;
            if (!this.conditions.includes(type)) {
                this.conditions.push(type);
                this.renderConditions(container);
            }
        };

        container.querySelector('#generate-xml-btn').onclick = () => {
            this.firstNotZero = container.querySelector('#first-not-zero').checked;
            this.generateProblemText(container);
            this.solveMath(container);
        };
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
                <span style="color: #cbd5e1;">${this.conditionTypes[cond]}</span>
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
        const maxD = container.querySelector('#max-digit').value;
        const k = container.querySelector('#set-size').value;
        const textBox = container.querySelector('#problem-text');
        
        let text = `Имеется набор цифр от <b>0</b> до <b>${maxD}</b>. Подсчитайте количество возможных упорядоченных числовых наборов длины <b>${k}</b>.`;
        
        const reqs = [];
        if (this.firstNotZero) reqs.push(`первая цифра набора не может быть равна 0`);
        this.conditions.forEach(c => reqs.push(this.conditionTypes[c].toLowerCase()));

        if (reqs.length > 0) {
            text += `<br>Дополнительные условия: <i>${reqs.join('; ')}</i>.`;
        }
        
        textBox.innerHTML = text;
    }

    solveMath(container) {
        const solutionBox = container.querySelector('#solution-box');
        const solutionText = container.querySelector('#solution-text');
        solutionBox.style.display = 'block';

        const maxD = parseInt(container.querySelector('#max-digit').value);
        const K = parseInt(container.querySelector('#set-size').value);
        const M = maxD + 1; // Количество доступных цифр

        let log = `<b style="color:#60a5fa;">Анализ исходных данных:</b><br>`;
        log += `Алфавит цифр: {0, 1, ..., ${maxD}} (всего цифр M = ${M})<br>`;
        log += `Длина набора (k) = ${K}<br><br>`;

        // Базовый расчет
        let baseWays = Math.pow(M, K);
        if (this.firstNotZero) {
            baseWays = (M - 1) * Math.pow(M, K - 1);
            log += `• Без ограничений: Первая цифра выбирается ${M-1} способами (т.к. не 0), остальные ${K-1} позиций — любыми из ${M}.<br>`;
            log += `Формула: (${M}-1) * ${M}^${K-1} = <b>${baseWays}</b> наборов.<br><br>`;
        } else {
            log += `• Без ограничений (0 может быть первым): M^k = ${M}^${K} = <b>${baseWays}</b> наборов.<br><br>`;
        }

        if (this.conditions.length === 0) {
            log += `<strong style="color:#10b981; font-size:18px;">Ответ: ${baseWays} наборов.</strong>`;
            solutionText.innerHTML = log;
            return;
        }

        log += `<b style="color:#f59e0b;">Применение ограничений структуры:</b><br>`;
        
        // Попытка использовать точную аналитическую формулу для 1 ограничения
        if (this.conditions.length === 1) {
            const cond = this.conditions[0];
            let ans = 0;

            if (cond === 'distinct') {
                if (K > M) {
                    ans = 0;
                    log += `Нельзя выбрать ${K} уникальных цифр из алфавита размером ${M}.<br>`;
                } else {
                    if (this.firstNotZero) {
                        ans = (M - 1) * (this.fact(M - 1) / this.fact((M - 1) - (K - 1)));
                        log += `Формула (размещения без повторений, первая не 0): (M-1) * A(M-1, K-1) = ${M-1} * ${M-1}!/(${M-1}-${K-1})! = <b>${ans}</b>.<br>`;
                    } else {
                        ans = this.fact(M) / this.fact(M - K);
                        log += `Формула (размещения без повторений): A(M, K) = M!/(M-K)! = <b>${ans}</b>.<br>`;
                    }
                }
            } 
            else if (cond === 'adjacent_distinct') {
                if (this.firstNotZero) {
                    ans = (M - 1) * Math.pow(M - 1, K - 1);
                    log += `Формула: Первая цифра (${M-1} вариантов), каждая следующая не равна предыдущей (${M-1} вариантов).<br>`;
                    log += `(M-1) * (M-1)^(k-1) = <b>${ans}</b>.<br>`;
                } else {
                    ans = M * Math.pow(M - 1, K - 1);
                    log += `Формула: Первая цифра (M вариантов), каждая следующая не равна предыдущей (M-1 вариантов).<br>`;
                    log += `M * (M-1)^(k-1) = <b>${ans}</b>.<br>`;
                }
            }
            else if (cond === 'ascending') {
                if (K > M) {
                    ans = 0;
                    log += `Строгое возрастание ${K} цифр невозможно, так как максимальная цифра ${maxD}.<br>`;
                } else {
                    if (this.firstNotZero) {
                        ans = this.combinations(M - 1, K);
                        log += `Строгое возрастание означает выбор уникальных k цифр (ноль использовать нельзя, так как он может стоять только на 1-м месте, а первая цифра не 0).<br>`;
                        log += `Формула: C(M-1, K) = C(${M-1}, ${K}) = <b>${ans}</b>.<br>`;
                    } else {
                        ans = this.combinations(M, K);
                        log += `Строгое возрастание равноценно выбору любых уникальных k цифр (они сами встанут по порядку).<br>`;
                        log += `Формула: C(M, K) = C(${M}, ${K}) = <b>${ans}</b>.<br>`;
                    }
                }
            }
            else if (cond === 'descending') {
                if (K > M) {
                    ans = 0;
                    log += `Строгое убывание ${K} цифр невозможно.<br>`;
                } else {
                    ans = this.combinations(M, K);
                    // Если первая не 0, единственная недопустимая комбинация - это [0] (при K=1).
                    if (this.firstNotZero && K === 1) ans -= 1;
                    log += `Строгое убывание равноценно выбору уникальных k цифр.<br>`;
                    log += `Формула: C(M, K) = <b>${ans}</b>.<br>`;
                }
            }
            else {
                 log += `Для данного условия запущен алгоритм комбинаторного перебора с отсечением (DFS Pruning).<br>`;
                 ans = this.calculateDFS(maxD, K);
            }

            log += `<br><strong style="color:#10b981; font-size:18px;">Итоговый ответ: ${ans} наборов.</strong>`;
            solutionText.innerHTML = log;
            return;
        }

        // Если условий несколько — используем умный граф перебора
        log += `В задаче несколько структурных ограничений. Аналитический расчет может дать сбой из-за сложных пересечений.<br>`;
        log += `Запущен математический граф поиска в глубину (DFS) с динамическим отсечением неверных ветвей...<br><br>`;
        
        const exactCount = this.calculateDFS(maxD, K);
        
        if (exactCount === 0) {
             log += `<strong style="color:#ef4444; font-size:16px;">Внимание: Комбинация заданных условий математически невозможна!</strong><br>Таких числовых наборов не существует.`;
        } else {
             log += `<strong style="color:#10b981; font-size:18px;">Итоговый точный ответ (граф): ${exactCount} наборов.</strong>`;
        }
        
        solutionText.innerHTML = log;
    }

    // Мгновенный алгоритм перебора для сложных пересечений
    calculateDFS(maxD, K) {
        let count = 0;
        const noZero = this.firstNotZero;
        const conds = this.conditions;

        const dfs = (depth, currentSeq) => {
            if (depth === K) {
                count++;
                return;
            }

            for (let i = 0; i <= maxD; i++) {
                // Условие: Первая не ноль
                if (depth === 0 && noZero && i === 0) continue;

                // Быстрое отсечение ветвей (Pruning)
                if (depth > 0) {
                    const prev = currentSeq[depth - 1];
                    if (conds.includes('distinct') && currentSeq.includes(i)) continue;
                    if (conds.includes('adjacent_distinct') && prev === i) continue;
                    if (conds.includes('descending') && prev <= i) continue;
                    if (conds.includes('ascending') && prev >= i) continue;
                    if (conds.includes('non_descending') && prev > i) continue;
                    if (conds.includes('non_ascending') && prev < i) continue;
                }

                currentSeq.push(i);
                dfs(depth + 1, currentSeq);
                currentSeq.pop();
            }
        };

        dfs(0, []);
        return count;
    }
}