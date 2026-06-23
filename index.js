const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// =================================================================
// 🎬 FİLM DATA BAZASI (Filmlər və şəkillər bura yığılır)
// =================================================================
const FILMLER = [
    {
        id: 1,
        ad: "Betmen (The Batman)",
        janr: "Aksiyon, Detektiv",
        il: "2022",
        afisa: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500",
        videoUrl: "https://www.youtube.com/embed/mqqft22dxWI" 
    },
    {
        id: 2,
        ad: "Hörümçək Adam (No Way Home)",
        janr: "Fantastika, Macəra",
        il: "2021",
        afisa: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500",
        videoUrl: "https://www.youtube.com/embed/JfVOs4VSpmA"
    }
];

// SAYTIN GÖRÜNÜŞÜ (FRONTEND - NETFLIX STYLE)
app.get('/', (req, res) => {
    let filmKartlari = "";
    FILMLER.forEach(film => {
        filmKartlari += `
        <div class="film-card" onclick="izle(${film.id})">
            <img src="${film.afisa}" alt="${film.ad}">
            <div class="film-info">
                <h3>${film.ad}</h3>
                <p>${film.janr} • ${film.il}</p>
            </div>
        </div>
        `;
    });

    res.send(`
    <!DOCTYPE html>
    <html lang="az">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CineAz - Pulsuz Film İzlə</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; background: #141414; color: #fff; margin: 0; padding: 0; }
            header { background: #000; padding: 20px; text-align: center; border-bottom: 2px solid #e50914; }
            header h1 { color: #e50914; margin: 0; font-size: 35px; letter-spacing: 2px; }
            .container { padding: 40px; max-width: 1200px; margin: 0 auto; }
            .section-title { font-size: 24px; margin-bottom: 20px; border-left: 5px solid #e50914; padding-left: 10px; color: #e50914; }
            .film-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 25px; }
            .film-card { background: #181818; border-radius: 6px; overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
            .film-card:hover { transform: scale(1.05); box-shadow: 0 0 15px #e50914; }
            .film-card img { width: 100%; height: 300px; object-fit: cover; }
            .film-info { padding: 15px; }
            .film-info h3 { margin: 0 0 10px 0; font-size: 16px; font-weight: bold; }
            .film-info p { margin: 0; color: #aaa; font-size: 13px; }
            
            /* PLAYER MODAL */
            .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10000; justify-content: center; align-items: center; flex-direction: column; }
            .modal-content { width: 85%; max-width: 800px; height: 450px; background: #000; position: relative; border: 2px solid #e50914; box-shadow: 0 0 20px #e50914; }
            .close-btn { position: absolute; top: -45px; right: 0; color: #fff; font-size: 35px; cursor: pointer; font-weight: bold; }
            .close-btn:hover { color: #e50914; }

            /* REKLAM BANNER YERİ */
            .ad-container { margin: 30px auto; text-align: center; max-width: 728px; }
        </style>
    </head>
    <body>

        <header>
            <h1>CINEAZ</h1>
        </header>

        <div class="container">
            <div class="section-title">🎬 Populyar Filmlər</div>
            <div class="film-grid">
                ${filmKartlari}
            </div>
        </div>

        <!-- 💰 SƏNİN A-ADS REKLAM BANNERİN (Filmlərin tam altında görünəcək) -->
        <div class="ad-container">
            <!-- BEGIN AADS AD UNIT 2445437 -->
            <div id="frame" style="width: 100%; margin: auto; position: relative; z-index: 99998;">
                <iframe data-aa='2445437' src='//acceptable.a-ads.com/2445437/?size=Adaptive' style='border:0; padding:0; width:100%; height:80px; overflow:hidden; display: block; margin: auto'></iframe>
            </div>
            <!-- END AADS AD UNIT 2445437 -->
        </div>

        <!-- FİLM PLAYER PƏNCƏRƏSİ -->
        <div id="playerModal" class="modal">
            <div class="modal-content">
                <span class="close-btn" onclick="bagla()">&times;</span>
                <iframe id="videoPlayer" src="" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>

        <script>
            function izle(id) {
                const filmler = ${JSON.stringify(FILMLER)};
                const secilenFilm = filmler.find(f => f.id === id);
                
                if(secilenFilm) {
                    document.getElementById("videoPlayer").src = secilenFilm.videoUrl;
                    document.getElementById("playerModal").style.display = "flex";
                }
            }

            function bagla() {
                document.getElementById("playerModal").style.display = "none";
                document.getElementById("videoPlayer").src = "";
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🎬 Film saytı aktivdir!`));
