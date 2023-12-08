-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 03:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `email`, `password`, `username`) VALUES
(1, 'admin@gmail.com', '$2b$10$i2v6nU.HQo8Nxidm4sQNKOVFWSKXgRFncYN1JMaTFa57lnfg0CCEC', 'admin'),
(2, 'doquan23032003@gmail.com', '$2b$10$8jFI3yzLjB6ZDOT3wCOH/.YzLp4SqsQnnbEOQdcdISc.RybMgWE4u', 'doquan23032003'),
(3, 'femedo5683@dabeixin.com', '$2b$10$gPnGX8liAqeegv.6GbaDQ.FuXs8M/jlRqzHsqJ6/4xtFy/VWG7I8y', 'femedo5683'),
(4, 'nalim97965@dabeixin.com', '$2b$10$C5mh1AVQV/gAOjVBCQ1coezTP2Y.k10/7Hw/IbxZsctZuvKG5uQ2i', 'nalim97965'),
(5, 'rodade8955@bikedid.com', '$2b$10$ap.LoHPPoWi9BedTtgsZSuRudy63ASPM/N611EQgXzlZ1a4HOL.WG', 'rodade8955'),
(6, 'regavo8307@dabeixin.com', '$2b$10$go1.exVCfomC20OFqd8SL.yjeBYJnfQQN6nyjyin1zo1X7jL5coQa', 'regavo8307'),
(7, 'sesojod349@hupoi.com', '$2b$10$JB./Dw0RPq4qngdkxBnLKe5NiyytIdvKbH6ELJX4YgVKS8dAj2rFi', 'sesojod349');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `image`, `code`) VALUES
(1, 'Huawei', 'huawei.png', 'HW2023001'),
(2, 'Asus', 'asus_icon.png', 'AS2023001'),
(3, 'Vivo', 'vivo_icon.png', 'VO2023001'),
(4, 'Oppo', 'oppo_icon.png', 'OP2023001'),
(5, 'Apple', 'apple-logo.png', 'AP2023001'),
(6, 'Samsung', 'samsung_icon.png', 'SA2023001'),
(7, 'Xiaomi', 'xiaomi_logo.png', 'XM2023001');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `phone`, `address`) VALUES
(1, 'John Doe', '09123456789', '123 Main St'),
(2, 'Jane Smith', '03456789012', '456 Oak Ave'),
(3, 'Bob Johnson', '07123456789', '789 Pine Blvd'),
(4, 'Alice Brown', '09234567890', '987 Elm Ln'),
(5, 'Charlie Davis', '03890123456', '654 Birch Rd'),
(6, 'Eva White', '07567890123', '321 Cedar Dr'),
(7, 'Frank Miller', '09789012345', '876 Maple Ct'),
(8, 'Grace Taylor', '03123456789', '135 Pineapple Ave'),
(9, 'Henry Lee', '07123456789', '246 Banana St'),
(10, 'Ivy Wilson', '09234567890', '357 Orange Blvd'),
(11, 'Do Minh Quan ', '0938365034', '23 Avenue New York'),
(12, 'Huynh My Nhan', '0908490807', '56 Tran Hung Dao Q1'),
(13, 'Do Huu Tri', '0908402245', '78 New York City'),
(14, 'Chau Que Nhu ', '0374121240', '61 Phu Dong Thien Vuong p11 q5'),
(15, 'Do Minh Nguyen', '0941787787', '23 A Riverside thu thiem'),
(16, 'Do Minh Nguyen', '0913564127', '21A Bui Minh Truc P11 Quan 9 ');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `totalprice` int(20) DEFAULT NULL,
  `payment` int(21) NOT NULL,
  `refund` int(20) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `status` int(2) DEFAULT 1,
  `customerId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `totalprice`, `payment`, `refund`, `createdAt`, `status`, `customerId`, `userId`) VALUES
(1, 50000000, 50000000, 0, '2023-12-07 21:11:29', 1, 1, 1),
(2, 31400000, 32000000, 600000, '2023-12-07 21:11:54', 1, 2, 2),
(3, 411700000, 420000000, 8300000, '2023-12-07 21:12:21', 1, 3, 3),
(4, 10500000, 10500000, 0, '2023-12-07 21:13:17', 1, 11, 3),
(5, 58000000, 58000000, 0, '2023-12-07 21:13:30', 1, 13, 6),
(6, 104000000, 105000000, 1000000, '2023-12-07 21:13:48', 1, 12, 7),
(7, 48500000, 49000000, 500000, '2023-12-07 21:16:39', 1, 16, 2),
(8, 16000000, 16000000, 0, '2023-12-07 21:17:06', 1, 5, 1),
(9, 13000000, 13000000, 0, '2023-12-07 21:17:37', 1, 6, 7),
(10, 18000000, 18000000, 0, '2023-12-07 21:17:57', 1, 7, 1),
(11, 17500000, 18000000, 500000, '2023-12-07 21:18:35', 1, 7, 1),
(12, 34100000, 35000000, 900000, '2023-12-07 21:18:58', 1, 8, 2),
(13, 41000000, 41000000, 0, '2023-12-07 21:19:21', 1, 3, 1),
(14, 13100000, 14000000, 900000, '2023-12-07 21:19:46', 1, 4, 1),
(15, 53000000, 53000000, 0, '2023-12-07 21:20:38', 1, 11, 3),
(16, 28700000, 29000000, 300000, '2023-12-07 21:21:19', 1, 14, 7);

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL,
  `orderid` int(11) DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`id`, `orderid`, `productid`, `quantity`, `price`) VALUES
(1, 1, 1, 1, 16000000),
(2, 1, 2, 2, 17000000),
(3, 2, 12, 1, 18000000),
(4, 2, 11, 1, 13400000),
(5, 3, 40, 1, 11700000),
(6, 3, 39, 1, 380000000),
(7, 3, 28, 1, 20000000),
(8, 4, 22, 1, 1500000),
(9, 4, 26, 3, 3000000),
(10, 5, 20, 2, 29000000),
(11, 6, 16, 1, 38000000),
(12, 6, 15, 1, 38000000),
(13, 6, 14, 1, 28000000),
(14, 7, 7, 3, 12000000),
(15, 7, 6, 1, 12500000),
(16, 8, 1, 1, 16000000),
(17, 9, 36, 1, 13000000),
(18, 10, 17, 1, 18000000),
(19, 11, 22, 1, 1500000),
(20, 11, 32, 1, 16000000),
(21, 12, 29, 1, 21000000),
(22, 12, 35, 1, 13100000),
(23, 13, 36, 1, 13000000),
(24, 13, 32, 1, 16000000),
(25, 13, 31, 1, 12000000),
(26, 14, 35, 1, 13100000),
(27, 15, 14, 1, 28000000),
(28, 15, 25, 1, 25000000),
(29, 16, 19, 1, 28700000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `importprice` int(20) DEFAULT NULL,
  `retailprice` int(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `barcode` varchar(25) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `categoryid` int(11) DEFAULT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `importprice`, `retailprice`, `quantity`, `barcode`, `image`, `categoryid`, `createdAt`) VALUES
(1, 'Asus rog 7 Entry Black', 14000000, 16000000, 25, '1234567890123', 'rog7-entry-black-01-light.png', 2, '2023-12-06'),
(2, 'Asus rog 7', 15000000, 17000000, 25, '9876543210987', 'asus-rog-7.jpg', 2, '2023-12-06'),
(3, 'Vivo x80 blue', 9000000, 11000000, 40, '5678901234567', 'vivo-x80-xanh.jpg', 3, '2023-12-06'),
(4, 'Vivo y15 blue black', 8000000, 12000000, 40, '4321098765431', 'Vivo-y15s-2021-xanh-den.jpg', 3, '2023-12-06'),
(5, 'Vivo v25 yellow', 85000000, 11000000, 40, '8765432109876', 'vivo-v25e-vang-dd.jpg', 3, '2023-12-06'),
(6, 'Vivo v2111', 97000000, 12500000, 40, '2109876543210', 'vivo-v2111.jpg', 3, '2023-12-06'),
(7, 'Vivo v27', 91000000, 12000000, 40, '6543210987658', 'vivo-v27.jpg', 3, '2023-12-06'),
(8, 'Oppo Pro Black', 78000000, 9700000, 35, '0987654321098', 'oppo-find-x5-pro-den.jpg', 4, '2023-12-06'),
(9, 'Oppo A58', 10000000, 13500000, 35, '3210987654322', 'oppo-a58.jpg', 4, '2023-12-06'),
(10, 'Oppo Reno 10 Pro', 11000000, 13200000, 35, '7654321098765', 'oppo-reno-10pro.jpg', 4, '2023-12-06'),
(11, 'Oppo A58 blue', 11100000, 13400000, 35, '2345678901234', 'oppo-a58-6gb-128gb-xanh-1.jpg', 4, '2023-12-06'),
(12, 'Huawei y90', 14500000, 18000000, 30, '6789012345678', 'huawei-y90.jpg', 1, '2023-12-06'),
(13, 'Huawei nova', 13000000, 15700000, 30, '0123456789012', 'huawei-nova.jpg', 1, '2023-12-06'),
(14, 'Iphone 14 plus blue', 19000000, 28000000, 20, '4567890123456', '14_plus_xanh.png', 5, '2023-12-06'),
(15, 'Iphone 14 promax black', 32000000, 38000000, 20, '8901234567890', 'iphone-14-pro-max-den.jpg', 5, '2023-12-06'),
(16, 'iPhone 15 promax titan', 30000000, 38000000, 20, '5432109876543', 'iphone15.jpg', 5, '2023-12-06'),
(17, 'iPhone 11 Pro', 12500000, 18000000, 20, '9876543210988', 'iphone11-pro.jpg', 5, '2023-12-06'),
(18, 'iPhone 13', 18000000, 24000000, 20, '8765432109877', 'iphone-13.jpg', 5, '2023-12-06'),
(19, 'Iphone13 mini pink', 21100000, 28700000, 20, '7654321098767', 'iphone-13-mini-pink.jpg', 5, '2023-12-06'),
(20, 'Iphone13 pro', 24000000, 29000000, 20, '6543210987654', 'iphone-13-pro.jpg', 5, '2023-12-06'),
(21, 'Iphone13 SE White', 24300000, 29200000, 20, '5432109876743', 'iphone-se-white.jpg', 5, '2023-12-06'),
(22, 'Case iphone14', 1000000, 1500000, 20, '4321098765432', 'case_iphone14.jpg', 5, '2023-12-06'),
(23, 'Samsung galaxy-z-flip 3 cream', 17000000, 24400000, 30, '3210987654321', 'samsung-galaxy-z-flip-3-cream.jpg', 6, '2023-12-06'),
(24, 'Samsung-galaxy a03', 7000000, 8000000, 30, '2109876543211', 'samsung-galaxy-a03-xanh.jpg', 6, '2023-12-06'),
(25, 'Samsung Galazy-Z-Fold-5 ', 22000000, 25000000, 30, '1098765432109', 'Samsung-Galazy-Z-Fold-5.jpg', 6, '2023-12-06'),
(26, 'Buds pro ', 2000000, 3000000, 30, '9876543210989', 'buds-pro_1.jpg', 6, '2023-12-06'),
(27, 'Samsung galaxy-z-flip-4', 12800000, 22000000, 30, '8765432109878', 'samsung-galaxy-z-flip-4.jpg', 6, '2023-12-06'),
(28, 'Galaxy S22 Ultra Burgundy', 16000000, 20000000, 30, '7654321098761', 'Galaxy-S22-Ultra-Burgundy.jpg', 6, '2023-12-06'),
(29, 'Galaxy-S22 Black', 16000000, 21000000, 30, '268946642879', 'Galaxy-S22-Black.jpg', 6, '2023-12-06'),
(30, 'Galaxy S22 Plus', 16000000, 21200000, 50, '216231102625', 'galaxy-s22-plus-white.jpg', 6, '2023-12-06'),
(31, 'Xiaomi-11T White', 10000000, 12000000, 30, '691871033066', 'Xiaomi-11T-White.jpg', 7, '2023-12-06'),
(32, 'Redmi Note-11 Twilight Blue', 14000000, 16000000, 30, '482950888081', 'Redmi-Note-11-Twilight-Blue-2.jpg', 7, '2023-12-06'),
(33, 'Xiaomi redmi 10', 11000000, 13000000, 30, '418214515631', 'Xiaomi-11T-White.jpg', 7, '2023-12-06'),
(34, 'Redmi note 12', 9000000, 13000000, 30, '361831223625', 'redmi-note12.jpg', 7, '2023-12-06'),
(35, 'Xiaomi 13 lite 2', 10000000, 13100000, 30, '119461197940', 'xiaomi-13-lite-2.jpg', 7, '2023-12-06'),
(36, 'Xiaomi 13C', 11000000, 13000000, 30, '163264563304', 'xiaomi-13C.jpg', 7, '2023-12-06'),
(37, 'Oppo A95', 9000000, 12500000, 35, '356911113486', 'oppo-a95.jpg', 4, '2023-12-06'),
(38, 'Oppo Reno 8', 8000000, 11700000, 35, '746922231110', 'oppo-reno8.jpg', 4, '2023-12-06'),
(39, 'IPhone 15 plus titan', 30000000, 380000000, 20, '449555109951', 'Apple-iPhone-15.jpg', 5, '2023-12-06'),
(40, 'Oppo A78', 8000000, 11700000, 35, '315421892619', 'oppo-a78.jpg', 4, '2023-12-06');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `dateofbirth` varchar(50) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `gender` int(11) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL,
  `avatar` varchar(20) NOT NULL,
  `lock_status` int(11) NOT NULL DEFAULT 0,
  `createdAt` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullname`, `age`, `phone`, `dateofbirth`, `address`, `gender`, `role`, `accountId`, `avatar`, `lock_status`, `createdAt`, `status`) VALUES
(1, 'Administrator', 20, 93835034, NULL, '51 Nguyen Huu Tho Q7 TPHCM', 1, 'Admin', 1, 'user-4.jpg', 0, '2023-11-18 19:43:03', 1),
(2, 'Do Minh Quan ', NULL, 938365034, NULL, '21 A Village area ward 6 district 8 ', 1, 'User', 2, '10.jpg', 0, '2023-11-18 20:48:08', 1),
(3, 'Femedo', NULL, 908484517, NULL, ' 53 Duong Ba Trac P6 Q8', 1, 'User', 3, '1.png', 0, '2023-11-19 23:41:47', 1),
(4, 'administrator', NULL, 12, NULL, 'asd13a1', 1, 'User', 4, '1.png', 0, '2023-11-21 14:31:02', 0),
(5, 'tester', NULL, 938365034, NULL, '123', 1, 'User', 5, '1.png', 0, '2023-11-21 17:43:58', 0),
(6, 'regavo', NULL, 938365034, NULL, '123132123', 1, 'User', 6, '1.png', 0, '2023-11-21 21:59:10', 1),
(7, 'sesojod', NULL, 488873734, NULL, '67 Phu Dong Thien Vuong P11 Q5', 0, 'User', 7, '1.png', 0, '2023-12-06 21:36:02', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`customerId`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderid` (`orderid`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryid` (`categoryid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accountId` (`accountId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `order` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `category` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
