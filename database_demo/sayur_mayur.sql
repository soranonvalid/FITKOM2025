-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2025 at 11:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sayur_mayur`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_sayur`
--

CREATE TABLE `tb_sayur` (
  `id_sayur` int(15) NOT NULL,
  `gambar` longtext NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama_sayur` varchar(20) NOT NULL,
  `satuan` varchar(10) NOT NULL,
  `harga` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_sayur`
--

INSERT INTO `tb_sayur` (`id_sayur`, `gambar`, `kode`, `nama_sayur`, `satuan`, `harga`) VALUES
(1, 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTM54vgOSWI-2gdLstzN5CGlpHrFi9PZoeKEKCutEHiId2PwGdMH903Yy6Z99i-xXQmc8FUg7O2dtzpSIR4j3Dahw4XmfBdVNrRG62IcO68rA', 'P001', 'Kangkung', 'pcs', 12000),
(2, 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRLEN66loMCejNy98lzRXcs-BKKeSfOdf4DRNuLSED8BAz1xOUEK91DYkgHlSVYdf_wExkKYs4-NSqsX4nbRNHUNApouZhUT1FdC97kHORApg', 'P002', 'Bayam', 'pcs', 10000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_sayur`
--
ALTER TABLE `tb_sayur`
  ADD PRIMARY KEY (`id_sayur`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_sayur`
--
ALTER TABLE `tb_sayur`
  MODIFY `id_sayur` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
