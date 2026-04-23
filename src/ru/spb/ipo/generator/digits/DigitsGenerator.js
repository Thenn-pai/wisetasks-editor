import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class DigitsGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.mode = 'digits'; // 'digits' или 'modulo'
    }

    renderUI(container) {
        container.innerHTML = `
            <div style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto;">
                
                <div style="width: 300px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Делимость и Остатки</h3>
                        
                        <div id="guide-digits" style="display: block;">
                            <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                                <strong style="color: white;">Режим: Перестановка цифр</strong><br>
                                Алгоритм ищет исходное число заданной длины, которое при определенной перестановке цифр меняет свое значение в X раз.
                            </div>
                            <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                                <strong style="color: white;">Как задать комбинацию?</strong><br>
                                Используйте маркеры позиций: <b>[1]</b> - это первая цифра исходного числа, <b>[2]</b> - вторая и т.д. Можно добавлять обычные цифры. <br><i>Пример: 5[1][2] поставит пятерку перед числом.</i>
                            </div>
                        </div>

                        <div id="guide-modulo" style="display: none;">
                            <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                                <strong style="color: white;">Режим: Арифметика остатков</strong><br>
                                Вычисление остатка от деления сверхбольших чисел.
                            </div>
                            <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                                <strong style="color: white;">Механика</strong><br>
                                Используется технология BigInt, позволяющая оперировать числами любой длины (сотни символов), обходя ограничения стандартной памяти компьютера.
                            </div>
                        </div>
                    </div>
                </div>

                <div style="flex: 1;">
                    <h2 style="margin-bottom: 20px; font-weight: 600; display: flex; align-items: center; justify-content: space-between;">
                        Генератор: Теория чисел
                        
                        <select id="task-mode" style="padding: 8px 15px; background: #3b82f6; color: white; border: 1px solid #2563eb; border-radius: 6px; font-family: inherit; font-size: 14px; font-weight: bold; cursor: pointer; outline: none; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                            <option value="digits">Режим: Задачи на делимость (Перестановка цифр)</option>
                            <option value="modulo">Режим: Арифметика остатков</option>
                        </select>
                    </h2>
                    
                    <div id="mode-digits-panel" style="display: block;">
                        <div style="margin-bottom: 20px; padding: 20px; background: rgba(30, 41, 59, 0.4); border: 1px solid #334155; border-radius: 8px;">
                            <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px;">
                                <span style="color: #cbd5e1; font-weight: 600;">Количество цифр в числе (k):</span>
                                <input type="number" id="dig-count" value="4" min="2" max="8" style="width: 80px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                            </div>

                            <label style="display:block; margin-bottom: 10px; color: #60a5fa; font-weight: 600;">Правило формирования нового числа:</label>
                            
                            <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;" id="quick-buttons">
                                </div>

                            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px;">
                                <span style="color: #cbd5e1;">Комбинация:</span>
                                <input type="text" id="dig-pattern" value="[4][1][2][3]" placeholder="Например: [4][1][2][3]" style="flex: 1; padding: 10px; background: #1e293b; color: #f59e0b; font-family: monospace; font-size: 16px; border: 1px solid #475569; border-radius: 6px; letter-spacing: 1px;">
                                <button id="clear-pattern-btn" class="btn" style="background: #475569;">Сбросить</button>
                            </div>

                            <div style="display: flex; gap: 10px; align-items: center; padding-top: 20px; border-top: 1px solid #334155;">
                                <span style="color: #cbd5e1;">Новое число</span>
                                <select id="dig-relation" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                                    <option value="decrease">уменьшается в</option>
                                    <option value="increase">увеличивается в</option>
                                </select>
                                <input type="number" id="dig-factor" value="2" min="2" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                                <span style="color: #cbd5e1;">раз</span>
                            </div>
                        </div>
                    </div>

                    <div id="mode-modulo-panel" style="display: none;">
                        <div style="margin-bottom: 20px; padding: 25px; background: rgba(15, 23, 42, 0.6); border: 1px solid #8b5cf6; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                            <label style="display:block; margin-bottom: 15px; color: #c4b5fd; font-weight: 600; font-size: 16px;">Сверхбольшие числа по модулю:</label>
                            
                            <div style="margin-bottom: 15px;">
                                <span style="color: #cbd5e1; display: block; margin-bottom: 8px;">Делимое (A):</span>
                                <input type="text" id="mod-dividend" placeholder="Введите огромное число, например: 12345678901234567890" style="width: 100%; padding: 12px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: monospace; font-size: 15px;">
                            </div>
                            
                            <div>
                                <span style="color: #cbd5e1; display: block; margin-bottom: 8px;">Делитель (M):</span>
                                <input type="number" id="mod-divisor" placeholder="Например: 7" style="width: 200px; padding: 12px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: monospace; font-size: 15px;">
                            </div>
                        </div>
                    </div>

                    <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Сгенерировать и Решить задачу</button>

                    <div id="solution-box" style="display: none; padding: 25px; background: #1e293b; border-top: 4px solid #10b981; border-radius: 8px; margin-bottom: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                        <h4 style="margin: 0 0 15px 0; color: #10b981; font-size: 18px;">Сгенерированное условие задачи:</h4>
                        <div id="problem-text" style="font-size: 16px; line-height: 1.6; color: #f8fafc; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #3b82f6;"></div>

                        <h4 style="margin: 0 0 15px 0; color: #f59e0b; font-size: 18px;">Математический разбор:</h4>
                        <div id="solution-text" style="font-size: 14px; line-height: 1.8; color: #cbd5e1; word-wrap: break-word;"></div>
                    </div>
                </div>
            </div>
        `;

        this.attachEvents(container);
        this.renderQuickButtons(container);
    }

    attachEvents(container) {
        const modeSelect = container.querySelector('#task-mode');
        const panelDigits = container.querySelector('#mode-digits-panel');
        const panelModulo = container.querySelector('#mode-modulo-panel');
        const guideDigits = container.querySelector('#guide-digits');
        const guideModulo = container.querySelector('#guide-modulo');

        // Переключение режимов
        modeSelect.addEventListener('change', (e) => {
            this.mode = e.target.value;
            if (this.mode === 'digits') {
                panelDigits.style.display = 'block';
                panelModulo.style.display = 'none';
                guideDigits.style.display = 'block';
                guideModulo.style.display = 'none';
            } else {
                panelDigits.style.display = 'none';
                panelModulo.style.display = 'block';
                guideDigits.style.display = 'none';
                guideModulo.style.display = 'block';
            }
            container.querySelector('#solution-box').style.display = 'none';
        });

        // Динамические кнопки для цифр
        const kInput = container.querySelector('#dig-count');
        kInput.addEventListener('change', () => this.renderQuickButtons(container));

        const patternInput = container.querySelector('#dig-pattern');
        container.querySelector('#clear-pattern-btn').onclick = () => { patternInput.value = ''; };

        container.querySelector('#generate-xml-btn').onclick = () => {
            if (this.mode === 'digits') {
                this.generateDigitsText(container);
                this.solveDigits(container);
            } else {
                this.generateModuloText(container);
                this.solveModulo(container);
            }
        };
    }

    renderQuickButtons(container) {
        const k = parseInt(container.querySelector('#dig-count').value);
        const btnsContainer = container.querySelector('#quick-buttons');
        const patternInput = container.querySelector('#dig-pattern');
        btnsContainer.innerHTML = '';

        // Кнопки [1] ... [k]
        for (let i = 1; i <= k; i++) {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.style.cssText = 'background: #334155; padding: 5px 10px; font-size: 13px; margin-right: 5px;';
            btn.textContent = `[${i}]`;
            btn.onclick = () => { patternInput.value += `[${i}]`; };
            btnsContainer.appendChild(btn);
        }

        // Кнопки 0-9
        for (let i = 0; i <= 9; i++) {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.style.cssText = 'background: #0f172a; padding: 5px 10px; font-size: 13px; color: #f59e0b;';
            btn.textContent = i;
            btn.onclick = () => { patternInput.value += i; };
            btnsContainer.appendChild(btn);
        }
    }

    // ==========================================
    // ЛОГИКА 1: ПЕРЕСТАНОВКИ ЦИФР
    // ==========================================
    generateDigitsText(container) {
        const k = container.querySelector('#dig-count').value;
        const pattern = container.querySelector('#dig-pattern').value;
        const rel = container.querySelector('#dig-relation').value;
        const factor = container.querySelector('#dig-factor').value;
        const textBox = container.querySelector('#problem-text');
        
        let relText = rel === 'decrease' ? 'уменьшается' : 'увеличивается';
        let text = `Найти все целые положительные числа, состоящие из <b>${k}</b> цифр, такие что:<br>`;
        text += `Если составить новое число по правилу перестановки <b>«${pattern}»</b>, то оно <b>${relText} в ${factor} раз</b> по сравнению с исходным числом.`;
        
        textBox.innerHTML = text;
    }

    solveDigits(container) {
        const solutionBox = container.querySelector('#solution-box');
        const solutionText = container.querySelector('#solution-text');
        solutionBox.style.display = 'block';

        const K = parseInt(container.querySelector('#dig-count').value);
        const pattern = container.querySelector('#dig-pattern').value;
        const rel = container.querySelector('#dig-relation').value;
        const factor = parseInt(container.querySelector('#dig-factor').value);

        if (!pattern) {
            solutionText.innerHTML = "<span style='color:#ef4444;'>Ошибка: Задайте комбинацию (правило формирования нового числа).</span>";
            return;
        }

        let log = `<b style="color:#60a5fa;">Анализ задачи:</b><br>`;
        log += `Ищем числа на отрезке от ${Math.pow(10, K-1)} до ${Math.pow(10, K) - 1}.<br>`;
        log += `Запущен комбинаторный перебор с динамическим маппингом цифр...<br><br>`;

        // Парсим паттерн заранее для скорости O(1) внутри цикла
        // Превращаем "[4][1][2][3]" в массив инструкций
        const instructions = [];
        let i = 0;
        while (i < pattern.length) {
            if (pattern[i] === '[') {
                const end = pattern.indexOf(']', i);
                if (end === -1) {
                    solutionText.innerHTML = "<span style='color:#ef4444;'>Ошибка: Неверный синтаксис комбинации. Незакрытая скобка [.</span>";
                    return;
                }
                const idx = parseInt(pattern.substring(i + 1, end));
                if (idx > K || idx < 1) {
                    solutionText.innerHTML = `<span style='color:#ef4444;'>Ошибка: Маркер [${idx}] выходит за пределы количества цифр (${K}).</span>`;
                    return;
                }
                instructions.push({ type: 'pos', index: idx - 1 }); // 0-based index
                i = end + 1;
            } else {
                instructions.push({ type: 'raw', char: pattern[i] });
                i++;
            }
        }

        const startNum = Math.pow(10, K - 1);
        const endNum = Math.pow(10, K) - 1;
        const solutions = [];

        // Гипер-оптимизированный цикл
        for (let num = startNum; num <= endNum; num++) {
            const numStr = num.toString();
            let newNumStr = '';
            for (let ins of instructions) {
                newNumStr += ins.type === 'pos' ? numStr[ins.index] : ins.char;
            }
            
            const newNum = parseInt(newNumStr, 10);
            if (isNaN(newNum)) continue;

            if (rel === 'decrease' && newNum * factor === num) solutions.push(num);
            if (rel === 'increase' && num * factor === newNum) solutions.push(num);
        }

        if (solutions.length === 0) {
            log += `<strong style="color:#ef4444; font-size:16px;">Ответ: Таких чисел не существует (0 решений).</strong>`;
        } else {
            log += `<strong style="color:#10b981; font-size:18px;">Найдено решений: ${solutions.length}</strong><br><br>`;
            log += `<b style="color:#f59e0b;">Найденные числа:</b><br>`;
            solutions.forEach(ans => {
                const numStr = ans.toString();
                let newNumStr = '';
                for (let ins of instructions) newNumStr += ins.type === 'pos' ? numStr[ins.index] : ins.char;
                const newNum = parseInt(newNumStr, 10);
                
                log += `Исходное: <b>${ans}</b> ➜ Новое: <b>${newNum}</b> <i>(${rel === 'decrease' ? `${ans} / ${factor} = ${newNum}` : `${ans} * ${factor} = ${newNum}`})</i><br>`;
            });
        }
        
        solutionText.innerHTML = log;
    }

    // ==========================================
    // ЛОГИКА 2: АРИФМЕТИКА ОСТАТКОВ
    // ==========================================
    generateModuloText(container) {
        const A = container.querySelector('#mod-dividend').value.trim();
        const M = container.querySelector('#mod-divisor').value;
        const textBox = container.querySelector('#problem-text');
        
        textBox.innerHTML = `Найти остаток от деления числа <b>${A || 'A'}</b> на <b>${M || 'M'}</b>.<br><br><i>Математическая запись: ${A || 'A'} ≡ x (mod ${M || 'M'})</i>`;
    }

    solveModulo(container) {
        const solutionBox = container.querySelector('#solution-box');
        const solutionText = container.querySelector('#solution-text');
        solutionBox.style.display = 'block';

        const divStr = container.querySelector('#mod-dividend').value.trim();
        const modStr = container.querySelector('#mod-divisor').value.trim();

        if (!divStr || !/^\d+$/.test(divStr)) {
            solutionText.innerHTML = "<span style='color:#ef4444;'>Ошибка: Введите корректное целое число (Делимое).</span>";
            return;
        }
        if (!modStr || !/^\d+$/.test(modStr) || modStr === '0') {
            solutionText.innerHTML = "<span style='color:#ef4444;'>Ошибка: Введите корректный делитель (не 0).</span>";
            return;
        }

        try {
            // ИСПОЛЬЗУЕМ BIGINT ДЛЯ ОГРОМНЫХ ЧИСЕЛ
            const A = BigInt(divStr);
            const M = BigInt(modStr);
            const R = A % M;

            let log = `<b style="color:#60a5fa;">Вычисление по модулю:</b><br>`;
            log += `Длина исходного числа: ${divStr.length} цифр.<br>`;
            log += `Используется BigInt арифметика для обхода ограничений 64-битной памяти.<br><br>`;
            log += `<strong style="color:#10b981; font-size:18px;">Итоговый ответ: Остаток равен ${R.toString()}</strong><br><br>`;
            log += `<i>Проверка: ${divStr} = ${M.toString()} * ${(A/M).toString()} + <b>${R.toString()}</b></i>`;

            solutionText.innerHTML = log;
        } catch (e) {
            solutionText.innerHTML = `<span style='color:#ef4444;'>Системная ошибка при обработке BigInt.</span>`;
        }
    }
}