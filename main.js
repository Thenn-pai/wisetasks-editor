document.addEventListener('DOMContentLoaded', () => {
    const propertiesPanel = document.getElementById('properties-panel');
    const generatorSelect = document.getElementById('generator-select');

    async function loadGenerator(selectedTask) {
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
            } else if (selectedTask === 'basket') { // <--- ДОБАВЛЯЕМ ШАРЫ И УРНЫ
                modulePath = './src/ru/spb/ipo/generator/basket/BasketGenerator.js';
                className = 'BasketGenerator';
            }

            if (modulePath) {
                const module = await import(modulePath);
                const generatorInstance = new module[className]();
                
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