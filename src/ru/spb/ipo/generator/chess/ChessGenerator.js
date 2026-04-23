import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class ChessGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.pieces = {
            'any': { name: 'Произвольная фигура', symbol: '♟', color: '#cbd5e1' },
            'rook': { name: 'Ладья', symbol: '♜', color: '#60a5fa' },
            'bishop': { name: 'Слон', symbol: '♝', color: '#a78bfa' },
            'knight': { name: 'Конь', symbol: '♞', color: '#f472b6' },
            'queen': { name: 'Ферзь', symbol: '♛', color: '#f59e0b' },
            'king': { name: 'Король', symbol: '♚', color: '#10b981' }
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
                            Укажите ширину (N) и высоту (M) доски.
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 2: Фигуры</strong><br>
                            Выберите тип шахматной фигуры и их количество (k).
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 3: Ограничения</strong><br>
                            Если включен режим "не бьют друг друга", алгоритм использует правила классических шахмат:<br>
                            • <b>Ладьи:</b> прямые линии<br>
                            • <b>Слоны:</b> диагонали<br>
                            • <b>Кони:</b> ход буквой Г<br>
                            • <b>Ферзи:</b> прямые + диагонали<br>
                            • <b>Короли:</b> соседние клетки
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

    generateProblemText(container) {
        const N = container.querySelector('#board-n').value;
        const M = container.querySelector('#board-m').value;
        const K = container.querySelector('#piece-k').value;
        const pType = container.querySelector('#piece-type').value;
        const noAttack = container.querySelector('#cond-attack').checked;
        const textBox = container.querySelector('#problem-text');
        
        let pName = this.pieces[pType].name;
        // Склонение
        if (pType === 'rook') pName = 'ладей';
        else if (pType === 'bishop') pName = 'слонов';
        else if (pType === 'knight') pName = 'коней';
        else if (pType === 'queen') pName = 'ферзей';
        else if (pType === 'king') pName = 'королей';
        else pName = 'одинаковых фигур';

        let text = `Имеется шахматная доска размером <b>${N}x${M}</b>. На ней необходимо расставить <b>${K}</b> ${pName}.<br>`;
        text += `Подсчитайте количество способов расстановки, при условии, что в одной клетке может стоять не более одной фигуры`;
        
        if (noAttack && pType !== 'any') {
            text += `, и фигуры <b>не должны бить друг друга</b> по классическим правилам шахмат.`;
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
            const ways = this.combinations(totalCells, K);
            log += `<b style="color:#f59e0b;">Произвольная расстановка:</b><br>`;
            log += `Так как фигуры не бьют друг друга (или это пешки без хода), задача сводится к выбору ${K} уникальных клеток из ${totalCells}.<br>`;
            log += `Формула: C(${totalCells}, ${K}) = <b>${ways}</b><br><br>`;
            log += `<strong style="color:#10b981; font-size:18px;">Итоговый ответ: ${ways} способов.</strong>`;
            solutionText.innerHTML = log;
            return;
        }

        // --- ТОЧНЫЙ АНАЛИТИЧЕСКИЙ РАСЧЕТ ДЛЯ ЛАДЕЙ ---
        if (pType === 'rook' && noAttack) {
            log += `<b style="color:#f59e0b;">Задача о небьющих ладьях (Аналитика):</b><br>`;
            
            if (K > N || K > M) {
                log += `Две ладьи бьют друг друга, если стоят на одной линии. Так как мы ставим ${K} ладей, а линий всего ${Math.min(N, M)}, расстановка невозможна (Принцип Дирихле).<br><br>`;
                log += `<strong style="color:#ef4444; font-size:18px;">Итоговый ответ: 0 способов.</strong>`;
                solutionText.innerHTML = log;
                return;
            }

            const chooseCols = this.combinations(N, K);
            const chooseRows = this.combinations(M, K);
            const permutations = this.fact(K);
            const totalWays = chooseCols * chooseRows * permutations;

            log += `1. Выбираем ${K} столбцов из ${N}: C(${N}, ${K}) = <b>${chooseCols}</b><br>`;
            log += `2. Выбираем ${K} строк из ${M}: C(${M}, ${K}) = <b>${chooseRows}</b><br>`;
            log += `3. Расставляем ладьи на пересечении (перестановки): ${K}! = <b>${permutations}</b><br><br>`;
            log += `Формула: C(${N}, ${K}) * C(${M}, ${K}) * ${K}! = <b>${totalWays}</b><br><br>`;
            log += `<strong style="color:#10b981; font-size:18px;">Итоговый ответ: ${totalWays} способов.</strong>`;
            solutionText.innerHTML = log;
            return;
        }

        // --- DFS ПЕРЕБОР ДЛЯ ОСТАЛЬНЫХ ФИГУР ---
        log += `<b style="color:#f59e0b;">Задача о небьющих фигурах (${this.pieces[pType].name}):</b><br>`;
        log += `Алгоритм строит дерево поиска в глубину (DFS) с отсечением ветвей по правилу хода фигуры...<br><br>`;

        // Защита от долгого зависания на огромных досках с Ферзями
        if (totalCells > 64 && K > 6) {
            log += `<i style="color:#94a3b8;">Идет вычисление... (может занять пару секунд)</i><br><br>`;
        }

        // Запускаем асинхронно, чтобы не "вешать" интерфейс, но для простоты кода сделаем через setTimeout
        setTimeout(() => {
            const exactCount = this.calculateChessDFS(N, M, K, pType);
            
            if (exactCount === 0) {
                 log += `<strong style="color:#ef4444; font-size:16px;">Ответ: 0 способов.</strong><br>Невозможно расставить столько фигур так, чтобы они не били друг друга.`;
            } else {
                 log += `<strong style="color:#10b981; font-size:18px;">Итоговый точный ответ: ${exactCount} способов.</strong>`;
            }
            solutionText.innerHTML = log;
        }, 10);
    }

    calculateChessDFS(N, M, K, pType) {
        let count = 0;
        const totalCells = N * M;
        const placed = []; // Храним {x, y}

        const isSafe = (x, y) => {
            for (let i = 0; i < placed.length; i++) {
                const px = placed[i].x;
                const py = placed[i].y;
                const dx = Math.abs(px - x);
                const dy = Math.abs(py - y);

                if (pType === 'bishop') {
                    if (dx === dy) return false;
                } else if (pType === 'knight') {
                    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) return false;
                } else if (pType === 'queen') {
                    if (dx === 0 || dy === 0 || dx === dy) return false;
                } else if (pType === 'king') {
                    if (dx <= 1 && dy <= 1) return false;
                }
            }
            return true;
        };

        const dfs = (startIndex) => {
            if (placed.length === K) {
                count++;
                return;
            }

            // Отсечение: если оставшихся клеток меньше, чем нужно фигур - смысла идти дальше нет
            if (totalCells - startIndex < K - placed.length) return;

            for (let i = startIndex; i < totalCells; i++) {
                const x = i % N; // Колонка
                const y = Math.floor(i / N); // Строка

                if (isSafe(x, y)) {
                    placed.push({x, y});
                    dfs(i + 1); // Следующую фигуру ставим строго ПОСЛЕ текущей (чтобы избежать дублей)
                    placed.pop();
                }
            }
        };

        dfs(0);
        return count;
    }
}