-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 19, 2025 at 08:35 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_farm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_gudang`
--

CREATE TABLE `tb_gudang` (
  `id` int(11) NOT NULL,
  `kodegudang` varchar(50) NOT NULL,
  `namagudang` varchar(200) NOT NULL,
  `golongan` varchar(50) NOT NULL,
  `keterangan` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_gudang`
--

INSERT INTO `tb_gudang` (`id`, `kodegudang`, `namagudang`, `golongan`, `keterangan`) VALUES
(1, 'G001', 'Gudang A', 'Sayur', 'Gudang untuk sayur'),
(2, 'G002', 'Gudang B', 'Buah', 'Gudang untuk buah'),
(3, 'G003', 'Gudang C', 'Tools', 'Gudang untuk tools');

-- --------------------------------------------------------

--
-- Table structure for table `tb_produk`
--

CREATE TABLE `tb_produk` (
  `id` int(11) NOT NULL,
  `kode` varchar(50) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `satuan` varchar(50) NOT NULL,
  `harga` int(11) NOT NULL,
  `gambar` longtext,
  `kodegudang` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_produk`
--

INSERT INTO `tb_produk` (`id`, `kode`, `nama`, `satuan`, `harga`, `gambar`, `kodegudang`) VALUES
(2, 'P001', 'Kangkung', 'pcs', 5000, 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTM54vgOSWI-2gdLstzN5CGlpHrFi9PZoeKEKCutEHiId2PwGdMH903Yy6Z99i-xXQmc8FUg7O2dtzpSIR4j3Dahw4XmfBdVNrRG62IcO68rA', 'G001'),
(3, 'P002', 'Anggur', 'ons', 12000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyJCBTozDSC5IDWIMueglp2WWAngoQZVCmLRGl81XwX9v6Sx36DostRzs7uOrMgIYTw3SsD3MXfO9iVEEC41fQ3y1PrOm-GtHIXxDjPpzi', 'G002'),
(4, 'P003', 'Cangkul', 'pcs', 30000, 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTAzBUv42_4eb_GQ7I--AdKQDh34r5_wvfMOyNsx8oaOZoF1ag9xqJt16jDS_xcIiVU-rNZP-QCFktpVg0G6NhDzlgPTDAIBkCoLkqC5aN6UQ', 'G003'),
(42, 'PRD001', 'Produk A', 'pcs', 15000, NULL, 'G001'),
(43, 'PRD002', 'Produk B', 'box', 25000, NULL, 'G001'),
(44, 'PRD003', 'Produk C', 'pcs', 10000, NULL, 'G002'),
(45, 'PRD004', 'Produk D', 'pak', 30000, NULL, 'G003'),
(46, 'PRD005', 'Produk E', 'lusin', 45000, NULL, 'G002'),
(47, 'PRD006', 'Produk F', 'pcs', 18000, NULL, 'G001'),
(48, 'PRD007', 'Produk G', 'box', 20000, NULL, 'G003'),
(49, 'PRD008', 'Produk H', 'pcs', 12000, NULL, 'G003'),
(50, 'PRD009', 'Produk I', 'pak', 22000, NULL, 'G002'),
(51, 'PRD010', 'Produk J', 'lusin', 35000, NULL, 'G001'),
(52, 'PRD011', 'Produk K', 'pcs', 15500, NULL, 'G003'),
(53, 'PRD012', 'Produk L', 'pak', 27500, NULL, 'G001'),
(54, 'PRD013', 'Produk M', 'box', 32000, NULL, 'G002'),
(55, 'PRD014', 'Produk N', 'pcs', 14500, NULL, 'G003'),
(56, 'PRD015', 'Produk O', 'lusin', 41000, NULL, 'G001'),
(57, 'PRD016', 'Produk P', 'pak', 23000, NULL, 'G002'),
(58, 'PRD017', 'Produk Q', 'box', 26000, NULL, 'G003'),
(59, 'PRD018', 'Produk R', 'pcs', 17000, NULL, 'G001'),
(60, 'PRD019', 'Produk S', 'pak', 19500, NULL, 'G003'),
(61, 'PRD020', 'Produk T', 'lusin', 40000, NULL, 'G002'),
(62, 'PRD021', 'Produk U', 'pcs', 16000, NULL, 'G003'),
(63, 'PRD022', 'Produk V', 'box', 24500, NULL, 'G001'),
(64, 'PRD023', 'Produk W', 'pak', 31000, NULL, 'G002'),
(65, 'PRD024', 'Produk X', 'pcs', 14000, NULL, 'G001'),
(66, 'PRD025', 'Produk Y', 'lusin', 42000, NULL, 'G003'),
(67, 'PRD026', 'Produk Z', 'pak', 28500, NULL, 'G001'),
(68, 'PRD027', 'Produk AA', 'box', 26500, NULL, 'G002'),
(70, 'PRD029', 'Produk AC', 'pak', 29000, NULL, 'G001'),
(71, 'PRD030', 'Produk AD', 'lusin', 37500, NULL, 'G002');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_gudang`
--
ALTER TABLE `tb_gudang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kodegudang` (`kodegudang`);

--
-- Indexes for table `tb_produk`
--
ALTER TABLE `tb_produk`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD KEY `kodegudang` (`kodegudang`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_gudang`
--
ALTER TABLE `tb_gudang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_produk`
--
ALTER TABLE `tb_produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_produk`
--
ALTER TABLE `tb_produk`
  ADD CONSTRAINT `tb_produk_ibfk_1` FOREIGN KEY (`kodegudang`) REFERENCES `tb_gudang` (`kodegudang`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
