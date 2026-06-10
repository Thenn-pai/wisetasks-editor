document.addEventListener('DOMContentLoaded', () => {
    const propertiesPanel = document.getElementById('properties-panel');
    const generatorSelect = document.getElementById('generator-select');

    let currentGeneratorInstance = null;

    window.taskStore = {
        tasks: JSON.parse(localStorage.getItem('wisetasks_tasks') || '[]'),
        save() {
            localStorage.setItem('wisetasks_tasks', JSON.stringify(this.tasks));
        },
        addTask(task) {
            const newTask = {
                id: task.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                createdAt: task.createdAt || new Date().toISOString(),
                ...task
            };
            this.tasks.unshift(newTask);
            this.save();
            return newTask;
        },
        getTasks() {
            return this.tasks;
        },
        getTaskById(id) {
            return this.tasks.find((task) => task.id === id);
        },
        clear() {
            this.tasks = [];
            this.save();
        }
    };

    async function loadGenerator(selectedTask) {
        if (currentGeneratorInstance) {
            if (typeof currentGeneratorInstance.destroy === 'function') {
                currentGeneratorInstance.destroy();
            }
            currentGeneratorInstance = null;
        }

        propertiesPanel.innerHTML = '<p style="text-align: center; color: #888; margin-top: 50px;">Загрузка модуля...</p>';
        
        let modulePath = ''; 
        let className = '';

        try {
            if (selectedTask === 'cards') {
                modulePath = './src/ru/spb/ipo/generator/cards/CardGenerator.js';
                className = 'CardGenerator';
            } else if (selectedTask === 'word') {
                modulePath = './src/ru/spb/ipo/generator/word/WordGenerator.js';
                className = 'WordGenerator';
            } else if (selectedTask === 'numbers') {
                modulePath = './src/ru/spb/ipo/generator/numbers/NumbersGenerator.js';
                className = 'NumbersGenerator';
            } else if (selectedTask === 'equation') {
                modulePath = './src/ru/spb/ipo/generator/equation/EquationGenerator.js';
                className = 'EquationGenerator';
            } else if (selectedTask === 'basket') {
                modulePath = './src/ru/spb/ipo/generator/basket/BasketGenerator.js';
                className = 'BasketGenerator';
            } else if (selectedTask === 'digits') { 
                modulePath = './src/ru/spb/ipo/generator/digits/DigitsGenerator.js';
                className = 'DigitsGenerator';
            } else if (selectedTask === 'chess') {
                modulePath = './src/ru/spb/ipo/generator/chess/ChessGenerator.js';
                className = 'ChessGenerator';
            } else if (selectedTask === 'solver') {
                modulePath = './src/ru/spb/ipo/generator/solver/SolverGenerator.js';
                className = 'SolverGenerator';
            } else if (selectedTask === 'students') {
                modulePath = './src/ru/spb/ipo/generator/students/StudentRolesGenerator.js';
                сlassName = 'StudentRolesGenerator';
            } 
            

            if (modulePath) {
                const module = await import(modulePath);
                const generatorInstance = new module[className]();
                
                currentGeneratorInstance = generatorInstance;
                
                if (generatorInstance.renderUI) {
                    generatorInstance.renderUI(propertiesPanel);
                } else {
                    propertiesPanel.innerHTML = `<h3>${className}</h3><p>Метод renderUI не найден.</p>`;
                }
            } else {
                propertiesPanel.innerHTML = `<h3 style="color:#e67e22;">Модуль в разработке</h3><p>Генератор "${selectedTask}" еще не подключен в main.js.</p>`;
            }
        } catch (error) {
            console.error(error);
            propertiesPanel.innerHTML = `<h3 style="color: #ff5555;">Ошибка загрузки</h3><p>Проверьте консоль. Не найден файл: <code>${modulePath}</code></p>`;
        }
    }

    generatorSelect.addEventListener('change', (e) => loadGenerator(e.target.value));

    loadGenerator('cards');
});