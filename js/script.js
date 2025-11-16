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
    // Data Produk Sesuai Spesifikasi
    const products = [
        { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
        { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
        { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
    ];

    // Fungsi untuk membuat format harga
    function formatPrice(number) {
        return number.toLocaleString('id-ID'); // Menggunakan format angka Indonesia tanpa simbol mata uang (sesuai gambar)
    }

    function renderProductTable() {
        const tableBody = document.getElementById('productTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = ''; // Kosongkan tabel

        // Menggunakan forEach untuk menampilkan data
        products.forEach((product, index) => {
            const row = tableBody.insertRow();

            // Kolom No (index + 1)
            row.insertCell().textContent = index + 1;

            // Kolom Product Name
            row.insertCell().textContent = product.name;

            // Kolom Price
            row.insertCell().textContent = formatPrice(product.price);

            // Kolom Stock
            row.insertCell().textContent = product.stock;

            // Kolom Aksi (Icons)
            const actionCell = row.insertCell();
            actionCell.className = 'action-icons';
            // Menggunakan ikon Font Awesome
            actionCell.innerHTML = `
            <i class="fas fa-pencil-alt edit-btn" data-name="${product.name}"></i>
            <i class="fas fa-trash-alt delete-btn"></i>
        `;
        });

        // Panggil fungsi untuk melampirkan event listener setelah tabel dibuat
        attachProductActionListeners();
    }

    function attachProductActionListeners() {
        // Listener untuk Edit (menampilkan alert)
        document.querySelectorAll('.edit-btn').forEach(icon => {
            icon.addEventListener('click', function () {
                const productName = this.getAttribute('data-name');
                alert(`Edit produk ${productName}`);
            });
        });

        // Listener untuk Delete (konfirmasi dan hapus baris)
        document.querySelectorAll('.delete-btn').forEach(icon => {
            icon.addEventListener('click', function () {
                const rowToRemove = this.closest('tr');

                if (confirm("Yakin hapus produk ini?")) {
                    // Hapus baris dari DOM menggunakan remove()
                    rowToRemove.remove();
                    alert('Produk berhasil dihapus dari tabel.');
                }
            });
        });
    }

    // Panggil fungsi rendering saat dokumen dimuat
    renderProductTable();
});