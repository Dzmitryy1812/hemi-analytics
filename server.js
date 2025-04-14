const express = require('express');
const path = require('path');
const cors = require('cors'); // Подключаем cors
const app = express();
const port = 3000;

// Используем CORS middleware перед маршрутом
app.use(cors());  // Разрешаем все запросы (можно настроить для определенных доменов)

// Обслуживание статических файлов из папки 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Главный маршрут для отдачи index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера на порту 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
