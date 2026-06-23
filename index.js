// =================================================================
// ⚙️ SƏNİN MƏLUMATLARIN (DOMEN ALANDAN SONRA BURANI DOLDURACAQSAN)
// =================================================================
const FAUCETPAY_API_KEY = "BURA_HƏLƏLİK_BOŞ_QALSIN"; 
const CPALEAD_SECRET_KEY = "BURA_HƏLƏLİK_BOŞ_QALSIN";
const CPALEAD_IFRAME_URL = "BURA_HƏLƏLİK_BOŞ_QALSIN";
// =================================================================

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const CRYPTO_CURRENCY = "TRX"; 
const TRX_PRICE_USD = 0.12;    

// REKLAM ŞİRKƏTİNDƏN AVTOMATİK PUL GƏLƏNDƏ İŞLƏYƏN HİSSƏ
app.get('/api/postback', async (req, res) => {
    const { status, userId, reward, secret_key } = req.query;

    if (secret_key !== CPALEAD_SECRET_KEY) {
        return res.status(401).send("Səlahiyyətsiz Giriş!");
    }

    if (status === 'success' && userId) {
        const totalPayout = parseFloat(reward); 
        const userShareInUSD = totalPayout * 0.40; 
        const cryptoAmountToSend = (userShareInUSD / TRX_PRICE_USD).toFixed(6);

        try {
            const faucetpayResponse = await axios.post('https://faucetpay.io/api/v1/send', {
                api_key: FAUCETPAY_API_KEY,
                amount: cryptoAmountToSend,
                to: userId, 
                currency: CRYPTO_CURRENCY,
                referral: "false"
            });

            if (faucetpayResponse.data.status === 200) {
                return res.send("1"); 
            } else {
                return res.send("0");
            }
        } catch (err) {
            return res.send("0");
        }
    }
    res.send("0");
});

// İNSANLARIN SAYTA DAXİL OLANDA GÖRƏCƏYİ EKRAN
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="az">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CryptoTask - Yatırımsız Qazan</title>
        <style>
            body { font-family: monospace; background: #0a0a0a; color: #00ff00; padding: 20px; text-align: center; }
            .container { border: 1px solid #00ff00; padding: 20px; max-width: 600px; margin: 0 auto; background: #111; box-shadow: 0 0 15px #00ff00; }
            input, button { background: #000; color: #00ff00; border: 1px solid #00ff00; padding: 12px; margin: 10px; font-family: monospace; font-size: 16px; }
            button:hover { background: #00ff00; color: #000; cursor: pointer; font-weight: bold; }
            iframe { width: 100%; height: 600px; border: 1px solid #00ff00; margin-top: 20px; }
            .alert { color: yellow; font-size: 14px; margin-top: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>[ CRYPTOTASK AUTOMATION v1.0 ]</h1>
            <p>Saniyələr içində Tron (TRX) qazan. Yatırımsız və limitsiz!</p>
            
            <div style="border-bottom: 1px dashed #00ff00; padding-bottom: 20px;">
                <h3>Sistemə Giriş Edin</h3>
                <input type="text" id="userInput" placeholder="FaucetPay Email ünvanınız" style="width: 80%;">
                <br>
                <button onclick="startEarning()">Tapşırıqları Aktiv Et</button>
                <p class="alert">⚠️ Diqqət: Pulun avtomatik gəlməsi üçün FaucetPay e-mailinizi yazmalısınız!</p>
            </div>

            <div id="wall" style="display:none; margin-top: 20px;">
                <h3>👇 Aşağıdakı tapşırıqları et, pul anında cüzdanına uçsun!</h3>
                <iframe id="offerframe" src=""></iframe>
            </div>
        </div>

        <script>
            function startEarning() {
                const user = document.getElementById("userInput").value;
                if(!user || !user.includes("@")) {
                    alert("Zəhmət olmasa düzgün FaucetPay e-mail ünvanı daxil edin!");
                    return;
                }
                const baseIframe = "${CPALEAD_IFRAME_URL}";
                document.getElementById("offerframe").src = baseIframe + "&subid=" + encodeURIComponent(user);
                document.getElementById("wall").style.display = "block";
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server aktivdir: ${PORT}`));
