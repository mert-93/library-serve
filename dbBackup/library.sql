-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: mysql:3306
-- Üretim Zamanı: 24 Oca 2023, 01:12:56
-- Sunucu sürümü: 10.10.2-MariaDB-1:10.10.2+maria~ubu2204
-- PHP Sürümü: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `library`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblAuthors`
--

CREATE TABLE `tblAuthors` (
  `Id` int(11) NOT NULL,
  `FirstName` varchar(256) NOT NULL,
  `LastName` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblBooks`
--

CREATE TABLE `tblBooks` (
  `Id` int(11) NOT NULL,
  `BookName` varchar(256) NOT NULL,
  `BookPageCount` int(11) NOT NULL,
  `BookType` varchar(256) NOT NULL,
  `AuthorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblLibrariesBooks`
--

CREATE TABLE `tblLibrariesBooks` (
  `Id` int(11) NOT NULL,
  `LibraryId` int(11) NOT NULL,
  `BookId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblLibrary`
--

CREATE TABLE `tblLibrary` (
  `Id` int(11) NOT NULL,
  `LibraryName` varchar(256) NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUser`
--

CREATE TABLE `tblUser` (
  `Id` int(11) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `EmailAddress` varchar(200) NOT NULL,
  `Password` varchar(99) NOT NULL,
  `UserTypeName` varchar(25) NOT NULL DEFAULT 'Staff'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserType`
--

CREATE TABLE `tblUserType` (
  `UserTypeName` varchar(25) NOT NULL,
  `UserTypeNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Tablo döküm verisi `tblUserType`
--

INSERT INTO `tblUserType` (`UserTypeName`, `UserTypeNumber`) VALUES
('Administrator', 666),
('User', 555);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwBookList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwBookList` (
`Id` int(11)
,`BookName` varchar(256)
,`BookPageCount` int(11)
,`BookType` varchar(256)
,`AuthorId` int(11)
,`Author Name` text
);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwLibrariesBooksList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwLibrariesBooksList` (
`Id` int(11)
,`LibraryId` int(11)
,`LibraryName` varchar(256)
,`BookId` int(11)
,`BookName` varchar(256)
,`BookPageCount` int(11)
,`BookType` varchar(256)
,`Author Name` text
,`UserId` int(11)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwUserList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwUserList` (
`Id` int(11)
,`FirstName` varchar(100)
,`LastName` varchar(100)
,`EmailAddress` varchar(200)
,`UserTypeName` varchar(25)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwUsersLibrariesList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwUsersLibrariesList` (
`Id` int(11)
,`LibraryName` varchar(256)
,`UserId` int(11)
,`FirstName` varchar(100)
,`LastName` varchar(100)
,`EmailAddress` varchar(200)
,`UserTypeName` varchar(25)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwBookList`
--
DROP TABLE IF EXISTS `vwBookList`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vwBookList`  AS SELECT `tblBooks`.`Id` AS `Id`, `tblBooks`.`BookName` AS `BookName`, `tblBooks`.`BookPageCount` AS `BookPageCount`, `tblBooks`.`BookType` AS `BookType`, `tblBooks`.`AuthorId` AS `AuthorId`, concat(`tblAuthors`.`FirstName`,' ',`tblAuthors`.`LastName`) AS `Author Name` FROM (`tblBooks` join `tblAuthors` on(`tblBooks`.`AuthorId` = `tblAuthors`.`Id`))  ;

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwLibrariesBooksList`
--
DROP TABLE IF EXISTS `vwLibrariesBooksList`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vwLibrariesBooksList`  AS SELECT `tblLibrariesBooks`.`Id` AS `Id`, `tblLibrariesBooks`.`LibraryId` AS `LibraryId`, `tblLibrary`.`LibraryName` AS `LibraryName`, `tblLibrariesBooks`.`BookId` AS `BookId`, `tblBooks`.`BookName` AS `BookName`, `tblBooks`.`BookPageCount` AS `BookPageCount`, `tblBooks`.`BookType` AS `BookType`, concat(`tblAuthors`.`FirstName`,' ',`tblAuthors`.`LastName`) AS `Author Name`, `tblLibrary`.`UserId` AS `UserId` FROM (((`tblLibrariesBooks` join `tblLibrary` on(`tblLibrariesBooks`.`LibraryId` = `tblLibrary`.`Id`)) join `tblBooks` on(`tblLibrariesBooks`.`BookId` = `tblBooks`.`Id`)) join `tblAuthors` on(`tblAuthors`.`Id` = `tblBooks`.`AuthorId`))  ;

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwUserList`
--
DROP TABLE IF EXISTS `vwUserList`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vwUserList`  AS SELECT `tblUser`.`Id` AS `Id`, `tblUser`.`FirstName` AS `FirstName`, `tblUser`.`LastName` AS `LastName`, `tblUser`.`EmailAddress` AS `EmailAddress`, `tblUser`.`UserTypeName` AS `UserTypeName` FROM `tblUser``tblUser`  ;

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwUsersLibrariesList`
--
DROP TABLE IF EXISTS `vwUsersLibrariesList`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `vwUsersLibrariesList`  AS SELECT `tblLibrary`.`Id` AS `Id`, `tblLibrary`.`LibraryName` AS `LibraryName`, `tblUser`.`Id` AS `UserId`, `tblUser`.`FirstName` AS `FirstName`, `tblUser`.`LastName` AS `LastName`, `tblUser`.`EmailAddress` AS `EmailAddress`, `tblUser`.`UserTypeName` AS `UserTypeName` FROM (`tblUser` join `tblLibrary` on(`tblUser`.`Id` = `tblLibrary`.`UserId`))  ;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tblAuthors`
--
ALTER TABLE `tblAuthors`
  ADD PRIMARY KEY (`Id`);

--
-- Tablo için indeksler `tblBooks`
--
ALTER TABLE `tblBooks`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `AuthorId` (`AuthorId`);

--
-- Tablo için indeksler `tblLibrariesBooks`
--
ALTER TABLE `tblLibrariesBooks`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `LibraryId` (`LibraryId`),
  ADD KEY `LibraryId_2` (`LibraryId`),
  ADD KEY `BookId` (`BookId`);

--
-- Tablo için indeksler `tblLibrary`
--
ALTER TABLE `tblLibrary`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`);

--
-- Tablo için indeksler `tblUser`
--
ALTER TABLE `tblUser`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `EmailAddress` (`EmailAddress`),
  ADD KEY `UserTypeName` (`UserTypeName`);

--
-- Tablo için indeksler `tblUserType`
--
ALTER TABLE `tblUserType`
  ADD PRIMARY KEY (`UserTypeName`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tblAuthors`
--
ALTER TABLE `tblAuthors`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `tblBooks`
--
ALTER TABLE `tblBooks`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `tblLibrariesBooks`
--
ALTER TABLE `tblLibrariesBooks`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `tblLibrary`
--
ALTER TABLE `tblLibrary`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `tblUser`
--
ALTER TABLE `tblUser`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `tblBooks`
--
ALTER TABLE `tblBooks`
  ADD CONSTRAINT `tblBooks_ibfk_1` FOREIGN KEY (`AuthorId`) REFERENCES `tblAuthors` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Tablo kısıtlamaları `tblLibrariesBooks`
--
ALTER TABLE `tblLibrariesBooks`
  ADD CONSTRAINT `tblLibrariesBooks_ibfk_1` FOREIGN KEY (`BookId`) REFERENCES `tblBooks` (`Id`),
  ADD CONSTRAINT `tblLibrariesBooks_ibfk_2` FOREIGN KEY (`LibraryId`) REFERENCES `tblLibrary` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Tablo kısıtlamaları `tblLibrary`
--
ALTER TABLE `tblLibrary`
  ADD CONSTRAINT `tblLibrary_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `tblUser` (`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Tablo kısıtlamaları `tblUser`
--
ALTER TABLE `tblUser`
  ADD CONSTRAINT `tblUser_ibfk_1` FOREIGN KEY (`UserTypeName`) REFERENCES `tblUserType` (`UserTypeName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
