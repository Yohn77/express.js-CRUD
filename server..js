const express = require('express');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'klib2247_aplikasibarang',
    password: process.env.DB_PASSWORD || 'aplikasibarang123',
    database: process.env.DB_NAME || 'klib2247_aplikasibarang',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', async (req, res) => {
    try {
        const [barang] = await pool.query('SELECT * FROM barang ORDER BY id DESC');
        
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Aplikasi Barang</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
                <style>
                    body { background: #f5f5f5; }
                    .card { box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                </style>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div class="container">
                        <a class="navbar-brand" href="/">
                            <i class="bi bi-box-seam"></i> Manajemen Barang
                        </a>
                        <div class="navbar-nav ms-auto">
                            <a class="nav-link" href="/create">
                                <i class="bi bi-plus-circle"></i> Tambah Barang
                            </a>
                        </div>
                    </div>
                </nav>
                
                <div class="container mt-4">
                    <div class="card">
                        <div class="card-header bg-white d-flex justify-content-between align-items-center">
                            <h4 class="mb-0">
                                <i class="bi bi-boxes"></i> Daftar Barang
                            </h4>
                            <span class="badge bg-primary">${barang.length} item</span>
                        </div>
                        <div class="card-body">
                            ${barang.length > 0 ? `
                            <div class="table-responsive">
                                <table class="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Kode</th>
                                            <th>Nama Barang</th>
                                            <th>Kategori</th>
                                            <th>Harga</th>
                                            <th>Stok</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${barang.map(item => `
                                            <tr>
                                                <td>${item.id}</td>
                                                <td><span class="badge bg-secondary">${item.kode_barang}</span></td>
                                                <td><strong>${item.nama_barang}</strong></td>
                                                <td><span class="badge bg-info">${item.kategori || '-'}</span></td>
                                                <td>Rp ${new Intl.NumberFormat('id-ID').format(item.harga)}</td>
                                                <td>
                                                    <span class="badge ${item.stok > 10 ? 'bg-success' : item.stok > 0 ? 'bg-warning' : 'bg-danger'}">
                                                        ${item.stok}
                                                    </span>
                                                </td>
                                                <td>
                                                    <a href="/edit/${item.id}" class="btn btn-warning btn-sm">
                                                        <i class="bi bi-pencil"></i>
                                                    </a>
                                                    <a href="/delete/${item.id}" class="btn btn-danger btn-sm" 
                                                       onclick="return confirm('Yakin hapus?')">
                                                        <i class="bi bi-trash"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                            ` : `
                            <div class="text-center py-5">
                                <i class="bi bi-inbox display-1 text-muted"></i>
                                <h5 class="mt-3">Belum ada data barang</h5>
                                <p class="text-muted">Silakan tambahkan barang baru</p>
                                <a href="/create" class="btn btn-primary">
                                    <i class="bi bi-plus-circle"></i> Tambah Barang
                                </a>
                            </div>
                            `}
                        </div>
                    </div>
                </div>
                
                <footer class="footer mt-5 py-3 bg-light">
                    <div class="container text-center">
                        <span class="text-muted">© 2024 Aplikasi Manajemen Barang</span>
                    </div>
                </footer>
            </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send(`
            <h1>Error Database</h1>
            <p>${error.message}</p>
            <a href="/" class="btn btn-primary">Kembali</a>
        `);
    }
});

// Form tambah barang
app.get('/create', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Tambah Barang</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <i class="bi bi-box-seam"></i> Manajemen Barang
                    </a>
                </div>
            </nav>
            
            <div class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h4 class="mb-0">
                                    <i class="bi bi-plus-circle"></i> Tambah Barang Baru
                                </h4>
                            </div>
                            <div class="card-body">
                                <form action="/store" method="POST">
                                    <div class="mb-3">
                                        <label for="kode_barang" class="form-label">Kode Barang <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="kode_barang" name="kode_barang" required>
                                        <div class="form-text">Contoh: BRG001</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="nama_barang" class="form-label">Nama Barang <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="nama_barang" name="nama_barang" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="kategori" class="form-label">Kategori</label>
                                        <select class="form-select" id="kategori" name="kategori">
                                            <option value="">Pilih Kategori</option>
                                            <option value="Elektronik">Elektronik</option>
                                            <option value="Aksesoris">Aksesoris</option>
                                            <option value="Peralatan Kantor">Peralatan Kantor</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="harga" class="form-label">Harga (Rp) <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control" id="harga" name="harga" required min="0">
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="stok" class="form-label">Stok</label>
                                            <input type="number" class="form-control" id="stok" name="stok" value="0" min="0">
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="deskripsi" class="form-label">Deskripsi</label>
                                        <textarea class="form-control" id="deskripsi" name="deskripsi" rows="3"></textarea>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <a href="/" class="btn btn-secondary">
                                            <i class="bi bi-arrow-left"></i> Kembali
                                        </a>
                                        <button type="submit" class="btn btn-primary">
                                            <i class="bi bi-save"></i> Simpan Barang
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Proses simpan barang
app.post('/store', async (req, res) => {
    try {
        const { kode_barang, nama_barang, kategori, harga, stok, deskripsi } = req.body;
        
        if (!kode_barang || !nama_barang || !harga) {
            return res.redirect('/create?error=Semua field wajib diisi');
        }

        await pool.query(
            'INSERT INTO barang (kode_barang, nama_barang, kategori, harga, stok, deskripsi) VALUES (?, ?, ?, ?, ?, ?)',
            [kode_barang, nama_barang, kategori || '', parseInt(harga), parseInt(stok) || 0, deskripsi || '']
        );

        res.redirect('/?success=Barang berhasil ditambahkan');
    } catch (error) {
        console.error(error);
        res.redirect('/create?error=Gagal menambahkan barang');
    }
});

// Edit barang
app.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query('SELECT * FROM barang WHERE id = ?', [id]);
        const item = rows[0];
        
        if (!item) {
            return res.redirect('/?error=Barang tidak ditemukan');
        }

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Edit Barang</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div class="container">
                        <a class="navbar-brand" href="/">
                            <i class="bi bi-box-seam"></i> Manajemen Barang
                        </a>
                    </div>
                </nav>
                
                <div class="container mt-4">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header bg-white">
                                    <h4 class="mb-0">
                                        <i class="bi bi-pencil"></i> Edit Barang
                                    </h4>
                                </div>
                                <div class="card-body">
                                    <form action="/update/${item.id}" method="POST">
                                        <div class="mb-3">
                                            <label for="kode_barang" class="form-label">Kode Barang <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="kode_barang" name="kode_barang" 
                                                   value="${item.kode_barang}" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="nama_barang" class="form-label">Nama Barang <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="nama_barang" name="nama_barang" 
                                                   value="${item.nama_barang}" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="kategori" class="form-label">Kategori</label>
                                            <select class="form-select" id="kategori" name="kategori">
                                                <option value="">Pilih Kategori</option>
                                                <option value="Elektronik" ${item.kategori === 'Elektronik' ? 'selected' : ''}>Elektronik</option>
                                                <option value="Aksesoris" ${item.kategori === 'Aksesoris' ? 'selected' : ''}>Aksesoris</option>
                                                <option value="Peralatan Kantor" ${item.kategori === 'Peralatan Kantor' ? 'selected' : ''}>Peralatan Kantor</option>
                                                <option value="Lainnya" ${item.kategori === 'Lainnya' ? 'selected' : ''}>Lainnya</option>
                                            </select>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="harga" class="form-label">Harga (Rp) <span class="text-danger">*</span></label>
                                                <input type="number" class="form-control" id="harga" name="harga" 
                                                       value="${item.harga}" required min="0">
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="stok" class="form-label">Stok</label>
                                                <input type="number" class="form-control" id="stok" name="stok" 
                                                       value="${item.stok}" min="0">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="deskripsi" class="form-label">Deskripsi</label>
                                            <textarea class="form-control" id="deskripsi" name="deskripsi" rows="3">${item.deskripsi || ''}</textarea>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <a href="/" class="btn btn-secondary">
                                                <i class="bi bi-arrow-left"></i> Kembali
                                            </a>
                                            <button type="submit" class="btn btn-primary">
                                                <i class="bi bi-save"></i> Update Barang
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.redirect('/?error=Gagal memuat data');
    }
});

// Proses update barang
app.post('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { kode_barang, nama_barang, kategori, harga, stok, deskripsi } = req.body;

        await pool.query(
            'UPDATE barang SET kode_barang = ?, nama_barang = ?, kategori = ?, harga = ?, stok = ?, deskripsi = ? WHERE id = ?',
            [kode_barang, nama_barang, kategori || '', parseInt(harga), parseInt(stok) || 0, deskripsi || '', id]
        );

        res.redirect('/?success=Barang berhasil diupdate');
    } catch (error) {
        console.error(error);
        res.redirect(`/edit/${req.params.id}?error=Gagal mengupdate barang`);
    }
});

// Hapus barang
app.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM barang WHERE id = ?', [id]);
        res.redirect('/?success=Barang berhasil dihapus');
    } catch (error) {
        console.error(error);
        res.redirect('/?error=Gagal menghapus barang');
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Aplikasi Barang berjalan di port ${PORT}`);
    console.log(`🌐 http://kliklop.com:${PORT}`);
    console.log(`📊 Database: ${process.env.DB_NAME || 'klib2247_aplikasibarang'}`);
});