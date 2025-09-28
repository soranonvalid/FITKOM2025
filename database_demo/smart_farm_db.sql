-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 28, 2025 at 02:53 AM
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
-- Database: `smart_farm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_smart_farm`
--

CREATE TABLE `tb_smart_farm` (
  `id` int(11) NOT NULL,
  `gambar` longtext NOT NULL,
  `kode` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `satuan` varchar(50) NOT NULL,
  `harga` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_smart_farm`
--

INSERT INTO `tb_smart_farm` (`id`, `gambar`, `kode`, `nama`, `satuan`, `harga`) VALUES
(78, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKpRKHy4m9uueokOrdxbWyJ40aF1LG4ShnQ&s', 'P001', 'Kangkung Wonogiri', 'ons', 5000),
(79, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR43sOx8AglkKanmIEy8jSj_olevalMeBUw6A&s', 'P002', 'Wortel Setu', 'pcs', 2100),
(80, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShxFlYm-CFPVmSYUKe3soQnHaK_7voqe2CzQ&s', 'P003', 'Kol Cilegon', 'ons', 1900),
(82, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguaLXpdei81oz-NxB46iFsRXm5NbI14C26w&s', 'P004', 'Timun Medan', 'kg', 11200),
(83, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjVsW0Yrr9D7et2UewkFxVyUTLj4Q9BNI-Q&s', 'P005', 'Terong Beijing', 'pcs', 2000),
(84, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJBJYPasN960YVhcPEW4-CxgB1ZC40uudwA&s', 'P006', 'Terung Belanda', 'kg', 12100),
(85, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4xXmtANcF0AZC_7agyg5vHoHfExopPLrybQ&s', 'P007', 'Kecambah Jayapura', 'kg', 900),
(86, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5NrX5MVLPVUC2OdIGdJWfL1yr8woWFBLuyw&s', 'P004', 'Kembang Kol Pak lembong', 'kg', 18200),
(87, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR09-SPnf6dE9PX4PPc5RYkEi1Mfd1pAWLPwQ&s', 'P002', 'Kol Ungu Eropa Asli', 'pcs', 6700),
(88, 'https://cdn.grid.id/crop/0x0:0x0/360x240/photo/2020/06/29/1511559795.jpg', 'P005', 'Wortel Aceh Sebrang 100% mutu', 'ons', 21000),
(89, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRagW3sGdr-H1rDCWjy5h2EvGSsdz_-5ws0tA&s', 'P023', 'Gabah Haji Emad', 'gros', 43200),
(90, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAywUKtxL3UaOnFWFqXsYz42qy_G1xOXt0GQ&s', 'P041', 'Tomat Kairo', 'pcs', 12000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_smart_farm`
--
ALTER TABLE `tb_smart_farm`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_smart_farm`
--
ALTER TABLE `tb_smart_farm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
