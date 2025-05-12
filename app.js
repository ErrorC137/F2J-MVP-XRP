// Configuration
const XUMM_API_KEY = 'YOUR_XUMM_API_KEY';
const ISSUER_ADDRESS = 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe';
let xumm = new Xumm(XUMM_API_KEY);

// State Management
let client;
let wallet;
let isConnected = false;
let leaderboardInterval;

// Core Functions
async function initXRPL() {
    try {
        client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
        await client.connect();
        console.log('Connected to XRPL Testnet');
    } catch (error) {
        showGlobalError(`Connection failed: ${error.message}`);
    }
}

// Wallet Connection
window.connectWallet = async () => {
    try {
        const { signed } = await xumm.signIn();
        wallet = signed.account;
        isConnected = true;
        updateUI();
        startLeaderboardUpdates();
    } catch (error) {
        showGlobalError(`Wallet connection failed: ${error.message}`);
    }
};

// Proof Handling
document.getElementById('proofFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
        document.getElementById('previewImage').src = event.target.result;
        document.getElementById('previewContainer').classList.remove('hidden');
    };
    
    file && reader.readAsDataURL(file);
});

// Transaction Handling
async function prepareTransaction(tx, isIssuer = false) {
    const prepared = await client.autofill(tx);
    
    if (isIssuer) {
        // Server-side signing for issuer transactions
        const response = await fetch('/.netlify/functions/signTx', {
            method: 'POST',
            body: JSON.stringify(prepared)
        });
        return await response.json();
    }
    
    return xumm.sign(prepared);
}

// Marketplace Functions
async function loadMarketOffers() {
    try {
        const response = await client.request({
            command: 'book_offers',
            taker_gets: { currency: 'F2J', issuer: ISSUER_ADDRESS },
            taker_pays: 'XRP'
        });

        const offers = response.result.offers.map(offer => ({
            id: offer.seq,
            amount: offer.TakerGets.value,
            price: (offer.TakerPays / 1000000).toFixed(4)
        }));

        const marketplace = document.getElementById('marketplace');
        marketplace.innerHTML = offers.map(offer => `
            <div class="offer-card">
                <div class="offer-amount">${offer.amount} F2J</div>
                <div class="offer-price">${offer.price} XRP</div>
                <button class="primary-btn" onclick="acceptOffer('${offer.id}')">Buy</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Marketplace error:', error);
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initXRPL();
    setupEventListeners();
});
