const db = require('../config/database');

class Barang {
    // Get all barang
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM barang ORDER BY id DESC');
        return rows;
    }

    // Get barang by id
    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM barang WHERE id = ?', [id]);
        return rows[0];
    }

    // Create barang
    static async create(data) {
        const { kode_barang, nama_barang, kategori, harga, stok, deskripsi } = data;
        const [result] = await db.query(
            'INSERT INTO barang (kode_barang, nama_barang, kategori, harga, stok, deskripsi) VALUES (?, ?, ?, ?, ?, ?)',
            [kode_barang, nama_barang, kategori, harga, stok, deskripsi]
        );
        return result.insertId;
    }

    // Update barang
    static async update(id, data) {
        const { kode_barang, nama_barang, kategori, harga, stok, deskripsi } = data;
        const [result] = await db.query(
            'UPDATE barang SET kode_barang = ?, nama_barang = ?, kategori = ?, harga = ?, stok = ?, deskripsi = ? WHERE id = ?',
            [kode_barang, nama_barang, kategori, harga, stok, deskripsi, id]
        );
        return result.affectedRows;
    }

    // Delete barang
    static async delete(id) {
        const [result] = await db.query('DELETE FROM barang WHERE id = ?', [id]);
        return result.affectedRows;
    }

    // Search barang
    static async search(keyword) {
        const [rows] = await db.query(
            'SELECT * FROM barang WHERE nama_barang LIKE ? OR kode_barang LIKE ? OR kategori LIKE ?',
            [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
        );
        return rows;
    }
}

module.exports = Barang;