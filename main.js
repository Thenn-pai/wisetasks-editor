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
            }
            // Позже сюда добавим word, numbers и остальные...

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

    // При выборе в меню - загружаем модуль
    generatorSelect.addEventListener('change', (e) => loadGenerator(e.target.value));

    // Автоматически запускаем Карты при старте сайта!
    loadGenerator('cards');
});