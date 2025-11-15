document.addEventListener('DOMContentLoaded', function () {
    // =======================================
    // A. LOGIKA LOGIN (index.html)
    // =======================================
    const CORRECT_USERNAME = "Adisalam";
    const CORRECT_PASSWORD = "24090004";

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            // 1. Validasi Input Kosong
            if (email === '' || password === '') {
                errorMessage.textContent = 'Username dan Password tidak boleh kosong.';
                return;
            } else {
                errorMessage.textContent = '';
            }

            // 2. Validasi Kredensial SPESIFIK
            if (email === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
                // Kredensial BENAR
                alert('Login berhasil! Anda akan diarahkan ke Dashboard.');
                window.location.href = 'dashboard.html';
            } else if (email !== CORRECT_USERNAME) {
                // Kredensial SALAH: Username salah
                errorMessage.textContent = 'Username invalid. Harap gunakan "Adisalam".';
            } else {
                // Kredensial SALAH: Password salah
                errorMessage.textContent = 'Password invalid. Harap periksa NIM Anda.';
            }
        });
    }

    // =======================================
    // B. LOGIKA DASHBOARD (dashboard.html)
    // =======================================
    const summaryData = {
        totalProducts: 120,
        totalSales: 85,
        totalRevenue: 12500000
    };

    function formatRupiah(number) {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
        return formatter.format(number);
    }

    function loadSummaryData() {
        if (document.getElementById('totalProductsValue')) {
            document.getElementById('totalProductsValue').textContent = summaryData.totalProducts.toLocaleString('id-ID');
            document.getElementById('totalSalesValue').textContent = summaryData.totalSales.toLocaleString('id-ID');
            document.getElementById('totalRevenueValue').textContent = formatRupiah(summaryData.totalRevenue);
        }
    }

    // Panggil logika dashboard
    loadSummaryData();

    // =======================================
    // C. LOGIKA PRODUCTS (products.html)
    // =======================================
    const productList = [
        { id: 1, name: 'Nasi Goreng Spesial', category: 'Makanan Berat', price: 25000, stock: 50 },
        { id: 2, name: 'Es Teh Manis', category: 'Minuman', price: 5000, stock: 120 },
        { id: 3, name: 'Roti Bakar Keju', category: 'Camilan', price: 18000, stock: 30 },
        { id: 4, name: 'Mie Ayam Bakso', category: 'Makanan Berat', price: 22000, stock: 45 },
    ];

    function renderProductTable() {
        const tableBody = document.getElementById('productTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = ''; // Kosongkan tabel
        productList.forEach(product => {
            const row = tableBody.insertRow();

            // Kolom ID
            row.insertCell().textContent = product.id;

            // Kolom Nama Produk
            row.insertCell().textContent = product.name;

            // Kolom Kategori
            row.insertCell().textContent = product.category;

            // Kolom Harga (Format Rupiah)
            row.insertCell().textContent = formatRupiah(product.price);

            // Kolom Stok
            row.insertCell().textContent = product.stock;

            // Kolom Aksi (Tombol)
            const actionCell = row.insertCell();
            actionCell.className = 'action-buttons';
            actionCell.innerHTML = `
                <button class="edit-btn" data-id="${product.id}">Edit</button>
                <button class="delete-btn" data-id="${product.id}">Hapus</button>
            `;
        });
    }

    // Panggil logika produk
    renderProductTable();
});