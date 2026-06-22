# 📦 Aplikasi Manajemen Barang

Aplikasi web sederhana untuk manajemen inventaris barang menggunakan **Express.js**, **MySQL**, dan **Bootstrap**. Didesain untuk kemudahan pengelolaan data barang dengan antarmuka yang responsif dan intuitif.

---

## 🌐 Live Demo

Aplikasi ini dapat diakses secara langsung di:

### 🔗 [https://klikklop.com](https://klikklop.com)

> **Catatan**: Aplikasi berjalan di server production dengan Node.js dan MySQL.

---

## ✨ Fitur Unggulan

- ✅ **CRUD Lengkap** - Create, Read, Update, Delete data barang
- ✅ **Pencarian Barang** - Cari barang berdasarkan kode, nama, atau kategori
- ✅ **Indikator Stok** - Visualisasi stok dengan warna (Hijau = Aman, Kuning = Menipis, Merah = Habis)
- ✅ **Format Harga Rupiah** - Tampilan harga dengan format mata uang Indonesia
- ✅ **Responsive Design** - Tampilan optimal di desktop, tablet, dan mobile
- ✅ **Notifikasi** - Feedback sukses/error untuk setiap aksi
- ✅ **Database Terintegrasi** - MySQL dengan koneksi pooling

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| **Node.js** | v18.20.8 | Runtime JavaScript |
| **Express.js** | v4.x | Framework web |
| **MySQL** | v8.x | Database relational |
| **Bootstrap** | v5.1.3 | Framework CSS |
| **EJS** | v3.x | Template engine |
| **dotenv** | v16.x | Environment variables |

---

## 📋 Database Schema

```sql
CREATE TABLE barang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kode_barang VARCHAR(50) NOT NULL UNIQUE,
    nama_barang VARCHAR(100) NOT NULL,
    kategori VARCHAR(50),
    harga INT NOT NULL,
    stok INT NOT NULL DEFAULT 0,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
