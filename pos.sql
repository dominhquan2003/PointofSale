-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2023 at 05:03 AM
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
CREATE DATABASE IF NOT EXISTS `pos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pos`;

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
(2, 'doquan23032003@gmail.com', '$2b$10$6zQn2hAQPTatskk/1hMUNOlyUW0WcGTBxd6ZB4RooMujDM7uZWlLK', 'doquan23032003'),
(3, 'liwih71723@getmola.com', '$2b$10$cSPcviiq.SfMdHdH7mhc3.EzwAIrBJw9uK9sBK1IAfhWNQIPfkz0a', 'liwih71723'),
(4, 'typhuxinchao@gmail.com', '$2b$10$dU2z79iQBT9cNXJo8ebsNupDFPlamkc8rD3E.US.8jwERGUvlTR1S', 'typhuxinchao');

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
  `address` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `phone`, `address`) VALUES
(1, 'Nguyễn Lê Anh Khoa', '0912345678', '123 Đường Hoàng Văn Thụ, Phường 6, Quận 3, Thành phố Hồ Chí Minh'),
(2, 'Đỗ Trọng Nghĩa', '0345678901', '456 Lê Duẩn, Phường Hải Châu, Quận Hải Châu, Thành phố Hồ Chí Minh'),
(3, 'Tiêu Tuấn Vỹ', '0712345678', '789 Nguyễn Văn Linh, Phường Phú Mỹ, Quận 7, Thành phố Hồ Chí Minh'),
(4, 'Trần Văn Thịnh', '0374532213', '234 Điện Biên Phủ, Phường Thanh Khê, Quận Thanh Khê, Thành phố Hồ Chí Minh'),
(5, 'Vũ Tiến Đạt', '0389012345', '567 Lê Lợi, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh'),
(6, 'Mai Khắc Huy', '0756789012', '890 Trần Hưng Đạo, Phường An Hải Bắc, Quận Sơn Trà, Thành phố Hồ Chí Minh'),
(7, 'Đặng Thị Pháp', '0978901234', '345 Cách Mạng Tháng Tám, Phường Quận 10, Quận 10, Thành phố Hồ Chí Minh'),
(8, 'Nguyễn Hạo Nam ', '0312345678', '678 Trần Phú, Phường 12 Quận 5, Thành phố Hồ Chí Minh '),
(9, 'Henry Nguyễn', '0987445523', '901 Hùng Vương, Phường 11, Quận 5, Thành phố Hồ Chí Minh'),
(10, 'Đỗ Khắc Vỹ', '0923456789', '112 Lê Hồng Phong, Phường 16, Quận 3, Thành phố Hồ Chí Minh'),
(11, 'Do Minh Quan ', '0938365034', '567C Điện Biên Phủ, Phường Bình Thạnh, Quận Bình Thạnh, Thành phố Hồ Chí Minh'),
(12, 'Huynh My Dieu', '0908490807', '234B Lê Văn Sỹ, Phường 1, Quận Tân Bình, Thành phố Hồ Chí Minh'),
(13, 'Nguyễn Trí Nhựt', '0941787787', '789A Nguyễn Thị Minh Khai, Phường 12, Quận 3, Thành phố Hồ Chí Minh'),
(14, 'Châu Quế Như', '0374121240', '61 Phu Dong Thien Vuong p11 q5 Thành phố Hồ Chí Minh'),
(15, 'Do Huu Tri', '0908402245', '23 A Riverside thu thiem Thành phố Hồ Chí Minh'),
(16, 'Do Minh Nguyen', '0913564127', '21A Bui Minh Truc P11 Quan 9 Thành phố Hồ Chí Minh'),
(17, 'Chau Nhuan Trung', '0374121241', '67 Phu Dong Thiên Vương phường 15 quận 1 Thành phố Hồ Chí Minh\r\n'),
(18, 'Nguyễn Vĩnh Khang ', '09135467815', '49 Đông Hồ Phường 15 Q8 Thành phố Hồ Chí Minh'),
(19, 'Nguyen Hoang Phuc ', '0967888444', '23 Hungf Vuong P5 Quan 5 Thành phố Hồ Chí Minh '),
(20, 'Nguyễn Trọng Nhân', '0938365040', '23 Pham The Hien P6 Q8 Thành phố Hồ Chí Minh'),
(21, 'Nguyễn Vĩnh Khiêm', '0947123456', '51 Đông Hồ p6 Quận 8 Thành phố Hồ Chí Minh');

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
(1, 28000000, 28000000, 0, '2023-12-01 02:13:11', 1, 1, 1),
(2, 38000000, 38000000, 0, '2023-12-02 02:13:27', 1, 2, 1),
(3, 38000000, 38000000, 0, '2023-12-03 02:13:45', 1, 3, 1),
(4, 12500000, 13000000, 500000, '2023-12-03 02:14:08', 1, 20, 1),
(5, 13000000, 13000000, 0, '2023-12-04 02:14:24', 1, 19, 1),
(6, 16000000, 16000000, 0, '2023-12-04 02:15:03', 1, 18, 1),
(7, 24000000, 24000000, 0, '2023-12-05 02:15:49', 1, 17, 1),
(8, 38000000, 38000000, 0, '2023-12-06 02:16:01', 1, 16, 1),
(9, 76000000, 76000000, 0, '2023-12-07 02:16:28', 1, 15, 1),
(10, 38000000, 38000000, 0, '2023-12-08 02:16:40', 1, 14, 1),
(11, 16000000, 16000000, 0, '2023-12-09 02:16:51', 1, 13, 1),
(12, 38000000, 38000000, 0, '2023-12-10 02:17:05', 1, 12, 1),
(13, 76000000, 76000000, 0, '2023-12-11 02:17:26', 1, 11, 1),
(14, 21500000, 22000000, 500000, '2023-12-12 02:17:48', 1, 10, 1),
(15, 28900000, 29000000, 100000, '2023-12-13 02:18:03', 1, 9, 1),
(16, 20000000, 20000000, 0, '2023-12-14 02:18:19', 1, 8, 1),
(17, 34200000, 35000000, 800000, '2023-12-14 02:18:43', 1, 7, 1),
(18, 22000000, 22000000, 0, '2023-12-14 02:19:01', 1, 6, 1),
(19, 18000000, 18000000, 0, '2023-12-14 02:19:14', 1, 5, 1),
(20, 25500000, 26000000, 500000, '2023-12-14 02:19:31', 1, 4, 1),
(21, 23200000, 24000000, 800000, '2023-12-14 03:39:29', 1, 11, 4),
(22, 38000000, 38000000, 0, '2023-12-14 03:49:31', 1, 21, 1),
(23, 150000000, 150000000, 0, '2023-12-14 03:52:51', 1, 15, 1);

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
(1, 1, 1, 1, 28000000),
(2, 2, 2, 1, 38000000),
(3, 3, 3, 1, 38000000),
(4, 4, 38, 1, 12500000),
(5, 5, 37, 1, 13000000),
(6, 6, 34, 1, 16000000),
(7, 7, 8, 1, 24000000),
(8, 8, 4, 1, 38000000),
(9, 9, 6, 1, 38000000),
(10, 9, 2, 1, 38000000),
(11, 10, 4, 1, 38000000),
(12, 11, 12, 1, 16000000),
(13, 12, 2, 1, 38000000),
(14, 13, 4, 1, 38000000),
(15, 13, 2, 1, 38000000),
(16, 14, 13, 1, 17000000),
(17, 14, 28, 1, 3000000),
(18, 14, 25, 1, 1500000),
(19, 15, 21, 1, 13200000),
(20, 15, 24, 1, 15700000),
(21, 16, 30, 1, 20000000),
(22, 17, 36, 1, 13000000),
(23, 17, 32, 1, 21200000),
(24, 18, 29, 1, 22000000),
(25, 19, 7, 1, 18000000),
(26, 20, 18, 1, 12000000),
(27, 20, 20, 1, 13500000),
(28, 21, 19, 1, 9700000),
(29, 21, 20, 1, 13500000),
(30, 22, 5, 1, 38000000),
(31, 23, 1, 2, 28000000),
(32, 23, 7, 1, 18000000),
(33, 23, 2, 2, 38000000);

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
(1, 'Iphone 14 Plus Blue', 19000000, 28000000, 17, '4567890123456', '14_plus_xanh.png', 5, '2023-12-14'),
(2, 'Iphone 14 promax purple', 32000000, 38000000, 14, '890132154889', '14promaxtim.png', 5, '2023-12-14'),
(3, 'Iphone 14 promax black', 32000000, 38000000, 19, '8901234567890', 'iphone-14-pro-max-den.jpg', 5, '2023-12-14'),
(4, 'Iphone 15 promax blue', 32000000, 38000000, 17, '8901234273462', '15promaxblue.jpg', 5, '2023-12-14'),
(5, 'Iphone 15 plus', 32000000, 38000000, 19, '8423742684238', 'iphone15plus.jpg', 5, '2023-12-14'),
(6, 'Iphone 15 promax black', 32000000, 38000000, 19, '8901234567890', 'iphone15promax.jpg', 5, '2023-12-14'),
(7, 'iPhone 11 Pro', 12500000, 18000000, 18, '9876543210988', 'iphone11-pro.jpg', 5, '2023-12-14'),
(8, 'iPhone 13', 18000000, 24000000, 19, '8765432109877', 'iphone-13.jpg', 5, '2023-12-14'),
(9, 'Iphone13 mini pink', 21100000, 28700000, 20, '7654321098767', 'iphone-13-mini-pink.jpg', 5, '2023-12-14'),
(10, 'Iphone13 pro', 24000000, 29000000, 20, '6543210987654', 'iphone-13-pro.jpg', 5, '2023-12-14'),
(11, 'Iphone13 SE White', 24300000, 29200000, 20, '5432109876743', 'iphone-se-white.jpg', 5, '2023-12-14'),
(12, 'Asus rog 7 Entry Black', 14000000, 16000000, 24, '1234567890123', 'rog7-entry-black-01-light.png', 2, '2023-12-14'),
(13, 'Asus rog 7', 15000000, 17000000, 24, '9876543210987', 'asus-rog-7.jpg', 2, '2023-12-14'),
(14, 'Vivo x80 blue', 9000000, 11000000, 40, '5678901234567', 'vivo-x80-xanh.jpg', 3, '2023-12-14'),
(15, 'Vivo y15 blue black', 8000000, 12000000, 40, '4321098765431', 'Vivo-y15s-2021-xanh-den.jpg', 3, '2023-12-14'),
(16, 'Vivo v25 yellow', 8500000, 11000000, 40, '8765432109876', 'vivo-v25e-vang-dd.jpg', 3, '2023-12-14'),
(17, 'Vivo v2111', 9700000, 12500000, 40, '2109876543210', 'vivo-v2111.jpg', 3, '2023-12-14'),
(18, 'Vivo v27', 9100000, 12000000, 39, '6543210987658', 'vivo-v27.jpg', 3, '2023-12-14'),
(19, 'Oppo Pro Black', 7800000, 9700000, 34, '0987654321098', 'oppo-find-x5-pro-den.jpg', 4, '2023-12-14'),
(20, 'Oppo A58', 10000000, 13500000, 33, '3210987654322', 'oppo-a58.jpg', 4, '2023-12-14'),
(21, 'Oppo Reno 10 Pro', 11000000, 13200000, 34, '7654321098765', 'oppo-reno-10pro.jpg', 4, '2023-12-14'),
(22, 'Oppo A58 blue', 11100000, 13400000, 35, '2345678901234', 'oppo-a58-6gb-128gb-xanh-1.jpg', 4, '2023-12-14'),
(23, 'Huawei y90', 14500000, 18000000, 30, '6789012345678', 'huawei-y90.jpg', 1, '2023-12-14'),
(24, 'Huawei nova', 13000000, 15700000, 29, '0123456789012', 'huawei-nova.jpg', 1, '2023-12-14'),
(25, 'Case iphone14', 1000000, 1500000, 19, '4321098765432', 'case_iphone14.jpg', 5, '2023-12-14'),
(26, 'Samsung galaxy-z-flip 3 cream', 17000000, 24400000, 30, '3210987654321', 'samsung-galaxy-z-flip-3-cream.jpg', 6, '2023-12-14'),
(27, 'Samsung-galaxy a03', 7000000, 8000000, 30, '2109876543211', 'samsung-galaxy-a03-xanh.jpg', 6, '2023-12-14'),
(28, 'Buds pro ', 2000000, 3000000, 29, '9876543210989', 'buds-pro_1.jpg', 6, '2023-12-14'),
(29, 'Samsung galaxy-z-flip-4', 12800000, 22000000, 29, '8765432109878', 'samsung-galaxy-z-flip-4.jpg', 6, '2023-12-14'),
(30, 'Galaxy S22 Ultra Burgundy', 16000000, 20000000, 29, '7654321098761', 'Galaxy-S22-Ultra-Burgundy.jpg', 6, '2023-12-14'),
(31, 'Galaxy-S22 Black', 16000000, 21000000, 30, '268946642879', 'Galaxy-S22-Black.jpg', 6, '2023-12-14'),
(32, 'Galaxy S22 Plus', 16000000, 21200000, 49, '216231102625', 'galaxy-s22-plus-white.jpg', 6, '2023-12-14'),
(33, 'Xiaomi-11T White', 10000000, 12000000, 30, '691871033066', 'Xiaomi-11T-White.jpg', 7, '2023-12-14'),
(34, 'Redmi Note-11 Twilight Blue', 14000000, 16000000, 29, '482950888081', 'Redmi-Note-11-Twilight-Blue-2.jpg', 7, '2023-12-14'),
(35, 'Xiaomi redmi 10', 11000000, 13000000, 30, '418214515631', 'Xiaomi-11T-White.jpg', 7, '2023-12-14'),
(36, 'Redmi note 12', 9000000, 13000000, 29, '361831223625', 'redmi-note12.jpg', 7, '2023-12-14'),
(37, 'Xiaomi 13C', 11000000, 13000000, 29, '163264563304', 'xiaomi-13C.jpg', 7, '2023-12-14'),
(38, 'Oppo A95', 9000000, 12500000, 34, '356911113486', 'oppo-a95.jpg', 4, '2023-12-14');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `gender` int(11) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL,
  `avatar` varchar(20) DEFAULT NULL,
  `lock_status` int(11) NOT NULL DEFAULT 0,
  `createdAt` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullname`, `age`, `phone`, `address`, `gender`, `role`, `accountId`, `avatar`, `lock_status`, `createdAt`, `status`) VALUES
(1, 'Administrator', 20, 938365034, '51 Nguyen Huu Tho Q7 TPHCM', 1, 'Admin', 1, 'deafaultmen.jpg', 0, '2023-11-18 19:43:03', 1),
(2, 'Do Minh Quan ', 20, 908686823, '21 A Bùi Minh Trực P6 Q9 Thành phố Hồ Chí Minh  ', 1, 'User', 2, 'deafaultmen.jpg', 0, '2023-11-18 20:48:08', 1),
(3, 'Châu Quế Như', 19, 374121240, '61 Phù Đổng Thiên Vương P11 Q3 Thành phố Hồ Chí Minh', 1, 'User', 3, 'deafaultwomen.jpg', 0, '2023-12-14 02:24:02', 1),
(4, 'Nguyễn Xuân Hạ', 20, 917458729, '23 Nguyễn Công Trứ P8 Q10 Thành phố Hồ Chí Minh', 1, 'User', 4, 'deafaultwomen.jpg', 0, '2023-12-14 03:31:18', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
