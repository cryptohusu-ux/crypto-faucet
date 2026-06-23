// =================================================================
// ⚙️ SƏNİN FAUCETPAY MƏLUMATIN
// =================================================================
const FAUCETPAY_API_KEY = "6f4285bc6a6a40a0d2dcb8b70cf575be1f05ce8535974aed731cba3df4fbfd93"; 
// =================================================================

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const CRYPTO_CURRENCY = "TRX"; // Göndəriləcək kripto valyuta (Tron)
const AMOUNT_TO_SEND = "0.01";  // Hər düyməyə basanda istifadəçiyə gedəcək TRX miqdarı

// PUL GÖNDƏRMƏ API-Sİ
app.post('/api/claim', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.json({ success: false, message: "E-mail qeyd edilməyib!" });
    }

    try {
        const faucetpayResponse = await axios.post('https://faucetpay.io/api/v1/send', {
            api_key: FAUCETPAY_API_KEY,
            amount: AMOUNT_TO_SEND,
            to: userId, 
            currency: CRYPTO_CURRENCY,
            referral: "false"
        });

        if (faucetpayResponse.data.status === 200) {
            return res.json({ success: true, message: `Uğurlu! ${AMOUNT_TO_SEND} TRX cüzdanınıza göndərildi.` });
        } else {
            return res.json({ success: false, message: "Kran balansında yetərli pul yoxdur və ya API səhvdir." });
        }
    } catch (err) {
        return res.json({ success: false, message: "Sistem xətası baş verdi." });
    }
});

// SAYTIN GÖRÜNÜŞÜ (FRONTEND)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="az">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crypto Faucet - Pulsuz TRX</title>
        <style>
            body { font-family: monospace; background: #0a0a0a; color: #00ff00; padding: 20px; text-align: center; }
            .container { border: 1px solid #00ff00; padding: 20px; max-width: 500px; margin: 50px auto; background: #111; box-shadow: 0 0 15px #00ff00; }
            input, button { background: #000; color: #00ff00; border: 1px solid #00ff00; padding: 12px; margin: 10px; font-family: monospace; font-size: 16px; width: 80%; }
            button:hover { background: #00ff00; color: #000; cursor: pointer; font-weight: bold; }
            #message { margin-top: 15px; color: yellow; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>[ FREE TRX FAUCET ]</h1>
            <p>FaucetPay e-mailinizi yazın və anında pulsuz Tron qazanın!</p>
            <input type="text" id="userInput" placeholder="FaucetPay Email ünvanınız">
            <br>
            <button onclick="claimCrypto()">Kriptonu Al (Claim)</button>
            <div id="message"></div>
        </div>

        <script>
            async function claimCrypto() {
                const user = document.getElementById("userInput").value;
                const msgDiv = document.getElementById("message");
                if(!user || !user.includes("@")) {
                    alert("Düzgün FaucetPay e-mail ünvanı yazın!");
                    return;
                }
                msgDiv.innerText = "Gözləyin, sorğu göndərilir...";
                
                const res = await fetch('/api/claim', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user })
                });
                const data = await res.json();
                msgDiv.innerText = data.message;
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Kran aktivdir!`));
