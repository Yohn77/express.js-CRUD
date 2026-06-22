const Barang = require('../models/barangModel');

class BarangController {
    // Get all barang
    static async index(req, res) {
        try {
            const barang = await Barang.getAll();
            res.render('barang/index', { 
                title: 'Daftar Barang',
                barang,
                success: req.query.success,
                error: req.query.error
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan pada server');
        }
    }

    // Show create form
    static createForm(req, res) {
        res.render('barang/create', { 
            title: 'Tambah Barang',
            error: req.query.error
        });
    }

    // Store barang
    static async store(req, res) {
        try {
            const { kode_barang, nama_barang, kategori, harga, stok, deskripsi } = req.body;
            
            // Validasi
            if (!kode_barang || !nama_barang || !harga) {
                return res.redirect('/barang/create?error=Semua field wajib diisi');
            }

            await Barang.create({
                kode_barang,
                nama_barang,
                kategori: kategori || '',
                harga: parseInt(harga),
                stok: parseInt(stok) || 0,
                deskripsi: deskripsi || ''
            });

            res.redirect('/barang?success=Barang berhasil ditambahkan');
        } catch (error) {
            console.error(error);
            res.redirect('/barang/create?error=Gagal menambahkan barang');
        }
    }

    // Show edit form
    static async editForm(req, res) {
        try {
            const id = req.params.id;
            const barang = await Barang.getById(id);
            
            if (!barang) {
                return res.redirect('/barang?error=Barang tidak ditemukan');
            }

            res.render('barang/edit', { 
                title: 'Edit Barang',
                barang,
                error: req.query.error
            });
        } catch (error) {
            console.error(error);
            res.redirect('/barang?error=Terjadi kesalahan');
        }
    }

    // Update barang
    static async update(req, res) {
        try {
            const id = req.params.id;
            const { kode_barang, nama_barang, kategori, harga, stok, deskripsi } = req.body;

            if (!kode_barang || !nama_barang || !harga) {
                return res.redirect(`/barang/edit/${id}?error=Semua field wajib diisi`);
            }

            await Barang.update(id, {
                kode_barang,
                nama_barang,
                kategori: kategori || '',
                harga: parseInt(harga),
                stok: parseInt(stok) || 0,
                deskripsi: deskripsi || ''
            });

            res.redirect('/barang?success=Barang berhasil diupdate');
        } catch (error) {
            console.error(error);
            res.redirect(`/barang/edit/${req.params.id}?error=Gagal mengupdate barang`);
        }
    }

    // Delete barang
    static async delete(req, res) {
        try {
            const id = req.params.id;
            await Barang.delete(id);
            res.redirect('/barang?success=Barang berhasil dihapus');
        } catch (error) {
            console.error(error);
            res.redirect('/barang?error=Gagal menghapus barang');
        }
    }

    // Search barang
    static async search(req, res) {
        try {
            const keyword = req.query.keyword;
            if (!keyword) {
                return res.redirect('/barang');
            }

            const barang = await Barang.search(keyword);
            res.render('barang/index', {
                title: 'Hasil Pencarian',
                barang,
                keyword,
                success: req.query.success,
                error: req.query.error
            });
        } catch (error) {
            console.error(error);
            res.redirect('/barang?error=Gagal melakukan pencarian');
        }
    }
}

module.exports = BarangController;