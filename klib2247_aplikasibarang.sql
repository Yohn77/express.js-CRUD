-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 22, 2026 at 08:43 PM
-- Server version: 11.4.12-MariaDB-cll-lve
-- PHP Version: 8.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `klib2247_aplikasibarang`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `kode_barang` varchar(50) NOT NULL,
  `nama_barang` varchar(100) NOT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `harga` int(11) NOT NULL,
  `stok` int(11) NOT NULL DEFAULT 0,
  `deskripsi` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `kode_barang`, `nama_barang`, `kategori`, `harga`, `stok`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'BRG001', 'Laptop Asus', 'Elektronik', 8000000, 10, 'Laptop Asus dengan spesifikasi tinggi', '2026-06-22 11:56:40', '2026-06-22 11:56:40'),
(2, 'BRG002', 'Mouse Logitech', 'Aksesoris', 250000, 25, 'Mouse wireless Logitech', '2026-06-22 11:56:40', '2026-06-22 11:56:40'),
(3, 'BRG003', 'Keyboard Mechanical', 'Aksesoris', 750000, 15, 'Keyboard mechanical RGB', '2026-06-22 11:56:40', '2026-06-22 11:56:40'),
(4, 'BRG004', 'Monitor Samsung', 'Elektronik', 3500000, 8, 'Monitor 24 inch Samsung', '2026-06-22 11:56:40', '2026-06-22 11:56:40'),
(5, 'BRG005', 'Printer Epson', 'Elektronik', 1800000, 5, 'Printer ink tank Epson', '2026-06-22 11:56:40', '2026-06-22 11:56:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_barang` (`kode_barang`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
