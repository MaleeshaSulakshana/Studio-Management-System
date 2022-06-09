-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2021 at 10:01 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studio_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image1` varchar(255) NOT NULL,
  `image2` varchar(255) NOT NULL,
  `image3` varchar(255) NOT NULL,
  `image4` varchar(255) NOT NULL,
  `image5` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `title`, `description`, `image1`, `image2`, `image3`, `image4`, `image5`) VALUES
('e2378bb6c6', 'Birthday album', 'This is a birth day album', 'https://firebasestorage.googleapis.com/v0/b/hk-wewalage-photograpy.appspot.com/o/payment%2Fe2378bb6c6%2Fwp5044952%20-%20Copy.jpg?alt=media&token=d3c8080a-f6d2-4e72-ba05-916ae9dd3d42', 'https://firebasestorage.googleapis.com/v0/b/hk-wewalage-photograpy.appspot.com/o/payment%2Fe2378bb6c6%2Fwp5044952.jpg?alt=media&token=3bd1f620-9896-4505-8214-3fb8aa588608', 'https://firebasestorage.googleapis.com/v0/b/hk-wewalage-photograpy.appspot.com/o/payment%2Fe2378bb6c6%2Fwp1873195%20-%20Copy%20(2).jpg?alt=media&token=e2297b03-1e8c-4b34-8033-63e9a4001f6c', 'https://firebasestorage.googleapis.com/v0/b/hk-wewalage-photograpy.appspot.com/o/payment%2Fe2378bb6c6%2Fwp1873195%20-%20Copy.jpg?alt=media&token=a8346476-7c97-4084-8d36-f2b0db0ae898', 'https://firebasestorage.googleapis.com/v0/b/hk-wewalage-photograpy.appspot.com/o/payment%2Fe2378bb6c6%2Fwp1873195.jpg?alt=media&token=c2fdab81-c031-4fd7-99d5-0cd370b2fee5');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` varchar(255) NOT NULL,
  `album_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `album_id`, `name`, `comment`) VALUES
('8270b52e644c8220', '7ddde64df9', 'Maleesha', 'Its Good Album'),
('c7be92d89a32293e', 'c42affbee2', 'Ashan', 'Brilliant album'),
('d8a54d165d9515c7', 'c42affbee2', 'Thankshila', 'Superb album'),
('47d2bd414635ff55', 'c42affbee2', 'Adithya', 'Its beautiful ');

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `order_items` varchar(1000) NOT NULL,
  `status` varchar(255) NOT NULL,
  `total` varchar(255) DEFAULT NULL,
  `person` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`id`, `name`, `number`, `email`, `address`, `order_items`, `status`, `total`, `person`) VALUES
('58bdc0cfcf', 'Maleesha Manamendra Patabendige', '0767950600', 'maleesha@gmail.com', '406/5/1', 'Item-Code: I002, Item-Name: Blue Bulb, Qty: 15 => ', 'On Delivery', '1121460', 'E002');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `qualifications` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `psw` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `number`, `address`, `qualifications`, `email`, `psw`, `type`) VALUES
('E002', 'dfdsf', '0767950600', '406/5/1', 'aefedf', 'adsf@g.vcm', 'dfgdfghg', 'Delivery'),
('E001', 'Maleesha', '0767950600', '406/5/1', 'abcd', 'maleesha@gmail.com', '12345678', 'Graphic Designer'),
('E003', 'MSulakshana', '0767950600', '406/5/1', 'hello world', 'msulakshana@gmail.com', '1`2345678', 'Photo Grapher'),
('E004', 'Ashan', '0767950600', '406/5/1', 'hello world', 'ashan@gmail.com', '123456', 'Delivery'),
('E008', 'Maleesha', '0767950600', '406/5/1', 'Hello', 'maleeshas@gmail.com', '112345678', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `event_type` varchar(255) NOT NULL,
  `service_type` varchar(255) NOT NULL,
  `payment_image` varchar(1000) NOT NULL,
  `assign` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `address`, `email`, `number`, `date`, `time`, `event_type`, `service_type`, `payment_image`, `assign`, `status`) VALUES
('806ecf2036', 'Maleesha Manamendra Patabendige', '406/5/1', 'maleesha@gmail.com', '0767950600', '2021-10-15', '12:54', 'Birthday', 'Video Grapher', 'https://firebasestorage.googleapis.com/v0/b/hk-wewalage-photograpy.appspot.com/o/payment%2F806ecf2036%2Fvideo_upload.jpg?alt=media&token=cc5cf6be-9e35-428a-b6c3-60f1de28ef31', '', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `graphic_design`
--

CREATE TABLE `graphic_design` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `design` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `appointment` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `graphic_design`
--

INSERT INTO `graphic_design` (`id`, `name`, `design`, `email`, `number`, `appointment`, `description`, `type`, `status`) VALUES
('f8337b15ae', 'Maleesha Manamendra Patabendige', 'qwsa', 'malees@gmail.com', '0767950600', 'yes', 'sdsd', 'logo', 'pending'),
('6289bc6796', 'Maleesha Manamendra Patabendige', 'https://firebasestorage.googleapis.com/v0/b/hk-wewalage-photograpy.appspot.com/o/graphic%2F6289bc6796%2Fwp1873195%20-%20Copy%20(2).jpg?alt=media&token=72dbcc0c-ed19-486c-a6fd-7f787f5226e4', 'maleesha@gmail.com', '0767950600', '', 'Hello world', 'edit', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `item_desc` varchar(1000) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `qty`, `price`, `type`, `item_desc`, `image`) VALUES
('I001', 'Red Bulb', '111', '74744', 'Decorative Items', 'Good Quality products we have', 'bg.jpeg'),
('I002', 'Blue Bulb', '10', '74744', 'Decorative Items', 'Good Quality products we have', 'bg.jpeg'),
('I005', 'Photo Frame', '20', '500', 'Personalized Items', 'Good Quality products we have', 'backgroud (1).jpg');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `order_items` varchar(1000) NOT NULL,
  `status` varchar(255) NOT NULL,
  `total` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `number`, `email`, `address`, `order_items`, `status`, `total`) VALUES
('58bdc0cfcf', 'Maleesha Manamendra Patabendige', '0767950600', 'maleesha@gmail.com', '406/5/1', 'Item-Code: I002, Item-Name: Blue Bulb, Qty: 15 => ', 'Complete', '1121460');

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `inquiry` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`id`, `name`, `number`, `email`, `inquiry`) VALUES
('28d153342f', 'Maleesha Manamendra Patabendige', '0767950600', 'maleesha@gmail.com', 'Hello world'),
('32dbab71cf', 'Maleesha Manamendra Patabendige', '0767950600', 'ms@gmail.com', 'Hi, How are you');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
