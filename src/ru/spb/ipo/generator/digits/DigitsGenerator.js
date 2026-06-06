import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class DigitsGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.mode = 'digits';
    }

    renderUI(container) {
        container.innerHTML = `
            <div style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto;">
                
                <div style="width: 280px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Теория чисел</h3>
                        
                        <div id="guide-digits" style="font-size: 13px; color: #cbd5e1; line-height: 1.5; display: block;">
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 1: Перестановка</b><br>Задайте правило изменения числа.</p>
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 2: Шаблон</b><br>Маркер [1] - это первая цифра, [2] - вторая. <i>Например: 5[1][2]</i>.</p>
                            <p><b style="color: white;">Шаг 3: Расчет</b><br>Задача сохранится в раздел решений.</p>
                        </div>

                        <div id="guide-modulo" style="font-size: 13px; color: #cbd5e1; line-height: 1.5; display: none;">
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 1: Остатки</b><br>Вычисление по модулю для сверхбольших чисел.</p>
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 2: Ввод</b><br>Введите делимое (любой длины) и делитель.</p>
                            <p><b style="color: white;">Шаг 3: Расчет</b><br>Алгоритм BigInt посчитает остаток и сохранит задачу.</p>
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
                                <input type="number" id="dig-count" value="4" min="2" max="6" style="width: 80px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                            </div>

                            <label style="display:block; margin-bottom: 10px; color: #60a5fa; font-weight: 600;">Правило формирования нового числа:</label>
                            
                            <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;" id="quick-buttons"></div>

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

                    <button id="generate-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Создать задачу</button>
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
        });

        const kInput = container.querySelector('#dig-count');
        kInput.addEventListener('change', () => this.renderQuickButtons(container));

        const patternInput = container.querySelector('#dig-pattern');
        container.querySelector('#clear-pattern-btn').onclick = () => { patternInput.value = ''; };

        container.querySelector('#generate-btn').onclick = () => {
            if (this.mode === 'digits') {
                this.generateAndSaveDigitsTask(container);
            } else {
                this.generateAndSaveModuloTask(container);
            }
        };
    }

    renderQuickButtons(container) {
        const rawK = parseInt(container.querySelector('#dig-count').value);
        const k = isNaN(rawK) ? 4 : Math.min(Math.max(rawK, 2), 6);
        container.querySelector('#dig-count').value = k;
        
        const btnsContainer = container.querySelector('#quick-buttons');
        const patternInput = container.querySelector('#dig-pattern');
        btnsContainer.innerHTML = '';

        for (let i = 1; i <= k; i++) {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.style.cssText = 'background: #334155; padding: 5px 10px; font-size: 13px; margin-right: 5px;';
            btn.textContent = `[${i}]`;
            btn.onclick = () => { patternInput.value += `[${i}]`; };
            btnsContainer.appendChild(btn);
        }

        for (let i = 0; i <= 9; i++) {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.style.cssText = 'background: #0f172a; padding: 5px 10px; font-size: 13px; color: #f59e0b;';
            btn.textContent = i;
            btn.onclick = () => { patternInput.value += i; };
            btnsContainer.appendChild(btn);
        }
    }

    generateAndSaveDigitsTask(container) {
        const K = parseInt(container.querySelector('#dig-count').value);
        const pattern = container.querySelector('#dig-pattern').value;
        const rel = container.querySelector('#dig-relation').value;
        const factor = parseInt(container.querySelector('#dig-factor').value);

        if (isNaN(K) || K < 2 || K > 6) {
            alert("Ошибка валидации: Для предотвращения зависания браузера длина числа (k) должна быть от 2 до 6.");
            return;
        }
        
        if (isNaN(factor) || factor < 2) {
            alert("Ошибка валидации: Множитель должен быть целым числом больше 1.");
            return;
        }

        if (!pattern) {
            alert("Ошибка валидации: Задайте комбинацию (правило формирования нового числа).");
            return;
        }

        let relText = rel === 'decrease' ? 'уменьшается' : 'увеличивается';
        let description = `Найти все целые положительные числа, состоящие из <b>${K}</b> цифр, такие что:<br>`;
        description += `Если составить новое число по правилу перестановки <b>«${pattern}»</b>, то оно <b>${relText} в ${factor} раз</b> по сравнению с исходным числом.`;

        const instructions = [];
        let i = 0;
        while (i < pattern.length) {
            if (pattern[i] === '[') {
                const end = pattern.indexOf(']', i);
                if (end === -1) {
                    alert("Ошибка валидации: Неверный синтаксис комбинации. Незакрытая скобка [.");
                    return;
                }
                const idx = parseInt(pattern.substring(i + 1, end));
                if (idx > K || idx < 1) {
                    alert(`Ошибка валидации: Маркер [${idx}] выходит за пределы количества цифр (${K}).`);
                    return;
                }
                instructions.push({ type: 'pos', index: idx - 1 });
                i = end + 1;
            } else {
                instructions.push({ type: 'raw', char: pattern[i] });
                i++;
            }
        }

        const startNum = Math.pow(10, K - 1);
        const endNum = Math.pow(10, K) - 1;
        const solutions = [];

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

        let answerText = "";
        if (solutions.length === 0) {
            answerText = "0";
        } else {
            answerText = solutions.join(', ');
        }
        
        this.saveTask({
            title: `Делимость: ${K}-значное число, правило ${pattern}`,
            descriptionHtml: description,
            solutionHtml: '',
            answerText: answerText,
            category: 'Делимости и остатки'
        });

        alert("Задача успешно сгенерирована и добавлена в раздел «Решение задач»!");
    }

    generateAndSaveModuloTask(container) {
        const divStr = container.querySelector('#mod-dividend').value.trim();
        const modStr = container.querySelector('#mod-divisor').value.trim();

        if (!divStr || !/^\d+$/.test(divStr)) {
            alert("Ошибка валидации: Введите корректное целое число (Делимое).");
            return;
        }
        
        if (divStr.length > 5000) {
            alert("Ошибка валидации: Длина делимого превышает допустимый предел для браузера (5000 символов).");
            return;
        }

        if (!modStr || !/^\d+$/.test(modStr) || modStr === '0') {
            alert("Ошибка валидации: Введите корректный делитель (не 0).");
            return;
        }
        
        if (modStr.length > 100) {
            alert("Ошибка валидации: Длина делителя слишком велика.");
            return;
        }

        let description = `Найти остаток от деления числа <b>${divStr}</b> на <b>${modStr}</b>.<br><br><i>Математическая запись: ${divStr} ≡ x (mod ${modStr})</i>`;

        try {
            const A = BigInt(divStr);
            const M = BigInt(modStr);
            const R = A % M;

            this.saveTask({
                title: `Остаток от деления: ${divStr.substring(0, 10)}${divStr.length > 10 ? '...' : ''} mod ${modStr}`,
                descriptionHtml: description,
                solutionHtml: '',
                answerText: R.toString(),
                category: 'Делимости и остатки'
            });
            
            alert("Задача успешно сгенерирована и добавлена в раздел «Решение задач»!");
        } catch (e) {
            alert("Системная ошибка при обработке BigInt.");
        }
    }
}