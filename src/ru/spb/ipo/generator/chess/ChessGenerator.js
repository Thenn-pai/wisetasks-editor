import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';
import { MathUtils } from '../mathUtils.js';

export class ChessGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.pageTitle = 'Шахматы';
        this.pieces = {
            'any': { name: 'Произвольная фигура', symbol: '♟', color: '#cbd5e1' },
            'rook': { name: 'Ладья', symbol: '♜', color: '#60a5fa' },
            'bishop': { name: 'Слон', symbol: '♝', color: '#a78bfa' },
            'knight': { name: 'Конь', symbol: '♞', color: '#f472b6' },
            'queen': { name: 'Ферзь', symbol: '♛', color: '#f59e0b' },
            'king': { name: 'Король', symbol: '♚', color: '#10b981' }
        };
    }

    renderUI(container) {
        container.innerHTML = `
            <div style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto;">
                
                <div style="width: 280px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Шахматы</h3>
                        <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 1: Доска</b><br>Укажите ширину (N) и высоту (M).</p>
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 2: Фигуры</b><br>Тип фигуры и их количество (k).</p>
                            <p style="margin-bottom: 10px;"><b style="color: white;">Шаг 3: Ограничения</b><br>Галочка применяет правила шахмат (фигуры не бьют друг друга).</p>
                            <p><b style="color: white;">Шаг 4: Расчет</b><br>Задача сохранится в раздел решений.</p>
                        </div>
                    </div>
                </div>

                <div style="flex: 1;">
                    <h2 style="margin-bottom: 20px; font-weight: 600;">Генератор: Шахматная комбинаторика</h2>
                    
                    <div style="display: flex; gap: 20px;">
                        <div style="flex: 1;">
                            <div style="margin-bottom: 20px; padding: 20px; background: rgba(30, 41, 59, 0.4); border: 1px solid #334155; border-radius: 8px;">
                                <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">Параметры доски:</label>
                                <div style="display: flex; gap: 15px; align-items: center;">
                                    <span style="color: #cbd5e1;">Горизонталь (N):</span>
                                    <input type="number" id="board-n" value="8" min="2" max="8" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                    <span style="color: #cbd5e1;">Вертикаль (M):</span>
                                    <input type="number" id="board-m" value="8" min="2" max="8" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                </div>
                            </div>

                            <div style="margin-bottom: 20px; padding: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid #3b82f6; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                                <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">Условия расстановки:</label>
                                
                                <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                                    <span style="color: #cbd5e1;">Ставим:</span>
                                    <input type="number" id="piece-k" value="8" min="1" max="64" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                    <select id="piece-type" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                        ${Object.entries(this.pieces).map(([k, v]) => `<option value="${k}">${v.name} (${v.symbol})</option>`).join('')}
                                    </select>
                                </div>

                                <div style="padding-top: 15px; border-top: 1px solid #334155;">
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #f8fafc; font-size: 15px;">
                                        <input type="checkbox" id="cond-attack" checked style="width: 18px; height: 18px; accent-color: #3b82f6;">
                                        Фигуры <b>НЕ</b> должны бить друг друга
                                    </label>
                                </div>
                            </div>
                            
                            <button id="generate-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Создать задачу</button>
                        </div>

                        <div style="width: 250px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center;">
                            <div style="margin-bottom: 10px; color: #94a3b8; font-size: 14px;">Предпросмотр поля:</div>
                            <div id="chess-board" style="border: 2px solid #334155; border-radius: 4px; overflow: hidden; display: grid;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachEvents(container);
        this.renderBoard(container);
    }

    attachEvents(container) {
        const inputN = container.querySelector('#board-n');
        const inputM = container.querySelector('#board-m');
        
        inputN.addEventListener('input', () => this.renderBoard(container));
        inputM.addEventListener('input', () => this.renderBoard(container));

        container.querySelector('#generate-btn').onclick = () => {
            this.generateAndSaveTask(container);
        };
    }

    renderBoard(container) {
        const N = Math.min(Math.max(parseInt(container.querySelector('#board-n').value) || 8, 2), 8);
        const M = Math.min(Math.max(parseInt(container.querySelector('#board-m').value) || 8, 2), 8);
        const board = container.querySelector('#chess-board');
        
        board.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
        board.innerHTML = '';
        
        const cellSize = Math.floor(240 / Math.max(N, M));

        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                const cell = document.createElement('div');
                cell.style.width = `${cellSize}px`;
                cell.style.height = `${cellSize}px`;
                const isBlack = (i + j) % 2 !== 0;
                cell.style.backgroundColor = isBlack ? '#475569' : '#cbd5e1';
                board.appendChild(cell);
            }
        }
    }

    generateAndSaveTask(container) {
        const btn = container.querySelector('#generate-btn');
        if (btn.disabled) return;

        const N = parseInt(container.querySelector('#board-n').value);
        const M = parseInt(container.querySelector('#board-m').value);
        const K = parseInt(container.querySelector('#piece-k').value);
        const pType = container.querySelector('#piece-type').value;
        const noAttack = container.querySelector('#cond-attack').checked;

        if (isNaN(N) || isNaN(M) || isNaN(K)) {
            alert("Ошибка валидации: Поля не могут быть пустыми.");
            return;
        }
        
        if (N < 2 || M < 2 || K < 1) {
            alert("Ошибка валидации: Доска должна быть минимум 2x2. Количество фигур должно быть больше 0.");
            return;
        }

        if (N > 8 || M > 8) {
            alert("Ошибка валидации: Для предотвращения блокировки браузера максимальный размер доски ограничен 8x8.");
            return;
        }

        const totalCells = N * M;
        if (K > totalCells) {
            alert(`Ошибка валидации: Нельзя поставить ${K} фигур на доску из ${totalCells} клеток.`);
            return;
        }

        let pName = this.pieces[pType].name;
        if (pType === 'rook') pName = 'ладей';
        else if (pType === 'bishop') pName = 'слонов';
        else if (pType === 'knight') pName = 'коней';
        else if (pType === 'queen') pName = 'ферзей';
        else if (pType === 'king') pName = 'королей';
        else pName = 'одинаковых фигур';

        const title = `Шахматы: ${pName}, ${N}x${M}, k=${K}`;
        
        let description = `Имеется шахматная доска размером <b>${N}x${M}</b>. На ней необходимо расставить <b>${K}</b> ${pName}.<br>`;
        description += `Подсчитайте количество способов расстановки, при условии, что в одной клетке может стоять не более одной фигуры`;
        
        if (noAttack && pType !== 'any') {
            description += `, и фигуры <b>не должны бить друг друга</b> по классическим правилам шахмат.`;
        } else {
            description += `. Дополнительных ограничений нет.`;
        }

        if (!noAttack || pType === 'any') {
            const ways = MathUtils.combinations(totalCells, K);
            
            this.saveTask({
                title: title,
                descriptionHtml: description,
                solutionHtml: '',
                answerText: ways.toString(),
                category: this.pageTitle
            });
            alert("Задача успешно сгенерирована и добавлена в раздел «Решение задач»!");
            return;
        }

        if (pType === 'rook' && noAttack) {
            if (K > N || K > M) {
                this.saveTask({
                    title: title,
                    descriptionHtml: description,
                    solutionHtml: '',
                    answerText: "0",
                    category: this.pageTitle
                });
                alert("Задача успешно сгенерирована и добавлена в раздел «Решение задач»!");
                return;
            }

            const chooseCols = MathUtils.combinations(N, K);
            const chooseRows = MathUtils.combinations(M, K);
            const permutations = MathUtils.fact(K);
            
            const totalWays = chooseCols * chooseRows * permutations;
            
            this.saveTask({
                title: title,
                descriptionHtml: description,
                solutionHtml: '',
                answerText: totalWays.toString(),
                category: this.pageTitle
            });
            alert("Задача успешно сгенерирована и добавлена в раздел «Решение задач»!");
            return;
        }

        btn.textContent = 'Идет расчет...';
        btn.style.backgroundColor = '#f59e0b';
        btn.disabled = true;

        const worker = new Worker(new URL('./chessWorker.js', import.meta.url));

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
                title: title,
                descriptionHtml: description,
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

        worker.postMessage({ N, M, K, pType });
    }
}