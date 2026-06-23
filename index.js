const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// SAYFA GÖRÜNÜMÜ (FRONTEND)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Future - Gelecek Analiz Merkezi</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; background: #0a0a12; color: #fff; text-align: center; padding: 20px; margin: 0; }
            .container { max-width: 550px; margin: 40px auto; background: rgba(26, 26, 36, 0.85); padding: 30px; border-radius: 16px; border: 1px solid #8a2be2; box-shadow: 0 0 30px rgba(138, 43, 226, 0.3); backdrop-filter: blur(10px); }
            h1 { color: #8a2be2; font-size: 28px; margin-bottom: 10px; text-shadow: 0 0 10px rgba(138, 43, 226, 0.5); }
            p { color: #ccc; font-size: 14px; }
            input { width: 90%; padding: 12px; margin: 10px 0; border: 1px solid #444; background: #05050a; color: #fff; border-radius: 8px; font-size: 16px; text-align: center; outline: none; }
            input:focus { border-color: #8a2be2; box-shadow: 0 0 10px rgba(138, 43, 226, 0.5); }
            button { background: linear-gradient(135deg, #8a2be2 0%, #4a00e0 100%); color: #fff; border: none; padding: 15px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; width: 95%; margin-top: 15px; box-shadow: 0 4px 15px rgba(138, 43, 226, 0.4); transition: 0.2s; }
            button:hover { transform: translateY(-2px); }
            
            /* LOADER */
            .loader { display: none; margin: 20px auto; border: 4px solid #f3f3f3; border-top: 4px solid #8a2be2; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            
            /* RESULT BOX */
            .result-box { display: none; margin-top: 25px; padding: 20px; background: rgba(0,0,0,0.5); border-radius: 12px; border: 1px solid #00ffcc; text-align: left; }
            .result-title { font-weight: bold; color: #00ffcc; margin-bottom: 15px; font-size: 16px; letter-spacing: 1px; }
            
            /* 📊 REALİSTİK QRAFİK (CHART BARS) */
            .chart-container { margin-bottom: 20px; background: #151522; padding: 15px; border-radius: 8px; }
            .chart-label { font-size: 13px; color: #aaa; margin-bottom: 5px; display: flex; justify-content: space-between; }
            .bar-bg { background: #222; width: 100%; height: 10px; border-radius: 5px; margin-bottom: 12px; overflow: hidden; }
            .bar-fill { height: 100%; border-radius: 5px; width: 0%; transition: width 1.5s ease-in-out; }
            
            .ad-container { margin: 40px auto; max-width: 728px; }
        </style>
    </head>
    <body>

        <div class="container">
            <h1>🔮 AI Gelecek Analiz Merkezi</h1>
            <p>Gelişmiş Yapay Zeka (AI), adınızın kozmic frekansını ve doğum yılınızın numerolojik haritasını tarayarak 5 yıl sonraki kaderinizi grafiklerle raporlar.</p>
            
            <input type="text" id="username" placeholder="Adınız ve Soyadınız">
            <input type="number" id="useryear" placeholder="Doğum Yılınız (Örn: 2004)">
            
            <button onclick="hesabla()">Matrisi Çöz ve Analiz Et 🚀</button>
            
            <div id="loader" class="loader"></div>
            
            <div id="resultBox" class="result-box">
                <div class="result-title">📊 YAPAY ZEKA METRİK ANALİZ GRAFİĞİ:</div>
                
                <div class="chart-container">
                    <div class="chart-label"><span>💼 Kariyer ve Başarı</span><span id="p1">0%</span></div>
                    <div class="bar-bg"><div id="b1" class="bar-fill" style="background: #00f2fe;"></div></div>
                    
                    <div class="chart-label"><span>💰 Maddiyat ve Finans</span><span id="p2">0%</span></div>
                    <div class="bar-bg"><div id="b2" class="bar-fill" style="background: #00ffcc;"></div></div>
                    
                    <div class="chart-label"><span>❤️ Sevgi ve İlişkiler</span><span id="p3">0%</span></div>
                    <div class="bar-bg"><div id="b3" class="bar-fill" style="background: #ff007f;"></div></div>
                    
                    <div class="chart-label"><span>🌟 Genel Şans Faktörü</span><span id="p4">0%</span></div>
                    <div class="bar-bg"><div id="b4" class="bar-fill" style="background: #9400d3;"></div></div>
                </div>

                <div class="result-title" style="color: #8a2be2;">🔮 DETAYLI GELECEK RAPORU:</div>
                <div id="resultText" style="line-height: 1.6; color: #fff; font-size: 15px;"></div>
            </div>
        </div>

        <div class="ad-container">
            <div id="frame" style="width: 100%; margin: auto; position: relative; z-index: 99998;">
                <iframe data-aa='2445437' src='//acceptable.a-ads.com/2445437/?size=Adaptive' style='border:0; padding:0; width:100%; height:80px; overflow:hidden; display: block; margin: auto'></iframe>
            </div>
            </div>

        <script>
            const NETICELER = [
                "🚀 İnanılmaz! 5 yıl sonra tamamen tesadüfen keşfedeceğin bir iş fikri sayesinde milyoner oluyorsun. Şu an Dubai'de deniz kenarında kahve içtiğini görüyorum. Ama etrafındaki sahte dostlara dikkat et!",
                "💰 Çok yakında büyük bir kripto para patlamasını erkenden yakalayacaksın. Herkes sana 'yapma' derken sen risk alıp kazanacaksın. 5 yıl sonraki garajında siyah renkli lüks bir spor araba duruyor.",
                "🍕 Harika bir kariyer! Dünyaca ünlü bir teknoloji şirketinde üst düzey yönetici olacaksın. Para o kadar çok gelecek ki harcamaya vaktin kalmayacak. Hayatındaki o gizli kişi yakında sana büyük bir sürpriz yapacak.",
                "🌍 Büyük bir dünya seyahati seni bekliyor! Hiç aklında olmayan bir ülkeye (büyük ihtimalle Amerika veya Japonya) taşınıp orada yaşamaya başlayacaksın. Şans yıldızın şu an zirvede!",
                "🔥 Önümüzdeki 3 yıl içinde sosyal medyada devasa bir kitleye ulaşacaksın ve herkes senden bahsedcek. Tarzın veya gizli bir yeteneğin seni zirveye taşıyacak. Finansal sorunlar senin için tamamen tarih oluyor."
            ];

            function hesabla() {
                const name = document.getElementById("username").value.trim().toLowerCase();
                const year = document.getElementById("useryear").value;
                
                if(!name || !year) {
                    alert("Lütfen tüm alanları doldurun!");
                    return;
                }
                
                document.getElementById("resultBox").style.display = "none";
                document.getElementById("loader").style.display = "block";
                
                // 🛑 BUQUN HƏLLİ: Adın hərflərinin cəmindən sabit unikal kod çıxarırıq
                let charCodeSum = 0;
                for (let i = 0; i < name.length; i++) {
                    charCodeSum += name.charCodeAt(i);
                }
                const uniqueSeed = charCodeSum + parseInt(year);
                
                // Sabit nəticə indeksi
                const index = uniqueSeed % NETICELER.length;
                
                // Sabit və məntiqli qrafik faizləri (Hər ad üçün fərqli amma həmişə sabit)
                const f1 = 50 + (uniqueSeed % 46); // 50% - 95% arası
                const f2 = 40 + ((uniqueSeed * 2) % 56);
                const f3 = 35 + ((uniqueSeed * 3) % 61);
                const f4 = 60 + ((uniqueSeed * 4) % 36);

                setTimeout(() => {
                    document.getElementById("loader").style.display = "none";
                    
                    // Adın ilk hərflərini böyüdüb gözəl göstərmək üçün
                    const displayName = document.getElementById("username").value;
                    document.getElementById("resultText").innerText = "Sayın " + displayName + ", " + NETICELER[index];
                    
                    // Qrafikləri sıfırlayıb animasiya ilə doldurmaq
                    document.getElementById("b1").style.width = "0%";
                    document.getElementById("b2").style.width = "0%";
                    document.getElementById("b3").style.width = "0%";
                    document.getElementById("b4").style.width = "0%";
                    
                    document.getElementById("resultBox").style.display = "block";
                    
                    // Animasiyanı başladırıq
                    setTimeout(() => {
                        document.getElementById("b1").style.width = f1 + "%"; document.getElementById("p1").innerText = f1 + "%";
                        document.getElementById("b2").style.width = f2 + "%"; document.getElementById("p2").innerText = f2 + "%";
                        document.getElementById("b3").style.width = f3 + "%"; document.getElementById("p3").innerText = f3 + "%";
                        document.getElementById("b4").style.width = f4 + "%"; document.getElementById("p4").innerText = f4 + "%";
                    }, 100);

                }, 2000);
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔮 AI Future Güncellendi!`));
