/* =================== STOCK DATA =================== */
const STOCKS = [
    { id: 'AAPL', name: 'Apple Inc.', price: 175.50 },
    { id: 'MSFT', name: 'Microsoft Corp.', price: 320.20 },
    { id: 'GOOGL', name: 'Alphabet Inc.', price: 140.80 },
    { id: 'AMZN', name: 'Amazon.com Inc.', price: 135.60 },
    { id: 'TSLA', name: 'Tesla Inc.', price: 240.30 },
    { id: 'META', name: 'Meta Platforms', price: 340.20 },
    { id: 'NFLX', name: 'Netflix Inc.', price: 450.10 },
    { id: 'NVDA', name: 'NVIDIA Corp.', price: 500.40 },
    { id: 'INTC', name: 'Intel Corp.', price: 45.30 },
    { id: 'AMD', name: 'AMD Inc.', price: 120.70 },
    { id: 'IBM', name: 'IBM Corp.', price: 155.50 },
    { id: 'ORCL', name: 'Oracle Corp.', price: 110.20 },
    { id: 'CRM', name: 'Salesforce Inc.', price: 220.80 },
    { id: 'ADBE', name: 'Adobe Inc.', price: 480.60 },
    { id: 'CSCO', name: 'Cisco Systems', price: 52.40 },
    { id: 'QCOM', name: 'Qualcomm Inc.', price: 135.80 },
    { id: 'TXN', name: 'Texas Instruments', price: 165.30 },
    { id: 'AVGO', name: 'Broadcom Inc.', price: 600.20 },
    { id: 'MU', name: 'Micron Tech', price: 75.60 },
    { id: 'PYPL', name: 'PayPal Holdings', price: 62.40 },
    { id: 'SHOP', name: 'Shopify Inc.', price: 65.30 },
    { id: 'SPOT', name: 'Spotify Tech', price: 190.20 },
    { id: 'UBER', name: 'Uber Technologies', price: 62.80 },
    { id: 'ABNB', name: 'Airbnb Inc.', price: 130.50 },
    { id: 'ZM', name: 'Zoom Comm.', price: 70.20 },
    { id: 'SNAP', name: 'Snap Inc.', price: 12.30 },
    { id: 'PINS', name: 'Pinterest Inc.', price: 25.60 },
    { id: 'HOOD', name: 'Robinhood Markets', price: 10.40 },
    { id: 'COIN', name: 'Coinbase Global', price: 80.70 },
    { id: 'SQ', name: 'Block Inc.', price: 55.20 },
    { id: 'PLTR', name: 'Palantir Tech', price: 18.60 },
    { id: 'SNOW', name: 'Snowflake Inc.', price: 120.30 },
    { id: 'DDOG', name: 'Datadog Inc.', price: 90.40 },
    { id: 'NET', name: 'Cloudflare Inc.', price: 65.20 },
    { id: 'TWLO', name: 'Twilio Inc.', price: 60.80 },
    { id: 'ZS', name: 'Zscaler Inc.', price: 150.30 },
    { id: 'CRWD', name: 'CrowdStrike', price: 180.60 },
    { id: 'WDAY', name: 'Workday Inc.', price: 220.50 },
    { id: 'NOW', name: 'ServiceNow', price: 620.30 },
    { id: 'TEAM', name: 'Atlassian Corp.', price: 180.20 },
    { id: 'DOCU', name: 'DocuSign Inc.', price: 52.40 },
    { id: 'MRNA', name: 'Moderna Inc.', price: 110.30 },
    { id: 'PFE', name: 'Pfizer Inc.', price: 38.60 },
    { id: 'JNJ', name: 'Johnson & Johnson', price: 155.20 },
    { id: 'DIS', name: 'Walt Disney Co.', price: 95.30 },
    { id: 'BA', name: 'Boeing Co.', price: 210.50 },
    { id: 'KO', name: 'Coca-Cola Co.', price: 60.20 },
    { id: 'PEP', name: 'PepsiCo Inc.', price: 170.30 },
    { id: 'WMT', name: 'Walmart Inc.', price: 55.40 },
    { id: 'T', name: 'AT&T Inc.', price: 17.60 }
];

const BANKS = [
    { id: 'JPM', name: 'JPMorgan Chase', price: 155.30 },
    { id: 'BAC', name: 'Bank of America', price: 32.40 },
    { id: 'WFC', name: 'Wells Fargo', price: 48.50 },
    { id: 'C', name: 'Citigroup', price: 55.60 },
    { id: 'GS', name: 'Goldman Sachs', price: 320.70 }
];

const ALL_STOCKS = [];
STOCKS.forEach(s => ALL_STOCKS.push({ ...s, type: 'stock' }));
BANKS.forEach(b => ALL_STOCKS.push({ ...b, type: 'bank' }));

// Initialize price history
function initHistory() {
    const now = Date.now();
    ALL_STOCKS.forEach(stock => {
        stock.history = [];
        let price = stock.price * (1 + (Math.random() - 0.5) * 0.1);
        for (let i = 30; i >= 0; i--) {
            stock.history.push({
                time: new Date(now - i * 60000),
                price: Math.max(0.01, price)
            });
            price = price * (1 + (Math.random() - 0.5) * 0.015);
        }
        stock.history[stock.history.length - 1].price = stock.price;
        stock.prevPrice = stock.price;
    });
}
initHistory();

/* =================== USER MANAGEMENT =================== */
const USERS_KEY = 'smg_users';
const CURRENT_USER_KEY = 'smg_current_user';

function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

function getCurrentUser() {
    const userId = localStorage.getItem(CURRENT_USER_KEY);
    if (!userId) return null;
    const users = getUsers();
    return users.find(u => u.id === userId) || null;
}

function updateCurrentUser(user) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
        users[idx] = user;
        saveUsers(users);
    }
    localStorage.setItem(CURRENT_USER_KEY, user.id);
}

function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'index.html';
}

/* =================== UI HELPERS =================== */
function getStockById(id) {
    return ALL_STOCKS.find(s => s.id === id);
}

function getStockColor(ticker) {
    const colors = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316', '#14b8a6', '#eab308'];
    let hash = 0;
    for (let i = 0; i < ticker.length; i++) {
        hash = ticker.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    const toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = msg;
    toast.className = 'toast show' + (type === 'error' ? ' error' : '');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* =================== PRICE UPDATE =================== */
let timerInterval = null;

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    let seconds = 120;
    const timerEl = document.getElementById('countdown');
    if (!timerEl) return;

    timerInterval = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
            updatePrices();
            seconds = 120;
        }
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerEl.textContent = `${mins}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

function updatePrices() {
    const now = Date.now();
    ALL_STOCKS.forEach(stock => {
        const change = (Math.random() - 0.5) * 0.04;
        stock.price = Math.max(0.01, stock.price * (1 + change));
        stock.history.push({ time: new Date(now), price: stock.price });
        if (stock.history.length > 100) {
            stock.history.shift();
        }
    });

    // Refresh UI based on current page
    if (document.getElementById('stockList')) renderStockList();
    if (document.getElementById('stockChart')) {
        const ticker = new URLSearchParams(window.location.search).get('ticker');
        if (ticker) renderStockDetail(ticker);
    }
    if (document.getElementById('searchResultsList')) {
        const query = new URLSearchParams(window.location.search).get('query') || '';
        renderSearchResults(query);
    }
    if (document.getElementById('portfolioList')) updatePortfolioUI();
    if (document.getElementById('headerCoins')) {
        const user = getCurrentUser();
        if (user) {
            document.getElementById('headerCoins').textContent = user.coins.toLocaleString();
            document.getElementById('portfolioCoins') && (document.getElementById('portfolioCoins').textContent = user.coins.toLocaleString());
        }
    }

    showToast('Prices updated!');
}

/* =================== LOGIN / REGISTER =================== */
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.querySelector('.tab-btns button:first-child').classList.add('active');
    document.querySelector('.tab-btns button:last-child').classList.remove('active');
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.querySelector('.tab-btns button:first-child').classList.remove('active');
    document.querySelector('.tab-btns button:last-child').classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        showToast('Invalid email or password', 'error');
        return;
    }
    localStorage.setItem(CURRENT_USER_KEY, user.id);
    window.location.href = 'home.html';
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const users = getUsers();
    if (users.find(u => u.email === email)) {
        showToast('Email already registered', 'error');
        return;
    }
    const user = {
        id: 'u_' + Date.now(),
        name,
        email,
        password,
        coins: 20000,
        portfolio: {}
    };
    users.push(user);
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, user.id);
    window.location.href = 'home.html';
}

/* =================== HOME PAGE =================== */
let currentFilter = 'all';
let selectedStockId = null;
let stockChart = null;

function renderStockList(filteredList) {
    const listEl = document.getElementById('stockList');
    if (!listEl) return;

    const stocksToShow = filteredList || ALL_STOCKS.filter(s => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'stock') return s.type === 'stock';
        if (currentFilter === 'bank') return s.type === 'bank';
        return true;
    });

    listEl.innerHTML = '';
    stocksToShow.forEach(stock => {
        const changePct = ((stock.price - stock.history[0].price) / stock.history[0].price * 100).toFixed(2);
        const changeClass = changePct >= 0 ? 'up' : 'down';
        const changeArrow = changePct >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
        const color = getStockColor(stock.id);

        const item = document.createElement('div');
        item.className = 'stock-item' + (stock.id === selectedStockId ? ' selected' : '');
        item.innerHTML = `
            <div class="stock-icon" style="background:${color};${stock.type==='bank'?'border-radius:50%;':''}">
                ${stock.type==='bank'?'<i class="fas fa-building-columns" style="font-size:14px;"></i>':stock.id.slice(0,4)}
            </div>
            <div class="stock-info">
                <div class="stock-name">${stock.name}</div>
                <div class="stock-ticker">${stock.id} · ${stock.type.toUpperCase()}</div>
            </div>
            <div class="stock-price-info">
                <div class="price">$${stock.price.toFixed(2)}</div>
                <div class="change ${changeClass}"><i class="${changeArrow}"></i> ${Math.abs(changePct)}%</div>
            </div>
        `;
        item.onclick = () => {
            window.location.href = `stock.html?ticker=${stock.id}`;
        };
        listEl.appendChild(item);
    });
}

function setFilter(filter) {
    currentFilter = filter;
    const tabs = document.querySelectorAll('.filter-tabs button');
    tabs.forEach((tab, i) => {
        tab.classList.remove('active');
        if (i === 0 && filter === 'all') tab.classList.add('active');
        if (i === 1 && filter === 'stock') tab.classList.add('active');
        if (i === 2 && filter === 'bank') tab.classList.add('active');
    });
    renderStockList();
}

function handleSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderStockList();
        return;
    }
    const filtered = ALL_STOCKS.filter(s =>
        s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    );
    renderStockList(filtered);
}

function updateHeaderCoins() {
    const user = getCurrentUser();
    if (!user) return;
    document.getElementById('headerCoins').textContent = user.coins.toLocaleString();
    document.getElementById('portfolioCoins') && (document.getElementById('portfolioCoins').textContent = user.coins.toLocaleString());
}

function updatePortfolioUI() {
    const user = getCurrentUser();
    const listEl = document.getElementById('portfolioList');
    if (!user || !listEl) return;

    const portfolio = user.portfolio;
    const entries = Object.entries(portfolio);

    if (entries.length === 0) {
        listEl.innerHTML = `
            <div class="empty-portfolio">
                <i class="fas fa-chart-pie"></i>
                <p>No stocks owned yet</p>
            </div>
        `;
        return;
    }

    listEl.innerHTML = '';
    entries.forEach(([stockId, pItem]) => {
        const stock = getStockById(stockId);
        if (!stock) return;
        const value = stock.price * pItem.shares;
        const profit = (stock.price - pItem.avgBuyPrice) * pItem.shares;
        const profitClass = profit >= 0 ? 'up' : 'down';

        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.innerHTML = `
            <div class="p-stock">
                <span class="p-symbol">${stockId}</span>
                <span class="p-shares">${pItem.shares} shares</span>
            </div>
            <div class="p-value">$${value.toFixed(2)}</div>
            <div style="font-size:12px;color:${profitClass==='up'?'#10b981':'#ef4444'};">
                ${profit >= 0 ? '▲' : '▼'} $${Math.abs(profit).toFixed(2)}
            </div>
        `;
        item.onclick = () => {
            window.location.href = `stock.html?ticker=${stockId}`;
        };
        listEl.appendChild(item);
    });

    document.getElementById('headerCoins').textContent = user.coins.toLocaleString();
    document.getElementById('portfolioCoins') && (document.getElementById('portfolioCoins').textContent = user.coins.toLocaleString());
}

/* =================== STOCK DETAIL =================== */
function renderStockDetail(ticker) {
    const stock = getStockById(ticker);
    if (!stock) {
        document.getElementById('detailContainer').innerHTML = '<p style="text-align:center;padding:50px;">Stock not found</p>';
        return;
    }

    const changePct = ((stock.price - stock.history[0].price) / stock.history[0].price * 100).toFixed(2);
    const changeClass = changePct >= 0 ? 'up' : 'down';
    const color = getStockColor(stock.id);

    document.getElementById('detailContainer').innerHTML = `
        <div class="detail-header">
            <div class="stock-icon" style="background:${color};${stock.type==='bank'?'border-radius:50%;':''}">
                ${stock.type==='bank'?'<i class="fas fa-building-columns" style="font-size:20px;"></i>':stock.id.slice(0,4)}
            </div>
            <div class="detail-header-info">
                <h2>${stock.name}</h2>
                <div class="ticker">${stock.id} · ${stock.type.toUpperCase()}</div>
            </div>
            <div class="detail-price">$${stock.price.toFixed(2)}
                <div class="change ${changeClass}">${changePct >= 0 ? '▲' : '▼'} ${Math.abs(changePct)}%</div>
            </div>
        </div>
        <div class="chart-container">
            <canvas id="stockChart"></canvas>
        </div>
        <div class="buy-sell-section">
            <h3><i class="fas fa-exchange-alt"></i> Trade</h3>
            <div class="trade-form">
                <input type="number" id="tradeShares" min="1" value="1" placeholder="Shares">
                <button class="buy-btn" onclick="buyStock()"><i class="fas fa-cart-plus"></i> Buy</button>
                <button class="sell-btn" onclick="sellStock()"><i class="fas fa-cart-arrow-down"></i> Sell</button>
            </div>
        </div>
    `;

    // Attempt to create chart, but handle if Chart.js fails to load
    try {
        if (typeof Chart === 'undefined') {
            throw new Error('Chart.js not loaded');
        }

        if (stockChart) stockChart.destroy();
        const ctx = document.getElementById('stockChart').getContext('2d');
        const history = stock.history;
        const labels = history.map(h => {
            const d = new Date(h.time);
            return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
        });
        const prices = history.map(h => h.price);
        const isUp = prices[prices.length - 1] >= prices[0];

        stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: stock.id,
                    data: prices,
                    borderColor: isUp ? '#10b981' : '#ef4444',
                    backgroundColor: isUp ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: isUp ? '#10b981' : '#ef4444',
                    pointHoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: (ctx) => '$' + ctx.parsed.y.toFixed(2)
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: { display: false },
                        ticks: { color: '#8a93a6', maxRotation: 45, maxTicksLimit: 10 }
                    },
                    y: {
                        display: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: {
                            color: '#8a93a6',
                            callback: (value) => '$' + value.toFixed(2)
                        }
                    }
                }
            }
        });
    } catch (err) {
        console.warn('Chart could not be created:', err.message);
        // Show a fallback message instead of broken chart
        const chartBox = document.getElementById('stockChart');
        if (chartBox) {
            chartBox.parentElement.innerHTML = '<p style="text-align:center; padding:80px; color:#8a93a6;">📈 Chart unavailable (offline or Chart.js not loaded)</p>';
        }
    }
}

function buyStock() {
    const ticker = new URLSearchParams(window.location.search).get('ticker');
    if (!ticker) return;
    const stock = getStockById(ticker);
    const sharesInput = document.getElementById('tradeShares');
    const shares = parseInt(sharesInput.value) || 0;
    if (shares <= 0) { showToast('Invalid shares', 'error'); return; }

    const user = getCurrentUser();
    if (!user) return;

    const cost = stock.price * shares;
    if (user.coins < cost) {
        showToast('Insufficient coins!', 'error');
        return;
    }

    user.coins -= cost;
    if (!user.portfolio[stock.id]) {
        user.portfolio[stock.id] = { shares: 0, avgBuyPrice: 0 };
    }
    const pItem = user.portfolio[stock.id];
    const totalCost = pItem.avgBuyPrice * pItem.shares + cost;
    pItem.shares += shares;
    pItem.avgBuyPrice = totalCost / pItem.shares;

    updateCurrentUser(user);
    updateHeaderCoins();
    showToast(`Bought ${shares} ${stock.id} shares for $${cost.toFixed(2)}`);
}

function sellStock() {
    const ticker = new URLSearchParams(window.location.search).get('ticker');
    if (!ticker) return;
    const stock = getStockById(ticker);
    const sharesInput = document.getElementById('tradeShares');
    const shares = parseInt(sharesInput.value) || 0;
    if (shares <= 0) { showToast('Invalid shares', 'error'); return; }

    const user = getCurrentUser();
    if (!user) return;

    const pItem = user.portfolio[stock.id];
    if (!pItem || pItem.shares < shares) {
        showToast('Not enough shares!', 'error');
        return;
    }

    const revenue = stock.price * shares;
    user.coins += revenue;
    pItem.shares -= shares;
    if (pItem.shares === 0) {
        delete user.portfolio[stock.id];
    }

    updateCurrentUser(user);
    updateHeaderCoins();
    showToast(`Sold ${shares} ${stock.id} shares for $${revenue.toFixed(2)}`);
}

/* =================== SEARCH PAGE =================== */
function renderSearchResults(query) {
    const listEl = document.getElementById('searchResultsList');
    if (!listEl) return;

    const q = (query || '').toLowerCase().trim();
    const filtered = ALL_STOCKS.filter(s =>
        s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    );

    // Update the displayed query
    const display = document.getElementById('searchQueryDisplay');
    if (display) {
        display.textContent = q || 'all';
    }

    listEl.innerHTML = '';
    if (filtered.length === 0) {
        listEl.innerHTML = '<p style="color:#8a93a6;">No results found</p>';
        return;
    }

    filtered.forEach(stock => {
        const card = document.createElement('div');
        card.className = 'search-result-card';
        card.innerHTML = `
            <div class="stock-icon" style="background:${getStockColor(stock.id)};margin-bottom:10px;">
                ${stock.type==='bank'?'<i class="fas fa-building-columns"></i>':stock.id.slice(0,4)}
            </div>
            <div style="font-size:16px;font-weight:700;color:#fff;">${stock.name}</div>
            <div style="font-size:13px;color:#8a93a6;">${stock.id} · ${stock.type.toUpperCase()}</div>
            <div style="font-size:15px;font-weight:700;color:#10b981;margin-top:8px;">$${stock.price.toFixed(2)}</div>
        `;
        card.onclick = () => {
            window.location.href = `stock.html?ticker=${stock.id}`;
        };
        listEl.appendChild(card);
    });
}

/* =================== ACCOUNT PAGE =================== */
function renderAccount() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('accountName').textContent = user.name;
    document.getElementById('accountEmail').textContent = user.email;
    document.getElementById('accountCoins').textContent = user.coins.toLocaleString();
    document.getElementById('accountPortfolioCount').textContent = Object.keys(user.portfolio).length;

    const portfolioList = document.getElementById('accountPortfolioList');
    if (!portfolioList) return;

    portfolioList.innerHTML = '';
    const entries = Object.entries(user.portfolio);
    if (entries.length === 0) {
        portfolioList.innerHTML = '<p style="color:#8a93a6;">No stocks owned yet</p>';
        return;
    }

    entries.forEach(([stockId, pItem]) => {
        const stock = getStockById(stockId);
        if (!stock) return;
        const value = stock.price * pItem.shares;
        portfolioList.innerHTML += `
            <div class="portfolio-item" onclick="window.location.href='stock.html?ticker=${stockId}'">
                <div class="p-stock">
                    <span class="p-symbol">${stockId}</span>
                    <span class="p-shares">${pItem.shares} shares</span>
                </div>
                <div class="p-value">$${value.toFixed(2)}</div>
            </div>
        `;
    });
}

/* =================== INITIALIZE PER PAGE =================== */
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();

    // For all pages except index.html, ensure user is logged in
    if (currentPath !== 'index.html') {
        const user = getCurrentUser();
        if (!user) {
            window.location.href = 'index.html';
            return;
        }

        // Update header coins & name
        const headerCoins = document.getElementById('headerCoins');
        const headerUserName = document.getElementById('headerUserName');
        const portfolioCoins = document.getElementById('portfolioCoins');
        if (headerCoins) headerCoins.textContent = user.coins.toLocaleString();
        if (headerUserName) headerUserName.textContent = user.name.split(' ')[0];
        if (portfolioCoins) portfolioCoins.textContent = user.coins.toLocaleString();

        // Start timer if countdown element exists
        if (document.getElementById('countdown')) startTimer();
    }

    // Login page
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
        document.getElementById('registerForm').addEventListener('submit', handleRegister);
    }

    // Home page
    if (document.getElementById('stockList')) {
        currentFilter = 'all';
        setFilter('all');
        updatePortfolioUI();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
        }
    }

    // Stock detail page
    if (document.getElementById('detailContainer')) {
        const ticker = new URLSearchParams(window.location.search).get('ticker');
        if (ticker) renderStockDetail(ticker);
    }

    // Search page
    if (document.getElementById('searchResultsList')) {
        const query = new URLSearchParams(window.location.search).get('query') || '';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = query;
        }
        renderSearchResults(query);
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const q = e.target.value;
                window.history.replaceState(null, '', `search.html?query=${encodeURIComponent(q)}`);
                renderSearchResults(q);
            });
        }
    }

    // Account page
    if (document.getElementById('accountName')) {
        renderAccount();
    }
});

