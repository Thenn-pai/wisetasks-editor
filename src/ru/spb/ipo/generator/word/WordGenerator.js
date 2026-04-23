import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class WordGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.alphabet = [];
        this.conditions = [];
        this.allowRepeats = true;

        // База гласных для русского и английского
        this.vowels = new Set(['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'a', 'e', 'i', 'o', 'u', 'y']);
        
        this.conditionTypes = {
            'palindrome': 'Слово является палиндромом',
            'alternate': 'Гласные и согласные чередуются',
            'after_c_is_v': 'После каждой согласной идет гласная',
            'after_v_is_c': 'После каждой гласной идет согласная',
            'c_less_v': 'Согласных меньше чем гласных',
            'c_more_v': 'Согласных больше гласных',
            'c_eq_v': 'Согласных столько же сколько гласных'
        };
    }

    fact(n) {
        if (n <= 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    renderUI(container) {
        container.innerHTML = `
            <div style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto;">
                
                <div style="width: 300px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Слова</h3>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 1: Исходное множество</strong><br>
                            Задайте алфавит. Вы можете вписать буквы вручную или использовать готовые наборы (Русский / Английский).
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 2: Параметры слова</strong><br>
                            Укажите длину слова <b>k</b>. Выберите, могут ли буквы повторяться (Размещения с повторениями или без).
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 3: Ограничения</strong><br>
                            Добавьте структурные правила: палиндромы, чередование гласных и согласных и т.д.
                        </div>

                        <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 4: Расчет</strong><br>
                            Система сгенерирует текст и вычислит ответ.
                        </div>
                    </div>
                </div>

                <div style="flex: 1;">
                    <h2 style="margin-bottom: 20px; font-weight: 600;">Генератор: Слова над алфавитом</h2>
                    
                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(30, 41, 59, 0.4); border: 1px solid #334155; border-radius: 8px;">
                        <label style="display:block; margin-bottom: 10px; color: #60a5fa; font-weight: 600;">Исходное множество (Алфавит):</label>
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <input type="text" id="alphabet-input" placeholder="Введите буквы (например: абвг)" style="flex: 1; padding: 10px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                            <button id="add-letters-btn" class="btn" style="background: #3b82f6;">Добавить</button>
                        </div>
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <button id="preset-ru-btn" class="btn" style="background: #475569; font-size: 12px;">+ Весь Русский</button>
                            <button id="preset-en-btn" class="btn" style="background: #475569; font-size: 12px;">+ Весь Английский</button>
                            <button id="clear-alphabet-btn" class="btn" style="background: #ef4444; font-size: 12px;">Очистить</button>
                        </div>
                        <div style="padding: 10px; background: #0f172a; border: 1px solid #1e293b; border-radius: 6px; font-family: monospace; font-size: 16px; color: #f8fafc; min-height: 44px; word-break: break-all;">
                            { <span id="alphabet-display" style="color: #f59e0b;"></span> }
                        </div>
                        <div style="margin-top: 10px; font-size: 13px; color: #94a3b8;">
                            Размер алфавита (n): <strong id="alphabet-count" style="color: white;">0</strong>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid #3b82f6; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">Параметры и Ограничения:</label>
                        
                        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #334155;">
                            <div>
                                <span style="color: #cbd5e1; margin-right: 10px;">Длина слова (k):</span>
                                <input type="number" id="word-k" value="5" min="1" max="15" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                            </div>
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #f8fafc;">
                                <input type="checkbox" id="allow-repeats" checked style="width: 18px; height: 18px; accent-color: #3b82f6;">
                                Буквы могут повторяться
                            </label>
                        </div>

                        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 10px;">
                            <select id="cond-type" style="flex: 1; padding: 10px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit;">
                                ${Object.entries(this.conditionTypes).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
                            </select>
                            <button id="add-cond-btn" class="btn" style="background: #3b82f6;">+ Добавить условие</button>
                        </div>

                        <div id="conditions-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
                    </div>

                    <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Создать и Решить задачу</button>

                    <div id="solution-box" style="display: none; padding: 25px; background: #1e293b; border-top: 4px solid #10b981; border-radius: 8px; margin-bottom: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
                        <h4 style="margin: 0 0 15px 0; color: #10b981; font-size: 18px;">Сгенерированное условие:</h4>
                        <div id="problem-text" style="font-size: 16px; line-height: 1.6; color: #f8fafc; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 3px solid #3b82f6;"></div>

                        <h4 style="margin: 0 0 15px 0; color: #f59e0b; font-size: 18px;">Математический разбор:</h4>
                        <div id="solution-text" style="font-size: 14px; line-height: 1.8; color: #cbd5e1;"></div>
                    </div>
                </div>
            </div>
        `;

        this.attachEvents(container);
        this.updateAlphabetDisplay(container);
    }

    attachEvents(container) {
        const addLettersBtn = container.querySelector('#add-letters-btn');
        const input = container.querySelector('#alphabet-input');

        const processInput = () => {
            const val = input.value.toLowerCase().replace(/[^а-яa-zё]/g, '');
            for (let char of val) {
                if (!this.alphabet.includes(char)) this.alphabet.push(char);
            }
            input.value = '';
            this.alphabet.sort();
            this.updateAlphabetDisplay(container);
        };

        addLettersBtn.onclick = processInput;
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') processInput(); });

        container.querySelector('#preset-ru-btn').onclick = () => {
            const ru = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
            for (let char of ru) if (!this.alphabet.includes(char)) this.alphabet.push(char);
            this.alphabet.sort();
            this.updateAlphabetDisplay(container);
        };

        container.querySelector('#preset-en-btn').onclick = () => {
            const en = "abcdefghijklmnopqrstuvwxyz";
            for (let char of en) if (!this.alphabet.includes(char)) this.alphabet.push(char);
            this.alphabet.sort();
            this.updateAlphabetDisplay(container);
        };

        container.querySelector('#clear-alphabet-btn').onclick = () => {
            this.alphabet = [];
            this.updateAlphabetDisplay(container);
        };

        container.querySelector('#allow-repeats').onchange = (e) => {
            this.allowRepeats = e.target.checked;
        };

        container.querySelector('#add-cond-btn').onclick = () => {
            const type = container.querySelector('#cond-type').value;
            if (!this.conditions.includes(type)) {
                this.conditions.push(type);
                this.renderConditions(container);
            }
        };

        container.querySelector('#generate-xml-btn').onclick = () => {
            this.generateProblemText(container);
            this.solveMath(container);
        };
    }

    updateAlphabetDisplay(container) {
        container.querySelector('#alphabet-display').textContent = this.alphabet.join(', ');
        container.querySelector('#alphabet-count').textContent = this.alphabet.length;
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
                <span style="color: #ef4444; cursor: pointer; font-weight: bold; padding: 0 5px;">✕</span>
            `;
            tag.querySelector('span:last-child').onclick = () => {
                this.conditions.splice(index, 1);
                this.renderConditions(container);
            };
            list.appendChild(tag);
        });
    }

    generateProblemText(container) {
        const k = container.querySelector('#word-k').value;
        const textBox = container.querySelector('#problem-text');
        
        let text = `Имеется алфавит из <b>${this.alphabet.length}</b> букв: {${this.alphabet.join(', ')}}.<br>`;
        text += `Подсчитайте количество слов длины <b>${k}</b>, которые можно составить из этого алфавита, если буквы `;
        text += this.allowRepeats ? `<b>могут повторяться</b>` : `<b>не могут повторяться</b>`;
        
        if (this.conditions.length > 0) {
            text += `, при этом выполняются следующие условия: `;
            const condTexts = this.conditions.map(c => this.conditionTypes[c].toLowerCase());
            text += condTexts.join(', ') + '.';
        } else {
            text += `.`;
        }
        
        textBox.innerHTML = text;
    }

    isVowel(char) {
        return this.vowels.has(char);
    }

    solveMath(container) {
        const solutionBox = container.querySelector('#solution-box');
        const solutionText = container.querySelector('#solution-text');
        solutionBox.style.display = 'block';

        const N = this.alphabet.length;
        const K = parseInt(container.querySelector('#word-k').value);

        if (N === 0) {
            solutionText.innerHTML = "<span style='color:#ef4444;'>Ошибка: Алфавит пуст! Добавьте буквы.</span>";
            return;
        }

        if (!this.allowRepeats && K > N) {
            solutionText.innerHTML = `<span style='color:#ef4444;'>Ошибка: Нельзя составить слово длины ${K} из ${N} уникальных букв без повторений.</span>`;
            return;
        }

        let baseWays = this.allowRepeats ? Math.pow(N, K) : (this.fact(N) / this.fact(N - K));
        let log = `<b style="color:#60a5fa;">Базовый расчет (без ограничений):</b><br>`;
        log += `Размер алфавита (n) = ${N}<br>Длина слова (k) = ${K}<br>`;
        
        if (this.allowRepeats) {
            log += `Размещения с повторениями: n^k = ${N}^${K} = <b>${baseWays}</b> слов.<br><br>`;
        } else {
            log += `Размещения без повторений: A(n, k) = n! / (n-k)! = <b>${baseWays}</b> слов.<br><br>`;
        }

        if (this.conditions.length === 0) {
            log += `<strong style="color:#10b981; font-size:18px;">Ответ: ${baseWays} слов.</strong>`;
            solutionText.innerHTML = log;
            return;
        }

        log += `<b style="color:#f59e0b;">Применение ограничений (Симуляция дерева решений):</b><br>`;
        log += `Алгоритм перебирает структуру слова с учетом правил: <i>${this.conditions.map(c => this.conditionTypes[c]).join(' + ')}</i>.<br><br>`;

        // Запуск глубокого комбинаторного перебора с отсечением (Pruning DFS)
        const exactCount = this.calculateWords(K);

        if (exactCount === 0) {
             log += `<strong style="color:#ef4444; font-size:16px;">Внимание: Комбинация заданных условий невозможна!</strong><br>Таких слов составить нельзя.`;
        } else {
             log += `<strong style="color:#10b981; font-size:18px;">Итоговый точный ответ: ${exactCount} слов.</strong>`;
        }
        
        solutionText.innerHTML = log;
    }

    calculateWords(K) {
        let count = 0;
        const n = this.alphabet.length;
        const used = new Array(n).fill(false);
        const currentWord = [];

        // Оптимизированный рекурсивный обход (DFS)
        const dfs = (depth) => {
            if (depth === K) {
                if (this.checkFinalConditions(currentWord)) {
                    count++;
                }
                return;
            }

            for (let i = 0; i < n; i++) {
                if (!this.allowRepeats && used[i]) continue;
                
                const char = this.alphabet[i];
                currentWord.push(char);
                used[i] = true;

                // Быстрое отсечение ветвей (Pruning)
                if (this.checkPrefixConditions(currentWord)) {
                    dfs(depth + 1);
                }

                currentWord.pop();
                used[i] = false;
            }
        };

        dfs(0);
        return count;
    }

    // Проверка префикса (чтобы не строить заведомо неверные слова до конца)
    checkPrefixConditions(word) {
        const len = word.length;
        if (len < 2) return true;

        const prev = word[len - 2];
        const curr = word[len - 1];
        const prevIsV = this.isVowel(prev);
        const currIsV = this.isVowel(curr);

        if (this.conditions.includes('alternate')) {
            if (prevIsV === currIsV) return false;
        }
        if (this.conditions.includes('after_c_is_v')) {
            if (!prevIsV && !currIsV) return false;
        }
        if (this.conditions.includes('after_v_is_c')) {
            if (prevIsV && currIsV) return false;
        }
        return true;
    }

    // Финальная проверка всего слова на сложные условия
    checkFinalConditions(word) {
        if (this.conditions.includes('palindrome')) {
            let left = 0;
            let right = word.length - 1;
            while (left < right) {
                if (word[left] !== word[right]) return false;
                left++; right--;
            }
        }

        const counts = this.conditions.some(c => c.startsWith('c_')) ? this.countVowelsConsonants(word) : null;
        
        if (this.conditions.includes('c_less_v') && counts.c >= counts.v) return false;
        if (this.conditions.includes('c_more_v') && counts.c <= counts.v) return false;
        if (this.conditions.includes('c_eq_v') && counts.c !== counts.v) return false;

        return true;
    }

    countVowelsConsonants(word) {
        let v = 0; let c = 0;
        for (let char of word) {
            if (this.isVowel(char)) v++; else c++;
        }
        return { v, c };
    }
}