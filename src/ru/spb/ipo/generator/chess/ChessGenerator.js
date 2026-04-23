import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class ChessGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.pieces = {
            'rook': { name: 'Ладья', symbol: '♜' },
            'any': { name: 'Произвольная фигура', symbol: '♟' }
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
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Шахматы</h3>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 1: Размер доски</strong><br>
                            Классическая доска имеет размер 8x8, но в комбинаторике часто используют нестаطартные доски (например, N x M).
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 2: Фигуры</strong><br>
                            Укажите количество фигур (k), которые нужно расставить на доске.
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 3: Ограничения</strong><br>
                            <b>Мирное сосуществование:</b> Фигуры просто стоят на клетках (не более 1 на клетку).<br>
                            <b>Не бьют друг друга (Ладьи):</b> Классическая задача, где ладьи не должны находиться на одной вертикали или горизонтали.
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
                                    <input type="number" id="board-n" value="8" min="2" max="12" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                    <span style="color: #cbd5e1;">Вертикаль (M):</span>
                                    <input type="number" id="board-m" value="8" min="2" max="12" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                </div>
                            </div>

                            <div style="margin-bottom: 20px; padding: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid #3b82f6; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                                <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">Условия расстановки:</label>
                                
                                <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                                    <span style="color: #cbd5e1;">Ставим:</span>
                                    <input type="number" id="piece-k" value="5" min="1" max="64" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                    <select id="piece-type" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                        <option value="rook">Ладей (♜)</option>
                                        <option value="any">Фигур (♟)</option>
                                    </select>
                                </div>

                                <div style="padding-top: 15px; border-top: 1px solid #334155;">
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #f8fafc; font-size: 15px;">
                                        <input type="checkbox" id="cond-attack" checked style="width: 18px; height: 18px; accent-color: #3b82f6;">
                                        Фигуры <b>НЕ</b> должны бить друг друга
                                    </label>
                                </div>
                            </div>
                            
                            <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Решить задачу</button>
                        </div>

                        <div style="width: 250px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center;">
                            <div style="margin-bottom: 10px; color: #94a3b8; font-size: 14px;">Предпросмотр поля:</div>
                            <div id="chess-board" style="border: 2px solid #334155; border-radius: 4px; overflow: hidden; display: grid;"></div>
                        </div>
                    </div>

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
        this.renderBoard(container);
    }

    attachEvents(container) {
        const inputN = container.querySelector('#board-n');
        const inputM = container.querySelector('#board-m');
        
        // Динамическая перерисовка доски
        inputN.addEventListener('input', () => this.renderBoard(container));
        inputM.addEventListener('input', () => this.renderBoard(container));

        container.querySelector('#generate-xml-btn').onclick = () => {
            this.generateProblemText(container);
            this.solveMath(container);
        };
    }

    renderBoard(container) {
        const N = Math.min(Math.max(parseInt(container.querySelector('#board-n').value) || 8, 2), 12);
        const M = Math.min(Math.max(parseInt(container.querySelector('#board-m').value) || 8, 2), 12);
        const board = container.querySelector('#chess-board');
        
        board.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
        board.innerHTML = '';
        
        const cellSize = Math.floor(240 / Math.max(N, M)); // Автомасштаб клеток

        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                const cell = document.createElement('div');
                cell.style.width = `${cellSize}px`;
                cell.style.height = `${cellSize}px`;
                // Классическая шахматная раскраска
                const isBlack = (i + j) % 2 !== 0;
                cell.style.backgroundColor = isBlack ? '#475569' : '#cbd5e1';
                board.appendChild(cell);
            }
        }
    }

    generateProblemText(container) {
        const N = container.querySelector('#board-n').value;
        const M = container.querySelector('#board-m').value;
        const K = container.querySelector('#piece-k').value;
        const pType = container.querySelector('#piece-type').value;
        const noAttack = container.querySelector('#cond-attack').checked;
        const textBox = container.querySelector('#problem-text');
        
        let pName = pType === 'rook' ? 'ладей' : 'одинаковых фигур';

        let text = `Имеется шахматная доска размером <b>${N}x${M}</b>. На ней необходимо расставить <b>${K}</b> ${pName}.<br>`;
        text += `Подсчитайте количество способов расстановки, при условии, что в одной клетке может стоять не более одной фигуры`;
        
        if (noAttack) {
            text += `, и фигуры <b>не должны бить друг друга</b> (не могут находиться на одной горизонтали или вертикали).`;
        } else {
            text += `. Дополнительных ограничений нет.`;
        }
        
        textBox.innerHTML = text;
    }

    solveMath(container) {
        const solutionBox = container.querySelector('#solution-box');
        const solutionText = container.querySelector('#solution-text');
        solutionBox.style.display = 'block';

        const N = parseInt(container.querySelector('#board-n').value);
        const M = parseInt(container.querySelector('#board-m').value);
        const K = parseInt(container.querySelector('#piece-k').value);
        const pType = container.querySelector('#piece-type').value;
        const noAttack = container.querySelector('#cond-attack').checked;

        const totalCells = N * M;

        if (K > totalCells) {
            solutionText.innerHTML = `<span style='color:#ef4444;'>Ошибка: Нельзя поставить ${K} фигур на доску из ${totalCells} клеток.</span>`;
            return;
        }

        let log = `<b style="color:#60a5fa;">Анализ доски:</b><br>`;
        log += `Размер: ${N} (горизонталь) × ${M} (вертикаль) = ${totalCells} клеток.<br>`;
        log += `Количество фигур (k) = ${K}<br><br>`;

        if (!noAttack || pType === 'any') {
            // Простая комбинаторика
            const ways = this.combinations(totalCells, K);
            log += `<b style="color:#f59e0b;">Произвольная расстановка:</b><br>`;
            log += `Так как фигуры не бьют друг друга (или это произвольные фигуры), задача сводится к выбору ${K} уникальных клеток из ${totalCells}.<br>`;
            log += `Формула: C(${totalCells}, ${K}) = <b>${ways}</b><br><br>`;
            log += `<strong style="color:#10b981; font-size:18px;">Итоговый ответ: ${ways} способов.</strong>`;
            solutionText.innerHTML = log;
            return;
        }

        // Задача о небьющих ладьях
        if (pType === 'rook' && noAttack) {
            log += `<b style="color:#f59e0b;">Задача о небьющих ладьях:</b><br>`;
            
            if (K > N || K > M) {
                log += `Две ладьи бьют друг друга, если стоят на одной линии. Так как мы ставим ${K} ладей, а линий всего ${N}х${M}, расстановка невозможна (Принцип Дирихле).<br><br>`;
                log += `<strong style="color:#ef4444; font-size:18px;">Итоговый ответ: 0 способов.</strong>`;
                solutionText.innerHTML = log;
                return;
            }

            const chooseCols = this.combinations(N, K);
            const chooseRows = this.combinations(M, K);
            const permutations = this.fact(K);
            const totalWays = chooseCols * chooseRows * permutations;

            log += `Чтобы ладьи не били друг друга, каждая должна стоять в уникальной строке и уникальном столбце.<br><br>`;
            log += `1. Выбираем ${K} столбцов из ${N}: C(${N}, ${K}) = <b>${chooseCols}</b><br>`;
            log += `2. Выбираем ${K} строк из ${M}: C(${M}, ${K}) = <b>${chooseRows}</b><br>`;
            log += `3. Расставляем ладьи на пересечении (количество перестановок): ${K}! = <b>${permutations}</b><br><br>`;
            
            log += `Формула: C(N, k) * C(M, k) * k! = ${chooseCols} * ${chooseRows} * ${permutations} = <b>${totalWays}</b><br><br>`;
            log += `<strong style="color:#10b981; font-size:18px;">Итоговый ответ: ${totalWays} способов.</strong>`;
            solutionText.innerHTML = log;
        }
    }
}