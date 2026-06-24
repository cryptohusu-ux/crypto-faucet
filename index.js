const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Yeni API funksiyası: Daha ciddi analitik nəticə
app.get('/predict', (req, res) => {
    const assets = ['Bitcoin', 'Ethereum', 'Solana', 'AI-Token'];
    const asset = assets[Math.floor(Math.random() * assets.length)];
    const profit = (Math.random() * 500 + 50).toFixed(2);
    
    res.json({
        asset: asset,
        prediction: `Bazarda ${asset} üzrə ani yüksəliş siqnalı aşkarlandı.`,
        potentialProfit: `${profit}% artım gözlənilir.`
    });
});

app.listen(3000, () => console.log('Sistem aktivdir: http://localhost:3000'));
