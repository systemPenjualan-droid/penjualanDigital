// SISTEM KASIR SEMBAKO UMKM - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // State Management
    const state = {
        cart: [],
        currentProduct: null,
        currentCategory: 'all',
        searchQuery: '',
        discountPercentage: 0,
        taxRate: storeSettings.taxRate || 10,
        transactionNumber: generateTransactionNumber(),
        cashReceived: 0
    };

    // DOM Elements
    const elements = {
        // Header elements
        currentDate: document.getElementById('current-date'),
        currentTime: document.getElementById('current-time'),
        storeName: document.getElementById('store-name'),
        storeAddress: document.getElementById('store-address'),
        storePhone: document.getElementById('store-phone'),
        
        // Product section
        categoryButtons: document.getElementById('category-buttons'),
        productSearch: document.getElementById('product-search'),
        productsGrid: document.getElementById('products-grid'),
        
        // Transaction section
        transactionNumber: document.getElementById('transaction-number'),
        cashierName: document.getElementById('cashier-name'),
        transactionItems: document.getElementById('transaction-items'),
        totalItems: document.getElementById('total-items'),
        subtotal: document.getElementById('subtotal'),
        discountAmount: document.getElementById('discount-amount'),
        taxAmount: document.getElementById('tax-amount'),
        grandTotal: document.getElementById('grand-total'),
        discountInput: document.getElementById('discount-input'),
        discountMinus: document.getElementById('discount-minus'),
        discountPlus: document.getElementById('discount-plus'),
        cashReceived: document.getElementById('cash-received'),
        changeAmount: document.getElementById('change-amount'),
        cartBadge: document.getElementById('cart-badge'),
        
        // Buttons
        btnNewTransaction: document.getElementById('btn-new-transaction'),
        btnPrintReceipt: document.getElementById('btn-print-receipt'),
        btnDailyReport: document.getElementById('btn-daily-report'),
        btnProcessPayment: document.getElementById('btn-process-payment'),
        btnSaveTransaction: document.getElementById('btn-save-transaction'),
        btnCancelTransaction: document.getElementById('btn-cancel-transaction'),
        
        // Modals
        productDetailModal: document.getElementById('product-detail-modal'),
        receiptModal: document.getElementById('receipt-modal'),
        reportModal: document.getElementById('report-modal'),
        settingsModal: document.getElementById('settings-modal'),
        
        // Modal elements
        modalProductName: document.getElementById('modal-product-name'),
        modalProductImage: document.getElementById('modal-product-image'),
        modalProductCode: document.getElementById('modal-product-code'),
        modalProductCategory: document.getElementById('modal-product-category'),
        modalProductStock: document.getElementById('modal-product-stock'),
        modalProductPrice: document.getElementById('modal-product-price'),
        modalProductUnit: document.getElementById('modal-product-unit'),
        modalQuantity: document.getElementById('modal-quantity'),
        modalUnitLabel: document.getElementById('modal-unit-label'),
        btnAddToCartModal: document.getElementById('btn-add-to-cart-modal'),
        
        // Receipt modal
        receiptContent: document.getElementById('receipt-content'),
        btnPrintReceiptModal: document.getElementById('btn-print-receipt-modal'),
        btnSendWhatsApp: document.getElementById('btn-send-whatsapp'),
        
        // Report modal
        reportContent: document.getElementById('report-content'),
        btnExportReport: document.getElementById('btn-export-report'),
        
        // Settings modal
        settingStoreName: document.getElementById('setting-store-name'),
        settingStoreAddress: document.getElementById('setting-store-address'),
        settingStorePhone: document.getElementById('setting-store-phone'),
        settingTaxRate: document.getElementById('setting-tax-rate'),
        settingReceiptFooter: document.getElementById('setting-receipt-footer'),
        btnSaveSettings: document.getElementById('btn-save-settings'),
        
        // Toast
        toast: document.getElementById('toast')
    };

    // Initialize Application
    function init() {
        updateDateTime();
        loadCategories();
        loadProducts();
        setupEventListeners();
        updateTransactionDisplay();
        loadStoreSettings();
        
        // Update transaction number every minute
        setInterval(updateDateTime, 1000);
        setInterval(updateTransactionNumber, 60000);
    }

    // Update Date and Time
    function updateDateTime() {
        const now = new Date();
        
        // Format date: Senin, 1 Januari 2024
        const optionsDate = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        elements.currentDate.textContent = now.toLocaleDateString('id-ID', optionsDate);
        
        // Format time: 00:00:00
        const time = now.toLocaleTimeString('id-ID', { hour12: false });
        elements.currentTime.textContent = time;
    }

    // Generate Transaction Number
    function generateTransactionNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const random = String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
        
        return `TRX-${year}${month}${day}-${random}`;
    }

    function updateTransactionNumber() {
        state.transactionNumber = generateTransactionNumber();
        elements.transactionNumber.textContent = state.transactionNumber;
    }

    // Load Store Settings
    function loadStoreSettings() {
        elements.storeName.textContent = storeSettings.storeName;
        elements.storeAddress.textContent = storeSettings.storeAddress;
        elements.storePhone.textContent = storeSettings.storePhone;
        state.taxRate = storeSettings.taxRate;
        
        // Update settings modal values
        elements.settingStoreName.value = storeSettings.storeName;
        elements.settingStoreAddress.value = storeSettings.storeAddress;
        elements.settingStorePhone.value = storeSettings.storePhone;
        elements.settingTaxRate.value = storeSettings.taxRate;
        elements.settingReceiptFooter.value = storeSettings.receiptFooter;
    }

    // Load Categories
    function loadCategories() {
        elements.categoryButtons.innerHTML = '';
        
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = `category-btn ${category.id === state.currentCategory ? 'active' : ''}`;
            button.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
            button.dataset.category = category.id;
            
            button.addEventListener('click', () => {
                // Update active category
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter products
                state.currentCategory = category.id;
                loadProducts();
            });
            
            elements.categoryButtons.appendChild(button);
        });
    }

    // Load Products
    function loadProducts() {
        elements.productsGrid.innerHTML = '';
        
        let filteredProducts = sembakoProducts;
        
        // Filter by category
        if (state.currentCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === state.currentCategory
            );
        }
        
        // Filter by search query
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.id.toLowerCase().includes(query)
            );
        }
        
        // Sort by stock (low stock first)
        filteredProducts.sort((a, b) => a.stock - b.stock);
        
        // Create product cards
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            elements.productsGrid.appendChild(productCard);
        });
        
        // Show message if no products found
        if (filteredProducts.length === 0) {
            elements.productsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>Tidak ada produk ditemukan</p>
                </div>
            `;
        }
    }

    // Create Product Card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;
        
        // Stock warning class
        const stockClass = product.stock < 20 ? 'low-stock' : '';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h4 class="product-name">${product.name}</h4>
            <div class="product-price">${formatCurrency(product.price)}/${product.unit}</div>
            <div class="product-stock ${stockClass}">Stok: ${product.stock} ${product.unit}</div>
        `;
        
        card.addEventListener('click', () => {
            openProductDetail(product);
        });
        
        return card;
    }

    // Open Product Detail Modal
    function openProductDetail(product) {
        state.currentProduct = product;
        
        elements.modalProductName.textContent = product.name;
        elements.modalProductImage.src = product.image;
        elements.modalProductImage.alt = product.name;
        elements.modalProductCode.textContent = product.id;
        elements.modalProductCategory.textContent = product.category;
        elements.modalProductStock.textContent = `${product.stock} ${product.unit}`;
        elements.modalProductPrice.textContent = formatCurrency(product.price);
        elements.modalProductUnit.textContent = product.unit;
        elements.modalQuantity.value = 1;
        elements.modalUnitLabel.textContent = product.unit;
        
        openModal(elements.productDetailModal);
    }

    // Add Product to Cart
    function addToCart(product, quantity = 1) {
        // Check if product already in cart
        const existingItem = state.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            // Check stock availability
            if (existingItem.quantity + quantity > product.stock) {
                showToast(`Stok ${product.name} tidak cukup! Stok tersedia: ${product.stock}`, 'error');
                return false;
            }
            existingItem.quantity += quantity;
        } else {
            // Check stock availability
            if (quantity > product.stock) {
                showToast(`Stok ${product.name} tidak cukup! Stok tersedia: ${product.stock}`, 'error');
                return false;
            }
            
            state.cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        updateTransactionDisplay();
        showToast(`${product.name} ditambahkan ke keranjang`, 'success');
        return true;
    }

    // Update Cart Item Quantity
    function updateCartItemQuantity(productId, newQuantity) {
        const item = state.cart.find(item => item.id === productId);
        if (!item) return;
        
        // Check stock availability
        const product = sembakoProducts.find(p => p.id === productId);
        if (newQuantity > product.stock) {
            showToast(`Stok ${product.name} tidak cukup! Stok tersedia: ${product.stock}`, 'error');
            return;
        }
        
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        
        item.quantity = newQuantity;
        updateTransactionDisplay();
    }

    // Remove Item from Cart
    function removeFromCart(productId) {
        state.cart = state.cart.filter(item => item.id !== productId);
        updateTransactionDisplay();
        showToast('Item dihapus dari keranjang', 'success');
    }

    // Clear Cart
    function clearCart() {
        if (state.cart.length === 0) return;
        
        if (confirm('Apakah Anda yakin ingin menghapus semua item dari transaksi?')) {
            state.cart = [];
            state.discountPercentage = 0;
            elements.discountInput.value = 0;
            elements.cashReceived.value = '';
            state.cashReceived = 0;
            updateTransactionDisplay();
            showToast('Transaksi dibersihkan', 'success');
        }
    }

    // Calculate Transaction Totals
    function calculateTotals() {
        const subtotal = state.cart.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);
        
        const discount = subtotal * (state.discountPercentage / 100);
        const afterDiscount = subtotal - discount;
        const tax = afterDiscount * (state.taxRate / 100);
        const total = afterDiscount + tax;
        
        return { subtotal, discount, tax, total };
    }

    // Update Transaction Display
    function updateTransactionDisplay() {
        const totals = calculateTotals();
        
        // Update cart badge
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        elements.cartBadge.textContent = totalItems;
        
        // Update transaction items
        elements.transactionItems.innerHTML = '';
        
        if (state.cart.length === 0) {
            elements.transactionItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Belum ada barang di keranjang</p>
                    <small>Pilih produk dari daftar sebelah kiri</small>
                </div>
            `;
        } else {
            state.cart.forEach(item => {
                const itemElement = createTransactionItem(item);
                elements.transactionItems.appendChild(itemElement);
            });
        }
        
        // Update summary
        elements.totalItems.textContent = totalItems;
        elements.subtotal.textContent = formatCurrency(totals.subtotal);
        elements.discountAmount.textContent = formatCurrency(totals.discount);
        elements.taxAmount.textContent = formatCurrency(totals.tax);
        elements.grandTotal.textContent = formatCurrency(totals.total);
        
        // Update discount input
        elements.discountInput.value = state.discountPercentage;
        
        // Calculate and update change
        calculateChange();
    }

    // Create Transaction Item Element
    function createTransactionItem(item) {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        div.dataset.id = item.id;
        
        div.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-details">${item.id} • ${item.unit}</div>
            </div>
            <div class="item-quantity">
                <button class="qty-btn minus" data-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" max="${item.stock}" data-id="${item.id}">
                <button class="qty-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="item-price">${formatCurrency(item.price)}</div>
            <div class="item-total">${formatCurrency(item.price * item.quantity)}</div>
            <div class="item-action">
                <button class="btn-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Add event listeners
        const minusBtn = div.querySelector('.minus');
        const plusBtn = div.querySelector('.plus');
        const quantityInput = div.querySelector('input[type="number"]');
        const removeBtn = div.querySelector('.btn-remove');
        
        minusBtn.addEventListener('click', () => {
            updateCartItemQuantity(item.id, item.quantity - 1);
        });
        
        plusBtn.addEventListener('click', () => {
            updateCartItemQuantity(item.id, item.quantity + 1);
        });
        
        quantityInput.addEventListener('change', (e) => {
            const newQuantity = parseInt(e.target.value) || 1;
            updateCartItemQuantity(item.id, newQuantity);
        });
        
        removeBtn.addEventListener('click', () => {
            removeFromCart(item.id);
        });
        
        return div;
    }

    // Calculate Change
    function calculateChange() {
        const totals = calculateTotals();
        const cash = parseFloat(elements.cashReceived.value) || 0;
        state.cashReceived = cash;
        
        const change = cash - totals.total;
        elements.changeAmount.textContent = formatCurrency(Math.max(change, 0));
        
        // Update change color
        if (change < 0) {
            elements.changeAmount.style.color = 'var(--danger-color)';
        } else {
            elements.changeAmount.style.color = 'var(--success-color)';
        }
    }

    // Process Payment
    function processPayment() {
        if (state.cart.length === 0) {
            showToast('Tidak ada item untuk diproses', 'error');
            return;
        }
        
        const totals = calculateTotals();
        const cash = state.cashReceived;
        
        if (cash < totals.total) {
            showToast('Uang yang diterima kurang!', 'error');
            return;
        }
        
        // Create transaction record
        const transaction = {
            id: state.transactionNumber,
            date: new Date().toISOString(),
            items: state.cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            })),
            totals: totals,
            cashReceived: cash,
            change: cash - totals.total,
            discount: state.discountPercentage
        };
        
        // Save transaction
        transactions.push(transaction);
        localStorage.setItem('sembako_transactions', JSON.stringify(transactions));
        
        // Update stock
        updateStockAfterTransaction();
        
        // Show receipt
        showReceipt(transaction);
        
        // Reset for new transaction
        startNewTransaction();
        
        showToast('Pembayaran berhasil diproses!', 'success');
    }

    // Update Stock After Transaction
    function updateStockAfterTransaction() {
        state.cart.forEach(cartItem => {
            const product = sembakoProducts.find(p => p.id === cartItem.id);
            if (product) {
                product.stock -= cartItem.quantity;
            }
        });
        
        // In real app, you would save to backend/database
        // For demo, we just update the local array
        localStorage.setItem('sembako_products', JSON.stringify(sembakoProducts));
    }

    // Start New Transaction
    function startNewTransaction() {
        state.cart = [];
        state.discountPercentage = 0;
        state.cashReceived = 0;
        state.transactionNumber = generateTransactionNumber();
        
        elements.discountInput.value = 0;
        elements.cashReceived.value = '';
        elements.transactionNumber.textContent = state.transactionNumber;
        
        updateTransactionDisplay();
    }

    // Show Receipt
    function showReceipt(transaction) {
        const change = transaction.change;
        const cash = transaction.cashReceived;
        
        let receiptHTML = `
            <div class="receipt-header">
                <h3>${storeSettings.storeName}</h3>
                <p>${storeSettings.storeAddress}</p>
                <p>${storeSettings.storePhone}</p>
                <p>${new Date(transaction.date).toLocaleDateString('id-ID')} ${new Date(transaction.date).toLocaleTimeString('id-ID')}</p>
                <p><strong>No: ${transaction.id}</strong></p>
            </div>
            
            <div class="receipt-items">
        `;
        
        transaction.items.forEach(item => {
            receiptHTML += `
                <div class="receipt-item">
                    <div>
                        <div>${item.name}</div>
                        <small>${item.quantity} x ${formatCurrency(item.price, true)}</small>
                    </div>
                    <div>${formatCurrency(item.total, true)}</div>
                </div>
            `;
        });
        
        receiptHTML += `
            </div>
            
            <div class="receipt-total">
                <div class="receipt-item">
                    <div>Subtotal</div>
                    <div>${formatCurrency(transaction.totals.subtotal, true)}</div>
                </div>
                <div class="receipt-item">
                    <div>Diskon (${transaction.discount}%)</div>
                    <div>${formatCurrency(transaction.totals.discount, true)}</div>
                </div>
                <div class="receipt-item">
                    <div>PPN (${state.taxRate}%)</div>
                    <div>${formatCurrency(transaction.totals.tax, true)}</div>
                </div>
                <div class="receipt-item">
                    <div><strong>TOTAL</strong></div>
                    <div><strong>${formatCurrency(transaction.totals.total, true)}</strong></div>
                </div>
                <div class="receipt-item">
                    <div>TUNAI</div>
                    <div>${formatCurrency(cash, true)}</div>
                </div>
                <div class="receipt-item">
                    <div>KEMBALI</div>
                    <div>${formatCurrency(change, true)}</div>
                </div>
            </div>
            
            <div class="receipt-footer">
                ${storeSettings.receiptFooter.replace(/\n/g, '<br>')}
            </div>
        `;
        
        elements.receiptContent.innerHTML = receiptHTML;
        openModal(elements.receiptModal);
    }

    // Show Daily Report
    function showDailyReport() {
        const today = new Date().toDateString();
        const todayTransactions = transactions.filter(t => 
            new Date(t.date).toDateString() === today
        );
        
        const totalSales = todayTransactions.reduce((sum, t) => sum + t.totals.total, 0);
        const totalTransactions = todayTransactions.length;
        const totalItemsSold = todayTransactions.reduce((sum, t) => 
            sum + t.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
        
        let reportHTML = `
            <div class="report-summary">
                <div class="report-card">
                    <h4>Total Penjualan</h4>
                    <div class="value">${formatCurrency(totalSales)}</div>
                </div>
                <div class="report-card">
                    <h4>Total Transaksi</h4>
                    <div class="value">${totalTransactions}</div>
                </div>
                <div class="report-card">
                    <h4>Item Terjual</h4>
                    <div class="value">${totalItemsSold}</div>
                </div>
            </div>
            
            <h4 style="margin: 20px 0 10px;">Transaksi Hari Ini</h4>
            <table class="report-table">
                <thead>
                    <tr>
                        <th>No. Transaksi</th>
                        <th>Waktu</th>
                        <th>Items</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        todayTransactions.forEach(transaction => {
            reportHTML += `
                <tr>
                    <td>${transaction.id}</td>
                    <td>${new Date(transaction.date).toLocaleTimeString('id-ID')}</td>
                    <td>${transaction.items.length} item</td>
                    <td>${formatCurrency(transaction.totals.total)}</td>
                </tr>
            `;
        });
        
        reportHTML += `
                </tbody>
            </table>
            
            ${todayTransactions.length === 0 ? '<p style="text-align: center; color: #666; padding: 20px;">Belum ada transaksi hari ini</p>' : ''}
        `;
        
        elements.reportContent.innerHTML = reportHTML;
        openModal(elements.reportModal);
    }

    // Export Report to Excel
    function exportReportToExcel() {
        const today = new Date().toDateString();
        const todayTransactions = transactions.filter(t => 
            new Date(t.date).toDateString() === today
        );
        
        if (todayTransactions.length === 0) {
            showToast('Tidak ada data untuk diexport', 'warning');
            return;
        }
        
        let csv = 'No Transaksi,Tanggal,Waktu,Jumlah Item,Total\n';
        
        todayTransactions.forEach(transaction => {
            const date = new Date(transaction.date);
            csv += `"${transaction.id}","${date.toLocaleDateString('id-ID')}","${date.toLocaleTimeString('id-ID')}",${transaction.items.length},"${formatCurrency(transaction.totals.total, true)}"\n`;
        });
        
        // Calculate totals
        const totalSales = todayTransactions.reduce((sum, t) => sum + t.totals.total, 0);
        csv += `\nTotal,,,,"${formatCurrency(totalSales, true)}"`;
        
        // Download CSV
        downloadCSV(csv, `Laporan_${new Date().toISOString().split('T')[0]}.csv`);
        
        showToast('Laporan berhasil diexport', 'success');
    }

    // Save Store Settings
    function saveStoreSettings() {
        storeSettings = {
            storeName: elements.settingStoreName.value,
            storeAddress: elements.settingStoreAddress.value,
            storePhone: elements.settingStorePhone.value,
            taxRate: parseInt(elements.settingTaxRate.value) || 10,
            receiptFooter: elements.settingReceiptFooter.value
        };
        
        // Save to localStorage
        localStorage.setItem('sembako_settings', JSON.stringify(storeSettings));
        
        // Update UI
        loadStoreSettings();
        closeModal(elements.settingsModal);
        
        showToast('Pengaturan berhasil disimpan', 'success');
    }

    // Utility Functions
    function formatCurrency(amount, plain = false) {
        if (plain) {
            return `Rp${amount.toLocaleString('id-ID')}`;
        }
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    function showToast(message, type = 'success') {
        elements.toast.textContent = message;
        elements.toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 3000);
    }

    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Product search
        elements.productSearch.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            loadProducts();
        });
        
        // Discount controls
        elements.discountMinus.addEventListener('click', () => {
            if (state.discountPercentage > 0) {
                state.discountPercentage -= 1;
                elements.discountInput.value = state.discountPercentage;
                updateTransactionDisplay();
            }
        });
        
        elements.discountPlus.addEventListener('click', () => {
            if (state.discountPercentage < 100) {
                state.discountPercentage += 1;
                elements.discountInput.value = state.discountPercentage;
                updateTransactionDisplay();
            }
        });
        
        elements.discountInput.addEventListener('change', (e) => {
            let value = parseInt(e.target.value) || 0;
            if (value < 0) value = 0;
            if (value > 100) value = 100;
            
            state.discountPercentage = value;
            elements.discountInput.value = value;
            updateTransactionDisplay();
        });
        
        // Cash received input
        elements.cashReceived.addEventListener('input', calculateChange);
        
        // Header buttons
        elements.btnNewTransaction.addEventListener('click', startNewTransaction);
        elements.btnPrintReceipt.addEventListener('click', () => {
            if (state.cart.length === 0) {
                showToast('Tidak ada transaksi untuk dicetak', 'error');
                return;
            }
            
            // Create temporary transaction for receipt
            const tempTransaction = {
                id: state.transactionNumber,
                date: new Date().toISOString(),
                items: state.cart,
                totals: calculateTotals(),
                cashReceived: state.cashReceived,
                change: Math.max(state.cashReceived - calculateTotals().total, 0),
                discount: state.discountPercentage
            };
            
            showReceipt(tempTransaction);
        });
        
        elements.btnDailyReport.addEventListener('click', showDailyReport);
        
        // Action buttons
        elements.btnProcessPayment.addEventListener('click', processPayment);
        elements.btnSaveTransaction.addEventListener('click', () => {
            if (state.cart.length === 0) {
                showToast('Tidak ada transaksi untuk disimpan', 'error');
                return;
            }
            
            // Save as draft (in real app, this would save to database)
            showToast('Transaksi disimpan sebagai draft', 'success');
        });
        
        elements.btnCancelTransaction.addEventListener('click', clearCart);
        
        // Product modal
        elements.btnAddToCartModal.addEventListener('click', () => {
            if (!state.currentProduct) return;
            
            const quantity = parseInt(elements.modalQuantity.value) || 1;
            if (addToCart(state.currentProduct, quantity)) {
                closeModal(elements.productDetailModal);
            }
        });
        
        // Receipt modal buttons
        elements.btnPrintReceiptModal.addEventListener('click', () => {
            window.print();
        });
        
        elements.btnSendWhatsApp.addEventListener('click', () => {
            const receiptText = elements.receiptContent.innerText;
            const encodedText = encodeURIComponent(receiptText);
            const whatsappUrl = `https://wa.me/?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
        });
        
        // Report modal buttons
        elements.btnExportReport.addEventListener('click', exportReportToExcel);
        
        // Settings modal buttons
        elements.btnSaveSettings.addEventListener('click', saveStoreSettings);
        
        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                document.querySelectorAll('.nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Handle navigation
                const section = item.dataset.section;
                handleNavigation(section);
            });
        });
        
        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal);
            });
        });
        
        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    closeModal(modal);
                });
            }
        });
        
        // Modal quantity controls
        const modalMinusBtn = elements.productDetailModal.querySelector('.quantity-controls .minus');
        const modalPlusBtn = elements.productDetailModal.querySelector('.quantity-controls .plus');
        
        if (modalMinusBtn) {
            modalMinusBtn.addEventListener('click', () => {
                const current = parseInt(elements.modalQuantity.value) || 1;
                if (current > 1) {
                    elements.modalQuantity.value = current - 1;
                }
            });
        }
        
        if (modalPlusBtn) {
            modalPlusBtn.addEventListener('click', () => {
                const current = parseInt(elements.modalQuantity.value) || 1;
                if (state.currentProduct && current < state.currentProduct.stock) {
                    elements.modalQuantity.value = current + 1;
                } else if (state.currentProduct) {
                    showToast(`Maksimum stok: ${state.currentProduct.stock}`, 'warning');
                }
            });
        }
    }

    // Handle Bottom Navigation
    function handleNavigation(section) {
        switch(section) {
            case 'products':
                // Already on products page
                document.querySelector('.left-panel').scrollIntoView({ behavior: 'smooth' });
                break;
                
            case 'transaction':
                document.querySelector('.right-panel').scrollIntoView({ behavior: 'smooth' });
                break;
                
            case 'inventory':
                showToast('Fitur manajemen stok akan segera hadir!', 'info');
                break;
                
            case 'reports':
                showDailyReport();
                break;
                
            case 'settings':
                openModal(elements.settingsModal);
                break;
        }
    }

    // Initialize the application
    init();
});