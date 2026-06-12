import { BaseGeneratorUI } from '../base/ui/BaseGeneratorUI.js';
import { MathUtils } from '../mathUtils.js';

export class StudentRolesGenerator extends BaseGeneratorUI {
    constructor() {
        super();
        this.pageTitle = 'Выбор должностей';
        this.roles = ['Староста', 'Заместитель старосты'];
    }

    renderUI(container) {
        container.innerHTML = `
            <div style="display: flex; gap: 30px; max-width: 1200px; margin: 0 auto;">
                
                <div style="width: 280px; flex-shrink: 0;">
                    <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 20px; position: sticky; top: 0;">
                        <h3 style="color: #64b5f6; margin-bottom: 15px; font-size: 16px;">📖 Памятка: Студенты</h3>
                        <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                            Задача на <b>размещения без повторений</b>.<br><br>
                            Порядок имеет значение: Иванов-староста и Петров-зам — это не то же самое, что Петров-староста и Иванов-зам.<br><br>
                            Формула: <b>A(n, k) = n! / (n-k)!</b>
                        </p>
                    </div>
                </div>

                <div style="flex: 1;">
                    <h2 style="margin-bottom: 20px; font-weight: 600;">Генератор: Распределение должностей 🎓</h2>
                    
                    <div style="margin-bottom: 20px; padding: 20px; background: rgba(30, 41, 59, 0.4); border: 1px solid #334155; border-radius: 8px;">
                        
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #475569;">
                            <label style="color: #60a5fa; font-weight: 600; font-size: 16px;">Всего студентов в группе (n):</label>
                            <input type="number" id="total-students" value="25" min="1" max="1000" style="width: 80px; padding: 8px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px; font-size: 16px;">
                        </div>

                        <label style="display:block; margin-bottom: 15px; color: #60a5fa; font-weight: 600; font-size: 16px;">Должности для выбора (k):</label>
                        
                        <div id="roles-list" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px;"></div>

                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="new-role-input" placeholder="Например: Профорг" style="flex: 1; padding: 10px; background: #1e293b; color: white; border: 1px solid #475569; border-radius: 6px;">
                            <button id="add-role-btn" class="btn" style="background: #e67e22; padding: 10px 20px;">+ Добавить должность</button>
                        </div>

                    </div>

                    <button id="generate-btn" class="btn" style="width: 100%; background-color: #3b82f6; font-size: 16px; padding: 15px; border-radius: 8px;">Создать задачу</button>
                </div>
            </div>
        `;

        this.rolesListContainer = container.querySelector('#roles-list');
        this.attachEvents(container);
        this.renderRoles();
    }

    renderRoles() {
        this.rolesListContainer.innerHTML = '';
        this.roles.forEach((role, index) => {
            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 10px 15px; border: 1px solid #475569; border-radius: 6px;';
            row.innerHTML = `
                <span style="color: #cbd5e1; font-size: 15px;">${index + 1}. <strong style="color: #f8fafc;">${role}</strong></span>
                <span style="color: #ef4444; cursor: pointer; font-weight: bold; padding: 0 5px;" class="delete-role">✕</span>
            `;
            
            row.querySelector('.delete-role').onclick = () => {
                this.roles.splice(index, 1);
                this.renderRoles();
            };
            this.rolesListContainer.appendChild(row);
        });
    }

    attachEvents(container) {
        // --- 1. ВАЛИДАЦИЯ ДОБАВЛЕНИЯ ДОЛЖНОСТИ ---
        container.querySelector('#add-role-btn').onclick = () => {
            const input = container.querySelector('#new-role-input');
            const val = input.value.trim(); // Убираем пробелы по краям
            
            // Проверка на пустое поле
            if (!val) {
                alert("Ошибка валидации: Введите название должности.");
                return;
            }
            // Защита от дубликатов (независимо от регистра)
            if (this.roles.some(role => role.toLowerCase() === val.toLowerCase())) {
                alert("Ошибка валидации: Такая должность уже есть в списке.");
                return;
            }
            // Ограничение на длину (защита верстки)
            if (val.length > 40) {
                alert("Ошибка валидации: Название должности слишком длинное (максимум 40 символов).");
                return;
            }
            // Ограничение количества должностей
            if (this.roles.length >= 30) {
                alert("Ошибка валидации: Достигнут лимит. Вы не можете добавить больше 30 должностей.");
                return;
            }

            this.roles.push(val);
            input.value = '';
            this.renderRoles();
        };

        // --- 2. ВАЛИДАЦИЯ ГЕНЕРАЦИИ ЗАДАЧИ ---
        container.querySelector('#generate-btn').onclick = () => {
            const N = parseInt(container.querySelector('#total-students').value);
            const K = this.roles.length;

            // Проверка корректности N (Нижний порог и NaN)
            if (isNaN(N) || N < 1) {
                alert("Ошибка валидации: Введите корректное число студентов (не менее 1).");
                return;
            }
            // Защита от переполнения (Верхний порог)
            if (N > 1000) {
                alert("Ошибка валидации: Количество студентов не должно превышать 1000.");
                return;
            }
            // Проверка на наличие хотя бы одной должности
            if (K === 0) {
                alert("Ошибка валидации: Добавьте хотя бы одну должность в список.");
                return;
            }
            // Защита от логической ошибки (нельзя раздать 5 должностей 3 студентам)
            if (K > N) {
                alert(`Ошибка валидации: Должностей (${K}) больше, чем самих студентов (${N}).`);
                return;
            }

            // Математический расчет
            const factN = MathUtils.fact(N);
            const factNK = MathUtils.fact(N - K);
            const exactCount = factN / factNK;

            // Формирование текста
            const rolesText = this.roles.map(r => `«${r}»`).join(', ');
            const text = `В студенческой группе <b>${N}</b> человек. Необходимо выбрать студентов на следующие должности: ${rolesText}. Один человек может занимать только одну должность. Сколькими способами это можно сделать?`;
            
            // Сохранение в Тренажер
            this.saveTask({
                title: `Выбор студентов (n=${N}, k=${K})`,
                descriptionHtml: text,
                solutionHtml: '',
                answerText: exactCount.toString(),
                category: this.pageTitle
            });

            alert("Задача успешно сгенерирована и отправлена в Тренажер!");
        };
    }
}