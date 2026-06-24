const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-word', (req, res) => {
    const words = [
        { word: "Code", meaning: "Kod" },
        { word: "Network", meaning: "Şəbəkə" },
        { word: "Security", meaning: "Təhlükəsizlik" },
        { word: "Server", meaning: "Server" },
        { word: "Database", meaning: "Verilənlər bazası" }
    ];
    const random = words[Math.floor(Math.random() * words.length)];
    res.json(random);
});

app.listen(process.env.PORT || 3000, () => console.log('Sistem aktivdir'));
