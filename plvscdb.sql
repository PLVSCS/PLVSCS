-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2022 at 02:23 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plvscdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `idNo` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `contactNo` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `departmentCode` int(11) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `adminType` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `idNo`, `email`, `surname`, `contactNo`, `firstName`, `middleName`, `username`, `departmentCode`, `department`, `password`, `adminType`) VALUES
(1, 2020, 'jpolivar@gmail.com', 'Olivar', '09090909090', 'Jay Pee', '', 'jp', 0, 'NSTP', 'eao1', 'eao'),
(2, 4040, 'lorraineangelilibatique@gmail.com', 'Libatique', '09090909090', 'Lorraine Angeli', '', 'lorr', 0, 'CEIT', 'oic1', 'oic'),
(4, 19, 'kristaperlada@gmail.com', 'Perlada', '09225577861', 'Krista', ' ', NULL, 0, 'Accounting', '08141999', 'eao'),
(5, 19, 'genfrancisco@gmail.com', 'Francisco', '09225577861', 'Geneva', ' ', NULL, 0, 'IT Department', 'genfrancisco', 'oic'),
(6, 20, 'ccorazon645@gmail.com', 'Cruz', '09420509572', 'Corazon', 'Agustin', NULL, 0, 'Accounting', 'cruz645', 'eao'),
(7, 20, 'juliocruz@gmail.com', 'Cruz', '09672180574', 'Julio', 'Sabado', NULL, 0, 'NSTP', 'cruz5065', 'oic');

-- --------------------------------------------------------

--
-- Table structure for table `adminandcreatedevent`
--

CREATE TABLE `adminandcreatedevent` (
  `adminId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `adminandcreatedevent`
--

INSERT INTO `adminandcreatedevent` (`adminId`, `eventId`) VALUES
(2020, 7),
(2020, 8),
(2020, 9),
(2020, 10),
(2020, 11),
(2020, 12),
(2020, 13),
(2020, 14),
(2020, 15),
(2020, 16);

-- --------------------------------------------------------

--
-- Table structure for table `adminnoofnotification`
--

CREATE TABLE `adminnoofnotification` (
  `adminId` varchar(255) NOT NULL,
  `noOfNotification` int(11) NOT NULL DEFAULT 0,
  `adminType` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `adminnoofnotification`
--

INSERT INTO `adminnoofnotification` (`adminId`, `noOfNotification`, `adminType`) VALUES
('1', 0, 'eao'),
('2', 0, 'oic'),
('3', 5, 'eao'),
('4', 0, 'eao'),
('5', 2, 'oic'),
('6', 0, 'eao'),
('7', 0, 'oic');

-- --------------------------------------------------------

--
-- Table structure for table `adminnotification`
--

CREATE TABLE `adminnotification` (
  `id` int(11) NOT NULL,
  `adminId` varchar(255) NOT NULL,
  `notification` text NOT NULL,
  `isSeen` tinyint(1) NOT NULL DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `eventName` varchar(255) DEFAULT NULL,
  `eventHours` varchar(255) DEFAULT NULL,
  `eventStartDate` varchar(255) DEFAULT NULL,
  `eventEndDate` varchar(255) DEFAULT NULL,
  `eventNoOfStudent` varchar(255) DEFAULT NULL,
  `eventVenue` varchar(255) DEFAULT NULL,
  `eventNeededMaterial` varchar(255) DEFAULT NULL,
  `studentParticipating` int(11) DEFAULT 0,
  `eventStatus` tinyint(1) DEFAULT 0,
  `scannedImage` varchar(1000) DEFAULT NULL,
  `dateAndTime` varchar(255) DEFAULT NULL,
  `isEventDone` tinyint(1) NOT NULL DEFAULT 0,
  `isValidated` tinyint(1) NOT NULL DEFAULT 0,
  `schoolYear` varchar(255) NOT NULL,
  `semester` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `eventName`, `eventHours`, `eventStartDate`, `eventEndDate`, `eventNoOfStudent`, `eventVenue`, `eventNeededMaterial`, `studentParticipating`, `eventStatus`, `scannedImage`, `dateAndTime`, `isEventDone`, `isValidated`, `schoolYear`, `semester`) VALUES
(15, 'Blood Donation', '10', '2022-05-19', '2022-05-21', 'Unlimited Number of Student', 'Alert Center', 'Ballpen, Valtrace', 0, 1, 'uploads/maxresdefault.jpg', '8am-5pm', 0, 0, '2021-2022', '2nd Semester'),
(16, 'Library', '15', '2022-05-19', '2022-05-19', '15', 'PLV Maysan', 'None', 1, 1, 'uploads/275174571_516296976508338_949279525004280798_n.jpg', '8am-5pm', 0, 1, '2021-2022', '2nd Semester');

-- --------------------------------------------------------

--
-- Table structure for table `eventandwishingtoparticipate`
--

CREATE TABLE `eventandwishingtoparticipate` (
  `eventId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- --------------------------------------------------------

--
-- Table structure for table `eventstudentandhours`
--

CREATE TABLE `eventstudentandhours` (
  `eventId` int(11) DEFAULT 1,
  `studentId` int(11) DEFAULT NULL,
  `timeIn` varchar(255) NOT NULL DEFAULT '00:00',
  `timeOut` varchar(255) NOT NULL DEFAULT '00:00',
  `hourRendered` varchar(255) DEFAULT '0',
  `hours_multiplier` int(11) DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `studentNo` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `contactNo` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `emergencyName` varchar(255) DEFAULT NULL,
  `emergencyNumber` varchar(255) DEFAULT NULL,
  `studentStatus` varchar(255) NOT NULL DEFAULT '''active''',
  `lackingHours` int(11) NOT NULL DEFAULT 160,
  `academicYearStarted` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `studentNo`, `email`, `surname`, `contactNo`, `firstName`, `address`, `middleName`, `username`, `course`, `password`, `emergencyName`, `emergencyNumber`, `studentStatus`, `lackingHours`, `academicYearStarted`) VALUES
(1, '18-001', 'lorraineangelilibatique@gmail.com', 'Libatique', '09424173121', 'Lorraine Angeli', 'Malinta Valenzuela City', 'Cruz', 'lorr', 'Bachelor of Science in Information Technology', 'student1', 'undefined', 'undefined', '\'active\'', 160, '13-14'),
(5, '18-0230', 'almarglenmarcelo@gmail.com', 'Marcelo', '09363435662', 'Almar', 'Malinta Valenzuela City', 'Ignacio', NULL, 'Bachelor of Science in Information Technology', '07282000', 'undefined', 'undefined', '\'active\'', 160, '18-19'),
(3, '18-0000', 'vhang.agustin.cruz@gmail.com', 'Libatique', '09424173121', 'Evangeline', 'Malinta Valenzuela City', 'Cruz', 'lrain', 'Bachelor of Science in Electrical Engineering', 'student2', 'undefined', 'undefined', '\'active\'', 160, '13-14'),
(6, '18-0357', 'janinedianemaxion@gmail.com', 'Maxion', '09993094614', 'Janine', 'Orange Ville, Dalandanan, Valenzuela City', 'Cruz', NULL, 'Bachelor of Science in Information Technology', '18-0357Maxion', 'undefined', 'undefined', '\'active\'', 160, '21-22');

-- --------------------------------------------------------

--
-- Table structure for table `studentandeventparticipatedin`
--

CREATE TABLE `studentandeventparticipatedin` (
  `eventId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED;

-- --------------------------------------------------------

--
-- Table structure for table `studentnoofnotification`
--

CREATE TABLE `studentnoofnotification` (
  `studentId` varchar(255) NOT NULL,
  `noOfNotification` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `studentnoofnotification`
--

INSERT INTO `studentnoofnotification` (`studentId`, `noOfNotification`) VALUES
('4', 2),
('3', 2),
('1', 0),
('2', 5),
('5', 0),
('6', 0);

-- --------------------------------------------------------

--
-- Table structure for table `studentnotification`
--

CREATE TABLE `studentnotification` (
  `id` int(11) NOT NULL,
  `studentId` varchar(255) NOT NULL,
  `notification` text NOT NULL,
  `isSeen` tinyint(1) NOT NULL DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `id` (`id`) USING BTREE;

--
-- Indexes for table `adminandcreatedevent`
--
ALTER TABLE `adminandcreatedevent`
  ADD KEY `adminId` (`adminId`) USING BTREE;

--
-- Indexes for table `adminnotification`
--
ALTER TABLE `adminnotification`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`studentNo`) USING BTREE,
  ADD UNIQUE KEY `id` (`id`) USING BTREE;

--
-- Indexes for table `studentnotification`
--
ALTER TABLE `studentnotification`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `adminnotification`
--
ALTER TABLE `adminnotification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `studentnotification`
--
ALTER TABLE `studentnotification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
