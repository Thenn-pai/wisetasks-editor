import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';

export class BasketGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        // Содержимое урны: { colorId: count }
        this.urn = {};
        // Что вытаскивают: { colorId: count }
        this.draw = {};
        
        this.colors = {
            'white':  { name: 'Белый', hex: '#f8fafc', border: '#cbd5e1', text: '#0f172a' },
            'black':  { name: 'Черный', hex: '#0f172a', border: '#334155', text: '#f8fafc' },
            'red':    { name: 'Красный', hex: '#ef4444', border: '#b91c1c', text: '#ffffff' },
            'blue':   { name: 'Синий', hex: '#3b82f6', border: '#1d4ed8', text: '#ffffff' },
            'green':  { name: 'Зеленый', hex: '#10b981', border: '#047857', text: '#ffffff' },
            'yellow': { name: 'Желтый', hex: '#f59e0b', border: '#b45309', text: '#ffffff' }
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
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Шары и урны</h3>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 1: Основная корзина</strong><br>
                            Добавьте в корзину шары разных цветов, указав их количество. Это сформирует исходное множество.
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 2: Условия выборки</strong><br>
                            Укажите, сколько шаров и какого цвета нужно вытащить. Если вы вытаскиваете шары, которых нет в корзине, ответ будет 0.
                        </div>
                        
                        <div style="margin-bottom: 15px; font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 3: Порядок (Важно!)</strong><br>
                            Если стоит галочка «Последовательно», порядок вытаскивания шаров имеет значение (алгоритм домножит результат на перестановки).
                        </div>

                        <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1;">
                            <strong style="color: white;">Шаг 4: Расчет</strong><br>
                            Система распишет формулы сочетаний для каждого цвета и выдаст точный ответ.
                        </div>
                    </div>
                </div>

                <div style="flex: 1;">
                    <h2 style="margin-bottom: 20px; font-weight: 600;">Генератор: Выборка из корзины</h2>
                    
                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(30, 41, 59, 0.4); border: 1px solid #334155; border-radius: 8px;">
                        <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">1. Основная корзина (Содержимое):</label>
                        
                        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                            <input type="number" id="urn-count" value="1" min="1" max="50" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                            <select id="urn-color" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                ${Object.entries(this.colors).map(([k, v]) => `<option value="${k}">${v.name} шар</option>`).join('')}
                            </select>
                            <button id="add-urn-btn" class="btn" style="background: #3b82f6;">+ Добавить в корзину</button>
                            <button id="clear-urn-btn" class="btn" style="background: #ef4444; margin-left: auto;">Очистить урну</button>
                        </div>
                        
                        <div id="urn-display" style="display: flex; flex-wrap: wrap; gap: 8px; padding: 15px; background: #0f172a; border: 1px solid #1e293b; border-radius: 6px; min-height: 60px;">
                            <em style="color: #475569; font-size: 14px;">Корзина пуста...</em>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid #3b82f6; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600;">2. Из корзины вытаскивают:</label>

                        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                            <input type="number" id="draw-count" value="1" min="1" max="50" style="width: 70px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                            <select id="draw-color" style="padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                                <option value="any">Любой шар (случайный)</option>
                                ${Object.entries(this.colors).map(([k, v]) => `<option value="${k}">${v.name} шар</option>`).join('')}
                            </select>
                            <button id="add-draw-btn" class="btn" style="background: #f59e0b; color: #fff;">+ Вытащить</button>
                            <button id="clear-draw-btn" class="btn" style="background: #475569; margin-left: auto;">Сбросить выборку</button>
                        </div>

                        <div id="draw-display" style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 15px;"></div>

                        <div style="padding-top: 15px; border-top: 1px solid #334155;">
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #f8fafc; font-size: 15px;">
                                <input type="checkbox" id="is-sequential" style="width: 18px; height: 18px; accent-color: #3b82f6;">
                                Вытаскивают последовательно (порядок шаров имеет значение)
                            </label>
                        </div>
                    </div>

                    <button id="generate-xml-btn" class="btn" style="width: 100%; background-color: #10b981; font-size: 16px; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Сгенерировать и Решить задачу</button>

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
    }

    attachEvents(container) {
        // Управление урной
        container.querySelector('#add-urn-btn').onclick = () => {
            const count = parseInt(container.querySelector('#urn-count').value);
            const color = container.querySelector('#urn-color').value;
            this.urn[color] = (this.urn[color] || 0) + count;
            this.renderUrn(container);
        };
        container.querySelector('#clear-urn-btn').onclick = () => {
            this.urn = {};
            this.renderUrn(container);
        };

        // Управление выборкой
        container.querySelector('#add-draw-btn').onclick = () => {
            const count = parseInt(container.querySelector('#draw-count').value);
            const color = container.querySelector('#draw-color').value;
            this.draw[color] = (this.draw[color] || 0) + count;
            this.renderDraw(container);
        };
        container.querySelector('#clear-draw-btn').onclick = () => {
            this.draw = {};
            this.renderDraw(container);
        };

        container.querySelector('#generate-xml-btn').onclick = () => {
            this.generateProblemText(container);
            this.solveMath(container);
        };
    }

    renderUrn(container) {
        const display = container.querySelector('#urn-display');
        display.innerHTML = '';
        
        if (Object.keys(this.urn).length === 0) {
            display.innerHTML = '<em style="color: #475569; font-size: 14px;">Корзина пуста...</em>';
            return;
        }

        // Рисуем кружочки шаров
        for (const [colorKey, count] of Object.entries(this.urn)) {
            const cInfo = this.colors[colorKey];
            const badge = document.createElement('div');
            badge.style.display = 'flex';
            badge.style.alignItems = 'center';
            badge.style.gap = '8px';
            badge.style.background = 'rgba(0,0,0,0.3)';
            badge.style.padding = '5px 10px';
            badge.style.borderRadius = '20px';
            badge.style.border = '1px solid #334155';

            badge.innerHTML = `
                <div style="width: 16px; height: 16px; border-radius: 50%; background: ${cInfo.hex}; border: 1px solid ${cInfo.border};"></div>
                <span style="color: #e2e8f0; font-size: 14px;">${cInfo.name}: <b>${count}</b> шт.</span>
            `;
            display.appendChild(badge);
        }
    }

    renderDraw(container) {
        const display = container.querySelector('#draw-display');
        display.innerHTML = '';

        for (const [colorKey, count] of Object.entries(this.draw)) {
            const tag = document.createElement('div');
            tag.style.display = 'flex';
            tag.style.justifyContent = 'space-between';
            tag.style.background = 'rgba(0,0,0,0.2)';
            tag.style.padding = '8px 15px';
            tag.style.border = '1px solid #475569';
            tag.style.borderRadius = '6px';
            
            let nameStr = colorKey === 'any' ? 'Любых шаров' : `Шаров цвета «${this.colors[colorKey].name}»`;
            let colorDot = colorKey === 'any' ? '⚪' : `<div style="display:inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${this.colors[colorKey].hex}; border: 1px solid ${this.colors[colorKey].border}; margin-right: 5px;"></div>`;

            tag.innerHTML = `
                <span style="color: #cbd5e1; font-size: 14px; display:flex; align-items:center;">
                    Вытаскивают: <strong style="color:white; margin: 0 8px;">${count}</strong> ${colorDot} ${nameStr}
                </span>
                <span style="color: #ef4444; cursor: pointer; font-weight: bold; padding: 0 5px;" title="Удалить">✕</span>
            `;
            
            tag.querySelector('span:last-child').onclick = () => {
                delete this.draw[colorKey];
                this.renderDraw(container);
            };
            display.appendChild(tag);
        }
    }

    generateProblemText(container) {
        const textBox = container.querySelector('#problem-text');
        const isSeq = container.querySelector('#is-sequential').checked;
        
        let totalUrn = Object.values(this.urn).reduce((a, b) => a + b, 0);
        let totalDraw = Object.values(this.draw).reduce((a, b) => a + b, 0);

        if (totalUrn === 0) {
            textBox.innerHTML = "<span style='color:#ef4444;'>Заполните корзину шарами!</span>";
            return;
        }

        let urnTexts = Object.entries(this.urn).map(([k, v]) => `${v} ${this.colors[k].name.toLowerCase()}х`);
        let text = `В корзине лежит <b>${totalUrn}</b> шаров: ${urnTexts.join(', ')}.<br>`;
        
        let drawTexts = Object.entries(this.draw).map(([k, v]) => {
            return k === 'any' ? `${v} любых` : `${v} ${this.colors[k].name.toLowerCase()}х`;
        });

        text += `Из корзины ${isSeq ? '<b>последовательно</b>' : '<b>одновременно</b>'} вытаскивают ${totalDraw} шаров.<br>`;
        
        if (Object.keys(this.draw).length > 0) {
            text += `Подсчитайте количество способов вытащить шары так, чтобы среди них было: <b>${drawTexts.join(', ')}</b>.`;
        } else {
            text += `Подсчитайте количество всех возможных исходов выборки.`;
        }

        textBox.innerHTML = text;
    }

    solveMath(container) {
        const solutionBox = container.querySelector('#solution-box');
        const solutionText = container.querySelector('#solution-text');
        solutionBox.style.display = 'block';

        const isSeq = container.querySelector('#is-sequential').checked;
        
        let totalUrn = Object.values(this.urn).reduce((a, b) => a + b, 0);
        let totalDraw = Object.values(this.draw).reduce((a, b) => a + b, 0);

        if (totalUrn === 0 || totalDraw === 0) {
            solutionText.innerHTML = "<span style='color:#ef4444;'>Ошибка: Корзина или список выборки пусты.</span>";
            return;
        }

        if (totalDraw > totalUrn) {
            solutionText.innerHTML = `<span style='color:#ef4444;'>Ошибка: Нельзя вытащить ${totalDraw} шаров из корзины, в которой всего ${totalUrn} шаров.</span>`;
            return;
        }

        let log = `<b style="color:#60a5fa;">Параметры выборки:</b><br>`;
        log += `Всего шаров в корзине (N) = ${totalUrn}<br>`;
        log += `Вытаскиваем шаров (k) = ${totalDraw}<br>`;
        log += `Метод: ${isSeq ? 'Упорядоченная выборка (с учетом перестановок)' : 'Неупорядоченная выборка (сочетания)'}<br><br>`;

        // Проверяем, хватает ли шаров нужных цветов
        for (const [color, reqCount] of Object.entries(this.draw)) {
            if (color !== 'any') {
                const avail = this.urn[color] || 0;
                if (reqCount > avail) {
                    log += `<strong style="color:#ef4444; font-size:16px;">Ответ: 0 способов.</strong><br>`;
                    log += `Вы просите вытащить ${reqCount} шаров цвета «${this.colors[color].name}», но в корзине их всего ${avail}.`;
                    solutionText.innerHTML = log;
                    return;
                }
            }
        }

        let totalWays = 1;
        let drawnSpecific = 0;

        log += `<b style="color:#f59e0b;">Шаги решения:</b><br>`;

        // Считаем сочетания для конкретных цветов
        for (const [color, reqCount] of Object.entries(this.draw)) {
            if (color !== 'any') {
                const avail = this.urn[color];
                const ways = this.combinations(avail, reqCount);
                log += `• Вытаскиваем «${this.colors[color].name}» (${reqCount} из ${avail}): C(${avail}, ${reqCount}) = <b>${ways}</b><br>`;
                totalWays *= ways;
                drawnSpecific += reqCount;
            }
        }

        // Если есть "Любые шары", добираем их из остатка
        const needAny = this.draw['any'] || 0;
        if (needAny > 0) {
            const availAny = totalUrn - drawnSpecific;
            const waysAny = this.combinations(availAny, needAny);
            log += `• Добираем случайные шары (${needAny} из оставшихся ${availAny}): C(${availAny}, ${needAny}) = <b>${waysAny}</b><br>`;
            totalWays *= waysAny;
        }

        log += `<br><i style="color:#cbd5e1;">Базовое количество сочетаний: ${totalWays}</i><br>`;

        // Учитываем последовательность
        if (isSeq) {
            const perms = this.fact(totalDraw);
            log += `• Так как шары вытаскивают <b>последовательно</b>, порядок имеет значение.<br>`;
            log += `Домножаем результат на количество перестановок вытащенных шаров: k! = ${totalDraw}! = <b>${perms}</b><br><br>`;
            totalWays *= perms;
        } else {
             log += `<br>`;
        }

        log += `<strong style="color:#10b981; font-size:18px;">Итоговый ответ: ${totalWays} способов.</strong>`;
        solutionText.innerHTML = log;
    }
}