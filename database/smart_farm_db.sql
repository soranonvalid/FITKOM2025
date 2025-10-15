-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Sep 2025 pada 07.58
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

-- Database: `smart_farm_db`
--

CREATE DATABASE IF NOT EXISTS `smart_farm_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `smart_farm_db`;

-- --------------------------------------------------------

-- Struktur tabel `tb_smart_farm`
--

DROP TABLE IF EXISTS `tb_smart_farm`;
CREATE TABLE `tb_smart_farm` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `gambar` LONGTEXT NOT NULL,
  `kode` VARCHAR(50) NOT NULL,
  `nama` VARCHAR(50) NOT NULL,
  `satuan` VARCHAR(50) NOT NULL,
  `harga` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data untuk tabel `tb_smart_farm`

INSERT INTO `tb_smart_farm` (`gambar`, `kode`, `nama`, `satuan`, `harga`) VALUES
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKpRKHy4m9uueokOrdxbWyJ40aF1LG4ShnQ&s', 'P001', 'Kangkung Wonogiri', 'ons', 5000),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR43sOx8AglkKanmIEy8jSj_olevalMeBUw6A&s', 'P002', 'Wortel Setu', 'pcs', 2100),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShxFlYm-CFPVmSYUKe3soQnHaK_7voqe2CzQ&s', 'P003', 'Kol Cilegon', 'ons', 1900),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguaLXpdei81oz-NxB46iFsRXm5NbI14C26w&s', 'P004', 'Timun Medan', 'kg', 11200),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjVsW0Yrr9D7et2UewkFxVyUTLj4Q9BNI-Q&s', 'P005', 'Terong Beijing', 'pcs', 2000),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJBJYPasN960YVhcPEW4-CxgB1ZC40uudwA&s', 'P006', 'Terung Belanda', 'kg', 12100),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4xXmtANcF0AZC_7agyg5vHoHfExopPLrybQ&s', 'P007', 'Kecambah Jayapura', 'kg', 900),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5NrX5MVLPVUC2OdIGdJWfL1yr8woWFBLuyw&s', 'P008', 'Kembang Kol Pak Lembong', 'kg', 18200),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR09-SPnf6dE9PX4PPc5RYkEi1Mfd1pAWLPwQ&s', 'P009', 'Kol Ungu Eropa Asli', 'pcs', 6700),
('https://cdn.grid.id/crop/0x0:0x0/360x240/photo/2020/06/29/1511559795.jpg', 'P010', 'Wortel Aceh Sebrang 100% mutu', 'ons', 21000),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRagW3sGdr-H1rDCWjy5h2EvGSsdz_-5ws0tA&s', 'P011', 'Gabah Haji Emad', 'gros', 43200),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAywUKtxL3UaOnFWFqXsYz42qy_G1xOXt0GQ&s', 'P012', 'Tomat Kairo', 'pcs', 12000);

-- Optional: Tambahkan UNIQUE constraint kalau `kode` harus unik
-- ALTER TABLE `tb_smart_farm` ADD UNIQUE (`kode`);

-- Set nilai AUTO_INCREMENT agar id berikutnya benar
ALTER TABLE `tb_smart_farm`
  AUTO_INCREMENT = 13;

ALTER TABLE `tb_smart_farm`
MODIFY COLUMN satuan ENUM('pcs', 'ons', 'kg', 'gros') NOT NULL DEFAULT 'pcs';

-- Optional: Database `test`
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
