import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class SolverGenerator extends BaseGeneratorUI {
    constructor() {
        super();
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

    permutations(n, k) {
        if (k < 0 || k > n) return 0;
        return Math.round(this.fact(n) / this.fact(n - k));
    }

    evaluateUserAnswer(input) {
        try {
            let expr = input.replace(/\s+/g, '').toLowerCase();
            
            expr = expr.replace(/[cс]\((\d+),(\d+)\)/g, (match, n, k) => {
                return this.combinations(parseInt(n, 10), parseInt(k, 10)).toString();
            });

            expr = expr.replace(/[aа]\((\d+),(\d+)\)/g, (match, n, k) => {
                return this.permutations(parseInt(n, 10), parseInt(k, 10)).toString();
            });

            const tokens = [];
            let numberBuffer = [];
            for (let i = 0; i < expr.length; i++) {
                const char = expr[i];
                if (/\d/.test(char) || char === '.') {
                    numberBuffer.push(char);
                } else {
                    if (numberBuffer.length > 0) {
                        tokens.push(numberBuffer.join(''));
                        numberBuffer = [];
                    }
                    if ('+-*/^!()'.includes(char)) {
                        tokens.push(char);
                    }
                }
            }
            if (numberBuffer.length > 0) tokens.push(numberBuffer.join(''));

            const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3, '!': 4 };
            const outputQueue = [];
            const operatorStack = [];

            for (const token of tokens) {
                if (!isNaN(parseFloat(token))) {
                    outputQueue.push(parseFloat(token));
                } else if (token === '!') {
                    outputQueue.push(token);
                } else if (token === '(') {
                    operatorStack.push(token);
                } else if (token === ')') {
                    while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                        outputQueue.push(operatorStack.pop());
                    }
                    if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === '(') {
                        operatorStack.pop();
                    }
                } else if ('+-*/^'.includes(token)) {
                    while (
                        operatorStack.length > 0 &&
                        operatorStack[operatorStack.length - 1] !== '(' &&
                        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
                    ) {
                        outputQueue.push(operatorStack.pop());
                    }
                    operatorStack.push(token);
                }
            }

            while (operatorStack.length > 0) {
                outputQueue.push(operatorStack.pop());
            }

            const evalStack = [];
            for (const token of outputQueue) {
                if (!isNaN(parseFloat(token))) {
                    evalStack.push(parseFloat(token));
                } else if (token === '!') {
                    if (evalStack.length < 1) return null;
                    const a = evalStack.pop();
                    evalStack.push(this.fact(a));
                } else {
                    if (evalStack.length < 2) return null;
                    const b = evalStack.pop();
                    const a = evalStack.pop();
                    
                    switch (token) {
                        case '+': evalStack.push(a + b); break;
                        case '-': evalStack.push(a - b); break;
                        case '*': evalStack.push(a * b); break;
                        case '/': evalStack.push(a / b); break;
                        case '^': evalStack.push(Math.pow(a, b)); break;
                    }
                }
            }

            return evalStack.length === 1 ? evalStack[0] : null;

        } catch (e) {
            return null;
        }
    }

    renderUI(container) {
        container.innerHTML = `
            <div style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto;">
                
                <div style="width: 320px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Раздел: Тренажер</h3>
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 1: Выберите задачу</strong><br>
                            В списке показываются задачи, сгенерированные в других разделах.
                        </div>
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 2: Введите ответ</strong><br>
                            Можно вводить итоговое число или формулы: <b>C(n,k)</b>, <b>A(n,k)</b>, факториалы <b>n!</b> и степени <b>^</b>.<br>
                            <i style="color:#f59e0b;">Пример: C(9,2) * 3! + A(5,2)</i>
                        </div>
                        <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 3: Проверка</strong><br>
                            Нажмите "Проверить", чтобы узнать результат (Правильно / Неправильно).
                        </div>
                    </div>
                </div>

                <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="font-weight: 600; margin: 0;">Решение задач</h2>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span id="task-count" style="color:#94a3b8; font-size: 14px; margin-right: 10px;">Задач: 0</span>
                            <button id="refresh-tasks-btn" class="btn" style="background:#3b82f6; padding: 8px 15px; font-size: 13px;">Обновить список</button>
                            <button id="clear-tasks-btn" class="btn" style="background:#ef4444; padding: 8px 15px; font-size: 13px;">Очистить все</button>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(30, 41, 59, 0.4); border: 1px solid #334155; border-radius: 8px;">
                        <select id="task-select" style="width: 100%; padding: 12px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit; font-size: 15px; outline: none; cursor: pointer;"></select>
                    </div>

                    <div id="task-preview" style="margin-bottom: 20px; padding: 25px; background: rgba(15, 23, 42, 0.6); border: 1px solid #3b82f6; border-radius: 8px; min-height: 120px; color: #f8fafc; font-size: 16px; line-height: 1.6; box-shadow: 0 4px 15px rgba(0,0,0,0.2);"></div>

                    <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 15px;">
                        <input id="task-answer" type="text" placeholder="Введите выражение (используйте кнопки ниже или клавиатуру)" style="flex: 1; padding: 15px; background: #0f172a; color: white; border: 1px solid #475569; border-radius: 6px; font-family: inherit; font-size: 16px; outline: none;">
                        <button id="check-answer-btn" class="btn" style="background:#10b981; padding: 15px 30px; font-size: 16px; font-weight: bold;">Проверить</button>
                        <button id="show-answer-btn" class="btn" style="background:#f59e0b; padding: 15px 30px; font-size: 16px; font-weight: bold; display: none;">Сдаться</button>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; max-width: 500px; margin-bottom: 25px;">
                        <button class="btn calc-btn" data-val="1" style="background:#1e293b; padding:10px;">1</button>
                        <button class="btn calc-btn" data-val="2" style="background:#1e293b; padding:10px;">2</button>
                        <button class="btn calc-btn" data-val="3" style="background:#1e293b; padding:10px;">3</button>
                        <button class="btn calc-btn" data-val="+" style="background:#334155; padding:10px;">+</button>
                        <button class="btn calc-btn" data-val="-" style="background:#334155; padding:10px;">-</button>
                        <button class="btn calc-btn" data-val="C(" style="background:#475569; padding:10px;">C</button>

                        <button class="btn calc-btn" data-val="4" style="background:#1e293b; padding:10px;">4</button>
                        <button class="btn calc-btn" data-val="5" style="background:#1e293b; padding:10px;">5</button>
                        <button class="btn calc-btn" data-val="6" style="background:#1e293b; padding:10px;">6</button>
                        <button class="btn calc-btn" data-val="*" style="background:#334155; padding:10px;">*</button>
                        <button class="btn calc-btn" data-val="/" style="background:#334155; padding:10px;">/</button>
                        <button class="btn calc-btn" data-val="A(" style="background:#475569; padding:10px;">A</button>

                        <button class="btn calc-btn" data-val="7" style="background:#1e293b; padding:10px;">7</button>
                        <button class="btn calc-btn" data-val="8" style="background:#1e293b; padding:10px;">8</button>
                        <button class="btn calc-btn" data-val="9" style="background:#1e293b; padding:10px;">9</button>
                        <button class="btn calc-btn" data-val="!" style="background:#334155; padding:10px;">!</button>
                        <button class="btn calc-btn" data-val="^" style="background:#334155; padding:10px;">^</button>
                        <button class="btn calc-btn" data-val="," style="background:#475569; padding:10px;">,</button>

                        <button class="btn calc-btn" data-val="(" style="background:#1e293b; padding:10px;">(</button>
                        <button class="btn calc-btn" data-val="0" style="background:#1e293b; padding:10px;">0</button>
                        <button class="btn calc-btn" data-val=")" style="background:#1e293b; padding:10px;">)</button>
                        <button class="btn calc-btn" data-val="BS" style="background:#ef4444; padding:10px;">BS</button>
                        <button class="btn calc-btn" data-val="CLEAR" style="background:#ef4444; padding:10px; grid-column: span 2;">Очистить</button>
                    </div>

                    <div id="check-result" style="margin-bottom: 20px; font-size: 16px; font-weight: bold;"></div>
                </div>
            </div>
        `;

        this.attachEvents(container);
        this.refreshTaskList(container);
    }

    attachEvents(container) {
        container.querySelector('#refresh-tasks-btn').onclick = () => this.refreshTaskList(container);
        
        container.querySelector('#clear-tasks-btn').onclick = () => {
            if (window.taskStore) window.taskStore.clear();
            this.refreshTaskList(container);
        };

        container.querySelector('#task-select').onchange = () => this.renderSelectedTask(container);
        container.querySelector('#check-answer-btn').onclick = () => this.checkAnswer(container);
        container.querySelector('#show-answer-btn').onclick = () => this.showAnswer(container);

        const answerInput = container.querySelector('#task-answer');
        const calcBtns = container.querySelectorAll('.calc-btn');
        calcBtns.forEach(btn => {
            btn.onclick = () => {
                const val = btn.getAttribute('data-val');
                if (val === 'BS') {
                    answerInput.value = answerInput.value.slice(0, -1);
                } else if (val === 'CLEAR') {
                    answerInput.value = '';
                } else {
                    answerInput.value += val;
                }
                answerInput.focus();
            };
        });

        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer(container);
        });
    }

    refreshTaskList(container) {
        const select = container.querySelector('#task-select');
        const countLabel = container.querySelector('#task-count');
        const showBtn = container.querySelector('#show-answer-btn');
        const tasks = window.taskStore ? window.taskStore.getTasks() : [];

        select.innerHTML = '';
        showBtn.style.display = 'none';

        if (tasks.length === 0) {
            select.innerHTML = '<option value="">Список задач пуст</option>';
            countLabel.textContent = 'Задач: 0';
            container.querySelector('#task-preview').innerHTML = '<em style="color: #94a3b8;">Сначала сгенерируйте задачу в любом разделе.</em>';
            container.querySelector('#check-result').innerHTML = '';
            container.querySelector('#task-answer').disabled = true;
            container.querySelector('#check-answer-btn').disabled = true;
            return;
        }

        container.querySelector('#task-answer').disabled = false;
        container.querySelector('#check-answer-btn').disabled = false;

        tasks.forEach((task) => {
            const option = document.createElement('option');
            option.value = task.id;
            option.textContent = `${task.category} | ${task.title}`;
            select.appendChild(option);
        });

        countLabel.textContent = `Задач: ${tasks.length}`;
        select.selectedIndex = tasks.length - 1; 
        this.renderSelectedTask(container);
    }

    renderSelectedTask(container) {
        const select = container.querySelector('#task-select');
        const preview = container.querySelector('#task-preview');
        const answerInput = container.querySelector('#task-answer');
        const showBtn = container.querySelector('#show-answer-btn');
        const task = window.taskStore ? window.taskStore.getTaskById(select.value) : null;

        answerInput.value = '';
        container.querySelector('#check-result').innerHTML = '';
        showBtn.style.display = 'none';

        if (!task) {
            preview.innerHTML = '<em style="color: #94a3b8;">Выберите задачу из списка.</em>';
            return;
        }

        preview.innerHTML = `
            <div>${task.descriptionHtml}</div>
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #334155; color: #94a3b8; font-size: 13px; display: flex; justify-content: space-between;">
                <span><strong>Категория:</strong> ${task.category}</span>
                <span><strong>Создано:</strong> ${new Date(task.createdAt).toLocaleString()}</span>
            </div>
        `;
    }

    normalizeAnswer(value) {
        return value.toString().trim().toLowerCase().replace(/\s+/g, '').replace(/[^0-9a-zа-яё=<>+-]/g, '');
    }

    showAnswer(container) {
        const select = container.querySelector('#task-select');
        const resultBox = container.querySelector('#check-result');
        const showBtn = container.querySelector('#show-answer-btn');
        
        const task = window.taskStore ? window.taskStore.getTaskById(select.value) : null;
        if (!task) return;

        resultBox.innerHTML = `<div style="color:#ef4444; padding: 15px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 6px;">Ответ на задачу: <strong>${task.answerText}</strong></div>`;
        showBtn.style.display = 'none';
    }

    checkAnswer(container) {
        const select = container.querySelector('#task-select');
        const answerInput = container.querySelector('#task-answer');
        const resultBox = container.querySelector('#check-result');
        const showBtn = container.querySelector('#show-answer-btn');

        const task = window.taskStore ? window.taskStore.getTaskById(select.value) : null;
        if (!task) {
            resultBox.innerHTML = '<div style="color:#ef4444; padding: 10px 15px; background: rgba(239, 68, 68, 0.1); border-radius: 6px;">Выберите задачу.</div>';
            return;
        }

        const userAnswer = answerInput.value.trim();
        if (!userAnswer) {
            resultBox.innerHTML = '<div style="color:#f59e0b; padding: 10px 15px; background: rgba(245, 158, 11, 0.1); border-radius: 6px;">Введите ответ перед проверкой.</div>';
            return;
        }

        const expectedText = task.answerText.toString().trim();
        const expectedNorm = this.normalizeAnswer(expectedText);
        const actualNorm = this.normalizeAnswer(userAnswer);
        
        let isMatch = false;

        if (expectedNorm === actualNorm || (expectedNorm.match(/\d+/)?.[0] && actualNorm.match(/\d+/)?.[0] && expectedNorm.match(/\d+/)[0] === actualNorm.match(/\d+/)[0])) {
            isMatch = true;
        } else {
            const userValue = this.evaluateUserAnswer(userAnswer);
            const expectedValue = parseFloat(expectedText);

            if (userValue !== null && !isNaN(expectedValue) && Math.round(userValue) === Math.round(expectedValue)) {
                isMatch = true;
            }
        }

        if (isMatch) {
            resultBox.innerHTML = '<div style="color:#10b981; padding: 15px; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 6px;">✅ Правильно! Ваш ответ абсолютно верен.</div>';
            showBtn.style.display = 'none';
        } else {
            resultBox.innerHTML = `<div style="color:#ef4444; padding: 15px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 6px;">❌ Неправильно. Попробуйте еще раз.</div>`;
            showBtn.style.display = 'block';
        }
    }
}