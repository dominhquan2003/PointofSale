CREATE TABLE `Category` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50),
  `image` VARCHAR(50),
  `code` VARCHAR(50),

);

CREATE TABLE `Product` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50),
  `importprice` DECIMAL,
  `retailprice` DECIMAL,
  `quantity` INT,
  `barcode` VARCHAR(100),
  `image` VARCHAR(50),
  `categoryid` INT,
  `createdAt` VARCHAR(50)
);

CREATE TABLE `Customer` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50),
  `phone` VARCHAR(20),
  `address` VARCHAR(50)
);

CREATE TABLE `User` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `fullname` VARCHAR(50),
  `age` INT , 
  `phone` INT ,
  `dateofbirth` varchar(50) ,
  `address` VARCHAR(10) NOT NULL,
  `gender` INT,
  `role` VARCHAR(20),
  `accountId` int UNiQUE,
  `createdAt` VARCHAR(50),
  `status` INT

);

CREATE TABLE `Account` (
   `id` INT PRIMARY KEY AUTO_INCREMENT,
   `email` VARCHAR(50) NOT NULL,
   `password` VARCHAR(100),
    `username` VARCHAR(100),
  

);



CREATE TABLE `Order` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `totalprice` DECIMAL,
  `createdAt` VARCHAR(50),
  `status` INT,
  `customerId` INT
);

CREATE TABLE `Orderdetail` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `orderid` INT,
  `productid` INT,
  `quantity` INT,
  `price` DECIMAL
);

ALTER TABLE `Product` ADD FOREIGN KEY (`categoryid`) REFERENCES `Category` (`id`) ON DELETE CASCADE;

ALTER TABLE `Order` ADD FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE CASCADE;

ALTER TABLE `Orderdetail` ADD FOREIGN KEY (`orderid`) REFERENCES `Order` (`id`) ON DELETE CASCADE;

ALTER TABLE `Orderdetail` ADD FOREIGN KEY (`productid`) REFERENCES `Product` (`id`) ON DELETE CASCADE;


ALTER TABLE `User` ADD  FOREIGN KEY(`accountId`) REFERENCES `Account` (`id`) ON DELETE CASCADE;


ALTER TABLE product AUTO_INCREMENT = 0  ; 
ALTER TABLE `order` AUTO_INCREMENT = 0  ; 
ALTER TABLE orderdetail AUTO_INCREMENT = 0  ; 
INSERT INTO product (name, importprice, retailprice, quantity, barcode, image, categoryid,createdAt) 
VALUES
    ('Iphone 14 plus blue', 19000000,28000000, 20, '4567890123456', '14_plus_xanh.png', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('Iphone 14 promax black', 32000000,38000000, 20, '8901234567890', 'iphone-14-pro-max-den.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('Iphone 15 promax blue', 32000000,38000000, 20, '8901234273462', '15promaxblue.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('Iphone 15 plus', 32000000,38000000, 20, '8423742684238', 'iphone15plus.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('Iphone 15 promax black', 32000000,38000000, 20, '8901234567890', 'iphone15promax.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('iPhone 11 Pro', 12500000,18000000, 20, '9876543210988', 'iphone11-pro.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('iPhone 13', 18000000,24000000, 20, '8765432109877', 'iphone-13.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('Iphone13 mini pink', 21100000,28700000, 20, '7654321098767', 'iphone-13-mini-pink.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('Iphone13 pro', 24000000,29000000, 20, '6543210987654', 'iphone-13-pro.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('Iphone13 SE White', 24300000,29200000, 20, '5432109876743', 'iphone-se-white.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('Asus rog 7 Entry Black', 14000000,16000000, 25, '1234567890123', 'rog7-entry-black-01-light.png', (SELECT id FROM category WHERE name = 'Asus'), NOW()),
    ('Asus rog 7', 15000000,17000000, 25, '9876543210987', 'asus-rog-7.jpg', (SELECT id FROM category WHERE name = 'Asus'), NOW()),
    ('Vivo x80 blue', 9000000,11000000, 40, '5678901234567', 'vivo-x80-xanh.jpg', (SELECT id FROM category WHERE name = 'Vivo'), NOW()),
    ('Vivo y15 blue black', 8000000,12000000, 40, '4321098765431', 'Vivo-y15s-2021-xanh-den.jpg', (SELECT id FROM category WHERE name = 'Vivo'), NOW()),
    ('Vivo v25 yellow', 85000000,11000000, 40, '8765432109876', 'vivo-v25e-vang-dd.jpg', (SELECT id FROM category WHERE name = 'Vivo'), NOW()),
    ('Vivo v2111', 97000000,12500000, 40, '2109876543210', 'vivo-v2111.jpg', (SELECT id FROM category WHERE name = 'Vivo'), NOW()),
    ('Vivo v27', 91000000,12000000, 40, '6543210987658', 'vivo-v27.jpg', (SELECT id FROM category WHERE name = 'Vivo'), NOW()),
    ('Oppo Pro Black', 78000000,9700000, 35, '0987654321098', 'oppo-find-x5-pro-den.jpg', (SELECT id FROM category WHERE name = 'Oppo'), NOW()),
    ('Oppo A58', 10000000,13500000, 35, '3210987654322', 'oppo-a58.jpg', (SELECT id FROM category WHERE name = 'Oppo'), NOW()),
    ('Oppo Reno 10 Pro', 11000000,13200000, 35, '7654321098765', 'oppo-reno-10pro.jpg', (SELECT id FROM category WHERE name = 'Oppo'), NOW()),
    ('Oppo A58 blue', 11100000,13400000, 35, '2345678901234', 'oppo-a58-6gb-128gb-xanh-1.jpg', (SELECT id FROM category WHERE name = 'Oppo'), NOW()),
    ('Huawei y90', 14500000,18000000, 30, '6789012345678', 'huawei-y90.jpg', (SELECT id FROM category WHERE name = 'Huawei'), NOW()),
    ('Huawei nova', 13000000,15700000, 30, '0123456789012', 'huawei-nova.jpg', (SELECT id FROM category WHERE name = 'Huawei'), NOW()),
    ('Case iphone14', 1000000,  1500000, 20, '4321098765432', 'case_iphone14.jpg', (SELECT id FROM category WHERE name = 'Apple'), NOW()),
    ('Samsung galaxy-z-flip 3 cream', 17000000,24400000, 30, '3210987654321', 'samsung-galaxy-z-flip-3-cream.jpg', (SELECT id FROM category WHERE name = 'Samsung'), NOW()),
    ('Samsung-galaxy a03', 7000000,8000000, 30, '2109876543211', 'samsung-galaxy-a03-xanh.jpg', (SELECT id FROM category WHERE name = 'Samsung'), NOW()),
    ('Buds pro ', 2000000,3000000, 30, '9876543210989', 'buds-pro_1.jpg', (SELECT id FROM category WHERE name = 'Samsung'), NOW()),
    ('Samsung galaxy-z-flip-4', 12800000,22000000, 30, '8765432109878', 'samsung-galaxy-z-flip-4.jpg', (SELECT id FROM category WHERE name = 'Samsung'), NOW()),
    ('Galaxy S22 Ultra Burgundy', 16000000,20000000, 30, '7654321098761', 'Galaxy-S22-Ultra-Burgundy.jpg', (SELECT id FROM category WHERE name = 'Samsung'), NOW()),
    ('Galaxy-S22 Black', 16000000,21000000, 30, '268946642879', 'Galaxy-S22-Black.jpg', (SELECT id FROM category WHERE name = 'Samsung'), NOW()),
    ('Galaxy S22 Plus', 16000000,21200000, 50, '216231102625', 'galaxy-s22-plus-white.jpg', (SELECT id FROM category WHERE name = 'Samsung'), NOW()),
    ('Xiaomi-11T White', 10000000,12000000, 30, '691871033066', 'Xiaomi-11T-White.jpg', (SELECT id FROM category WHERE name = 'Xiaomi'), NOW()),
    ('Redmi Note-11 Twilight Blue', 14000000,16000000, 30, '482950888081', 'Redmi-Note-11-Twilight-Blue-2.jpg', (SELECT id FROM category WHERE name = 'Xiaomi'), NOW()),
    ('Xiaomi redmi 10', 11000000,13000000, 30, '418214515631', 'Xiaomi-11T-White.jpg', (SELECT id FROM category WHERE name = 'Xiaomi'), NOW()),
    ('Redmi note 12', 9000000,13000000, 30, '361831223625', 'redmi-note12.jpg', (SELECT id FROM category WHERE name = 'Xiaomi'), NOW()),
    ('Xiaomi 13C', 11000000,13000000, 30, '163264563304', 'xiaomi-13C.jpg', (SELECT id FROM category WHERE name = 'Xiaomi'), NOW()),
    ('Oppo A95', 9000000,12500000, 35, '356911113486', 'oppo-a95.jpg', (SELECT id FROM category WHERE name = 'Oppo'), NOW()),

-- INSERT INTO category (name, image, code) VALUES
--     ('Huawei', 'huawei.png', 'HW2023001'),
--     ('Asus', 'asus_icon.png', 'AS2023001'),
--     ('Vivo', 'vivo_icon.png', 'VO2023001'),
--     ('Oppo', 'oppo_icon.png', 'OP2023001'),
--     ('Apple', 'apple-logo.png', 'AP2023001'),
--     ('Samsung', 'samsung_icon.png', 'SA2023001'),
--     ('Xiaomi', 'xiaomi_logo.png', 'XM2023001'),
