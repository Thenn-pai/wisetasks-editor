import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class WordGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.alphabet = [];
        this.conditions = [];
        this.allowRepeats = true;
        this.pageTitle = 'Слова';
        
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
                
                <div style="width: 280px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Слова</h3>
                        <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 1: Алфавит</b><br>Задайте набор букв для составления слов (вручную или пресетами).</p>
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 2: Параметры</b><br>Укажите длину слова <b>k</b> и разрешите или запретите повторения.</p>
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 3: Ограничения</b><br>Добавьте структурные правила (палиндромы, чередования).</p>
                            <p><b style="color: white;">Шаг 4: Расчет</b><br>Задача сохранится в раздел решений.</p>
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

                    <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Создать задачу</button>
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
            if (this.alphabet.length > 33) {
                 this.alphabet = this.alphabet.slice(0, 33);
                 alert("Алфавит ограничен 33 символами.");
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
            this.generateAndSaveTask(container);
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

    generateAndSaveTask(container) {
        const btn = container.querySelector('#generate-xml-btn');
        if (btn.disabled) return;

        const N = this.alphabet.length;
        const K = parseInt(container.querySelector('#word-k').value);

        if (isNaN(K) || K < 1) {
            alert("Ошибка валидации: Длина слова должна быть числом больше 0.");
            return;
        }

        if (N === 0) {
            alert("Ошибка валидации: Алфавит пуст! Добавьте буквы.");
            return;
        }

        if (!this.allowRepeats && K > N) {
            alert(`Ошибка валидации: Нельзя составить слово длины ${K} из ${N} уникальных букв без повторений.`);
            return;
        }

        let text = `Имеется алфавит из <b>${N}</b> букв: {${this.alphabet.join(', ')}}.<br>`;
        text += `Подсчитайте количество слов длины <b>${K}</b>, которые можно составить из этого алфавита, если буквы `;
        text += this.allowRepeats ? `<b>могут повторяться</b>` : `<b>не могут повторяться</b>`;
        
        if (this.conditions.length > 0) {
            text += `, при этом выполняются следующие условия: `;
            const condTexts = this.conditions.map(c => this.conditionTypes[c].toLowerCase());
            text += condTexts.join(', ') + '.';
        } else {
            text += `.`;
        }

        if (this.conditions.length === 0) {
            let baseWays = this.allowRepeats ? Math.pow(N, K) : (this.fact(N) / this.fact(N - K));
            this.saveTask({
                title: `Слова: k = ${K}`,
                descriptionHtml: text,
                solutionHtml: '',
                answerText: baseWays.toString(),
                category: this.pageTitle
            });
            alert("Задача успешно сгенерирована и добавлена в раздел «Решение задач»!");
            return;
        }

        let totalCombinations = this.allowRepeats ? Math.pow(N, K) : (this.fact(N) / this.fact(N - K));
        
        if (totalCombinations > 5000000) {
            alert("Ошибка валидации: Комбинаторный взрыв. Количество вариантов (более 5 млн) слишком велико для расчета алгоритмом поиска. Пожалуйста, уменьшите 'k' или размер алфавита.");
            return;
        }

        btn.textContent = 'Идет расчет...';
        btn.style.backgroundColor = '#f59e0b';
        btn.disabled = true;

        const worker = new Worker(new URL('./wordWorker.js', import.meta.url));

        worker.onmessage = (e) => {
            const exactCount = e.data;

            if (exactCount && exactCount.error) {
                alert("Ошибка в воркере: " + exactCount.error);
                btn.textContent = 'Создать задачу';
                btn.style.backgroundColor = '#10b981';
                btn.disabled = false;
                worker.terminate();
                return;
            }

            this.saveTask({
                title: `Слова: k = ${K}`,
                descriptionHtml: text,
                solutionHtml: '',
                answerText: exactCount.toString(),
                category: this.pageTitle
            });

            btn.textContent = 'Создать задачу';
            btn.style.backgroundColor = '#10b981';
            btn.disabled = false;

            alert("Задача успешно сгенерирована и добавлена в раздел «Решение задач»!");
            worker.terminate();
        };

        worker.onerror = (error) => {
            alert("Произошла ошибка при вычислениях в фоновом потоке.");
            btn.textContent = 'Создать задачу';
            btn.style.backgroundColor = '#10b981';
            btn.disabled = false;
            worker.terminate();
        };

        worker.postMessage({ K, alphabet: this.alphabet, allowRepeats: this.allowRepeats, conditions: this.conditions });
    }
}