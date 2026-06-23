const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// SAYFA GÖRÜNÜMÜ (FRONTEND - TÜRKÇE)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Future - Geleceğini Öğren</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; background: #0a0a12; color: #fff; text-align: center; padding: 20px; margin: 0; }
            .matrix-bg { position: fixed; top:0; left:0; width:100%; height:100%; z-index:-1; opacity: 0.05; background: url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000'); }
            .container { max-width: 500px; margin: 60px auto; background: rgba(26, 26, 36, 0.8); padding: 30px; border-radius: 16px; border: 1px solid #8a2be2; box-shadow: 0 0 30px rgba(138, 43, 226, 0.3); backdrop-filter: blur(10px); }
            h1 { color: #8a2be2; font-size: 28px; margin-bottom: 10px; text-shadow: 0 0 10px rgba(138, 43, 226, 0.5); }
            p { color: #ccc; font-size: 14px; }
            input { width: 90%; padding: 12px; margin: 10px 0; border: 1px solid #444; background: #05050a; color: #fff; border-radius: 8px; font-size: 16px; text-align: center; outline: none; }
            input:focus { border-color: #8a2be2; box-shadow: 0 0 10px rgba(138, 43, 226, 0.5); }
            button { background: linear-gradient(135deg, #8a2be2 0%, #4a00e0 100%); color: #fff; border: none; padding: 15px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; width: 95%; margin-top: 15px; box-shadow: 0 4px 15px rgba(138, 43, 226, 0.4); }
            button:hover { transform: translateY(-2px); }
            
            .loader { display: none; margin: 20px auto; border: 4px solid #f3f3f3; border-top: 4px solid #8a2be2; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            
            .result-box { display: none; margin-top: 25px; padding: 15px; background: rgba(0,0,0,0.4); border-radius: 8px; border-left: 4px solid #00ffcc; text-align: left; }
            .result-title { font-weight: bold; color: #00ffcc; margin-bottom: 5px; }

            .ad-container { margin: 40px auto; max-width: 728px; }
        </style>
    </head>
    <body>
        <div class="matrix-bg"></div>

        <div class="container">
            <h1>🔮 AI Gelecek Analizi</h1>
            <p>Yapay Zeka, adınız ve doğum yılınız üzerinden kozmik frekansları hesaplayarak 5 yıl sonraki geleceğinizi tahmin ediyor.</p>
            
            <input type="text" id="username" placeholder="Adınız ve Soyadınız">
            <input type="number" id="useryear" placeholder="Doğum Yılınız (Örn: 2004)">
            
            <button onclick="hesabla()">Geleceğimi Hesapla 🚀</button>
            
            <div id="loader" class="loader"></div>
            
            <div id="resultBox" class="result-box">
                <div class="result-title">🧠 YAPAY ZEKA KOZMİK ANALİZ SONUCU:</div>
                <div id="resultText" style="line-height: 1.6; color: #fff;"></div>
            </div>
        </div>

        <!-- 💰 SENİN REKLAM BANNERİN (Kullanıcılar sonucu beklerken tam karşısında duracak) -->
        <div class="ad-container">
            <!-- BEGIN AADS AD UNIT 2445437 -->
            <div id="frame" style="width: 100%; margin: auto; position: relative; z-index: 99998;">
                <iframe data-aa='2445437' src='//acceptable.a-ads.com/2445437/?size=Adaptive' style='border:0; padding:0; width:100%; height:80px; overflow:hidden; display: block; margin: auto'></iframe>
            </div>
            <!-- END AADS AD UNIT 2445437 -->
        </div>

        <script>
            const NETICELER = [
                "🚀 İnanılmaz! 5 yıl sonra tamamen tesadüfen keşfedeceğin bir iş fikri sayesinde milyoner oluyorsun. Şu an Dubai'de deniz kenarında kahve içtiğini görüyorum. Ama etrafındaki sahte dostlara dikkat et!",
                "💰 Çok yakında büyük bir kripto para patlamasını erkenden yakalayacaksın. Herkes sana 'yapma' derken sen risk alıp kazanacaksın. 5 yıl sonraki garajında siyah renkli lüks bir spor araba duruyor.",
                "🍕 Harika bir kariyer! Dünyaca ünlü bir teknoloji şirketinde üst düzey yönetici olacaksın. Para o kadar çok gelecek ki harcamaya vaktin kalmayacak. Hayatındaki o gizli kişi yakında sana büyük bir sürpriz yapacak.",
                "🌍 Büyük bir dünya seyahati seni bekliyor! Hiç aklında olmayan bir ülkeye (büyük ihtimalle Amerika veya Japonya) taşınıp orada yaşamaya başlayacaksın. Şans yıldızın şu an zirvede!",
                "🔥 Önümüzdeki 3 yıl içinde sosyal medyada devasa bir kitleye ulaşacaksın ve herkes senden bahsedecek. Tarzın veya gizli bir yeteneğin seni zirveye taşıyacak. Finansal sorunlar senin için tamamen tarih oluyor."
            ];

            function hesabla() {
                const name = document.getElementById("username").value;
                const year = document.getElementById("useryear").value;
                
                if(!name || !year) {
                    alert("Lütfen tüm alanları doldurun!");
                    return;
                }
                
                document.getElementById("resultBox").style.display = "none";
                document.getElementById("loader").style.display = "block";
                
                setTimeout(() => {
                    document.getElementById("loader").style.display = "none";
                    
                    // İsmin uzunluğuna göre kişiye özel algoritma
                    const index = (name.length + parseInt(year)) % NETICELER.length;
                    
                    document.getElementById("resultText").innerText = "Sayın " + name + ", " + NETICELER[index];
                    document.getElementById("resultBox").style.display = "block";
                }, 2000);
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔮 AI Future aktif!`));
