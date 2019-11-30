-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: revamp_db
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `locality` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'puthuyir','2019-11-17 17:16:25','puthuyir','2019-11-17 17:16:25','31','ad','Tirupur','India','Coimbatore','Alagumalai','641665','Tamil Nadu'),(2,'puthuyir','2019-11-17 17:20:18','puthuyir','2019-11-17 17:20:18','23','sadfsa','Tirupur','India','Coimbatore','Kandiankoil','641665','Tamil Nadu'),(3,'puthuyir','2019-11-17 17:21:46','puthuyir','2019-11-17 17:21:46','123','adfad','Tirupur','India','Coimbatore','Thonguttipalayam','641665','Tamil Nadu'),(4,'puthuyir','2019-11-19 16:11:09','puthuyir','2019-11-19 16:11:09','3/28','ABC','Tirupur','India','Coimbatore','Thonguttipalayam','641665','Tamil Nadu'),(5,'puthuyir','2019-11-26 14:32:21','puthuyir','2019-11-26 14:32:21','123','abc','Tirupur','India','Coimbatore','Peruntholuvu','641665','Tamil Nadu'),(6,'puthuyir','2019-11-26 16:17:47','puthuyir','2019-11-26 16:17:47','12','ABC','Tirupur','India','Coimbatore','Kandiankoil','641665','Tamil Nadu');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audittrail`
--

DROP TABLE IF EXISTS `audittrail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audittrail` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `roleid` int(11) DEFAULT NULL,
  `lastlogindate` datetime(6) DEFAULT NULL,
  `lastupdateddate` datetime(6) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audittrail_user_userid` (`userid`),
  CONSTRAINT `audittrail_user_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audittrail`
--

LOCK TABLES `audittrail` WRITE;
/*!40000 ALTER TABLE `audittrail` DISABLE KEYS */;
/*!40000 ALTER TABLE `audittrail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `contacts_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `pri_email` varchar(255) DEFAULT NULL,
  `pri_name` varchar(255) DEFAULT NULL,
  `pri_num` varchar(255) DEFAULT NULL,
  `sec_email` varchar(255) DEFAULT NULL,
  `sec_name` varchar(255) DEFAULT NULL,
  `sec_num` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`contacts_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'puthuyir','2019-11-19 16:11:09','puthuyir','2019-11-19 16:11:09','government@gmail.com','Primary','9876543210','sec@gmail.com','Sec','1234567890'),(2,'puthuyir','2019-11-19 16:11:09','puthuyir','2019-11-19 16:11:09','private@gmail.com','Primary','9876543210','sec@gmail.com','Sec','1234567890');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deo_file`
--

DROP TABLE IF EXISTS `deo_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deo_file` (
  `deo_file_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `image` longblob NOT NULL,
  `deo_info_id` bigint(20) NOT NULL,
  PRIMARY KEY (`deo_file_id`),
  KEY `FKsog7ogk3quunkdbunu408pemj` (`deo_info_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deo_file`
--

LOCK TABLES `deo_file` WRITE;
/*!40000 ALTER TABLE `deo_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `deo_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deo_info`
--

DROP TABLE IF EXISTS `deo_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deo_info` (
  `deo_info_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `deo_file_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`deo_info_id`),
  KEY `FKfticu4fx8ny9hjtxi8k0h0ov` (`deo_file_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deo_info`
--

LOCK TABLES `deo_info` WRITE;
/*!40000 ALTER TABLE `deo_info` DISABLE KEYS */;
INSERT INTO `deo_info` VALUES (1,'puthuyir','2019-11-30 17:39:04','puthuyir','2019-11-30 17:39:04',1,0,'DEOapproved',NULL),(2,'puthuyir','2019-11-30 17:57:51','puthuyir','2019-11-30 17:57:51',1,0,'DEOapproved',NULL),(3,'puthuyir','2019-11-30 18:02:47','puthuyir','2019-11-30 18:02:47',1,0,'DEOrejected',NULL),(4,'puthuyir','2019-11-30 18:09:02','puthuyir','2019-11-30 18:09:02',1,0,'DEOrejected',NULL);
/*!40000 ALTER TABLE `deo_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `donation_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `payment_mode` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `donor_id` bigint(20) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`donation_id`),
  KEY `FK29xe0fncbiv7gap9awrc4o0ia` (`donor_id`),
  KEY `FKb31lk9ksoudc1lji5aovjon03` (`project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundallotment`
--

DROP TABLE IF EXISTS `fundallotment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fundallotment` (
  `fundallotment_id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `allocated_date` datetime DEFAULT NULL,
  `collected_date` datetime DEFAULT NULL,
  `interest` bigint(20) DEFAULT NULL,
  `requirement_id` bigint(20) DEFAULT NULL,
  `totalamount` bigint(20) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`fundallotment_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundallotment`
--

LOCK TABLES `fundallotment` WRITE;
/*!40000 ALTER TABLE `fundallotment` DISABLE KEYS */;
/*!40000 ALTER TABLE `fundallotment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1),(1),(1),(1),(1),(1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `identity_proof`
--

DROP TABLE IF EXISTS `identity_proof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `identity_proof` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `identity_proof` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `identity_proof`
--

LOCK TABLES `identity_proof` WRITE;
/*!40000 ALTER TABLE `identity_proof` DISABLE KEYS */;
INSERT INTO `identity_proof` VALUES (1,'puthuyir','2019-11-17 17:16:26','puthuyir','2019-11-17 17:16:26',NULL),(2,'puthuyir','2019-11-17 17:20:18','puthuyir','2019-11-17 17:20:18',NULL),(3,'puthuyir','2019-11-17 17:21:46','puthuyir','2019-11-17 17:21:46',NULL),(4,'puthuyir','2019-11-19 16:11:10','puthuyir','2019-11-19 16:11:10',NULL),(5,'puthuyir','2019-11-26 14:32:35','puthuyir','2019-11-26 14:32:35',NULL),(6,'puthuyir','2019-11-26 16:17:48','puthuyir','2019-11-26 16:17:48',NULL);
/*!40000 ALTER TABLE `identity_proof` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoice_id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `file` tinyblob,
  `mime_type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `invoice_details_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `FK55wuh703cxg9tmblqvve66y1a` (`invoice_details_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_details`
--

DROP TABLE IF EXISTS `invoice_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_details` (
  `invoice_details_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `bankname` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `from_address` varchar(255) DEFAULT NULL,
  `invoice_number` varchar(255) DEFAULT NULL,
  `invoice_date` varchar(255) DEFAULT NULL,
  `invoice_duedate` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `to_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`invoice_details_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_details`
--

LOCK TABLES `invoice_details` WRITE;
/*!40000 ALTER TABLE `invoice_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_requirements`
--

DROP TABLE IF EXISTS `invoice_requirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_requirements` (
  `requirement_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `descriptions` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `qty` varchar(255) DEFAULT NULL,
  `sub_total` varchar(255) DEFAULT NULL,
  `invoice_details` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`requirement_id`),
  KEY `FK84fc7tlqn0bpdmdudht62d1k6` (`invoice_details`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_requirements`
--

LOCK TABLES `invoice_requirements` WRITE;
/*!40000 ALTER TABLE `invoice_requirements` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_requirements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `project_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `collected_amount` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `estimate` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  KEY `FKous1ja9sykuderp95pkr237ly` (`school_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation`
--

DROP TABLE IF EXISTS `quotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation` (
  `quotation_id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `collected_by` varchar(255) DEFAULT NULL,
  `image_id` bigint(20) DEFAULT NULL,
  `is_quotation_active` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `quotated_amount` bigint(20) DEFAULT NULL,
  `quotation_date` datetime DEFAULT NULL,
  `quotation_status` varchar(255) DEFAULT NULL,
  `quotation_validity_date` datetime DEFAULT NULL,
  `requirement_id` bigint(20) DEFAULT NULL,
  `reviewer` varchar(255) DEFAULT NULL,
  `school_id` bigint(20) DEFAULT NULL,
  `trader_name` varchar(255) DEFAULT NULL,
  `verified_by` varchar(255) DEFAULT NULL,
  `warranty` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`quotation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation`
--

LOCK TABLES `quotation` WRITE;
/*!40000 ALTER TABLE `quotation` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requirement`
--

DROP TABLE IF EXISTS `requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requirement` (
  `requirement_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `assetname` varchar(255) DEFAULT NULL,
  `assettype` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `priority` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `reqtype` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `project_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`requirement_id`),
  KEY `FK90i86ya3vioykp05h351pda0j` (`project_id`),
  KEY `FK70ob1es44dhn8nk8gqh485ow7` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requirement`
--

LOCK TABLES `requirement` WRITE;
/*!40000 ALTER TABLE `requirement` DISABLE KEYS */;
/*!40000 ALTER TABLE `requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `school_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `school_status` varchar(255) DEFAULT NULL,
  `id` bigint(20) DEFAULT NULL,
  `contacts_id` bigint(20) DEFAULT NULL,
  `school_info_id` bigint(20) DEFAULT NULL,
  `userid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`school_id`),
  KEY `FK7pp3lr2cnk8elmmqhn5t19xop` (`id`),
  KEY `FKigj51v0dao3dib7ywgmibw1ah` (`contacts_id`),
  KEY `FKevxuu9k9gcv5t2hgrkj1sux3` (`school_info_id`),
  KEY `FK8fxw8td6ii7lgxquas3uma3bw` (`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schoolimage`
--

DROP TABLE IF EXISTS `schoolimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schoolimage` (
  `image_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `filepath` varchar(255) DEFAULT NULL,
  `image` longblob NOT NULL,
  `school_id` bigint(20) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FK4p0ahjfxd7g2rehm0hjb679fr` (`school_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schoolimage`
--

LOCK TABLES `schoolimage` WRITE;
/*!40000 ALTER TABLE `schoolimage` DISABLE KEYS */;
/*!40000 ALTER TABLE `schoolimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schoolinfo`
--

DROP TABLE IF EXISTS `schoolinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schoolinfo` (
  `school_info_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `number_of_students` int(11) DEFAULT NULL,
  `number_of_teachers` int(11) DEFAULT NULL,
  `school_name` varchar(255) DEFAULT NULL,
  `school_reg_number` varchar(255) DEFAULT NULL,
  `school_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`school_info_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schoolinfo`
--

LOCK TABLES `schoolinfo` WRITE;
/*!40000 ALTER TABLE `schoolinfo` DISABLE KEYS */;
INSERT INTO `schoolinfo` VALUES (1,'puthuyir','2019-11-19 16:11:09','puthuyir','2019-11-19 16:11:09',400,20,'Government_school','123123','government'),(2,'puthuyir','2019-11-19 16:11:09','puthuyir','2019-11-19 16:11:09',4000,200,'Private_school','345345','self-finance');
/*!40000 ALTER TABLE `schoolinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `emailaddress` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `sponsormail` varchar(255) DEFAULT NULL,
  `sponsorname` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `identity_proof_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `FKddefmvbrws3hvl5t0hnnsv8ox` (`address_id`),
  KEY `FK5ht55neuq3xdnjl5evb1srl1s` (`identity_proof_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'puthuyir','2019-11-17 17:16:25','puthuyir','2019-11-26 19:55:21',NULL,'admin@gmail.com','Admin','Male','A','adminadmin','09876543222','Admin',NULL,NULL,'SuperAdminApproved',1,1),(2,'puthuyir','2019-11-17 17:20:18','puthuyir','2019-11-17 17:20:18',NULL,'approver@gmail.com','Approver','Male','A','approverapprover','12345678999','Approver',NULL,NULL,'SuperAdminApproved',2,2),(3,'puthuyir','2019-11-17 17:21:46','puthuyir','2019-11-17 17:21:46',NULL,'reviewer@gmail.com','Reviewer','Female','R','reviewerreviewer','98765432100','Reviewer',NULL,NULL,'SuperAdminApproved',3,3),(4,'puthuyir','2019-11-19 16:11:09','puthuyir','2019-11-19 16:11:09',NULL,'arun@gmail.com','Arun','Male','A','arunarun','09876543219','Co-ordinator',NULL,NULL,'ApprovedUser',4,4),(5,NULL,'2019-11-17 17:16:25','puthuyir','2019-11-17 17:16:25',NULL,'superadmin@gmail.com',NULL,NULL,NULL,'superadmin',NULL,'Super Admin',NULL,NULL,'SuperAdminApproved',NULL,NULL),(6,NULL,'2019-11-17 17:16:25','puthuyir','2019-11-17 17:16:25',NULL,'superuser@gmail.com',NULL,NULL,NULL,'superuser',NULL,'Super User',NULL,NULL,'SuperAdminApproved',NULL,NULL),(8,'puthuyir','2019-11-26 14:32:18','puthuyir','2019-11-26 21:52:39',NULL,'pious@gmail.com','Pious','Male','P','piouspious','98765432101','Fund Raiser',NULL,NULL,'ApprovedUser',5,5),(9,'puthuyir','2019-11-26 16:17:46','puthuyir','2019-11-26 21:48:48',NULL,'reshwin@gmail.com','Reshwin','Male','R','reshwinr','98765498765','Reviewer',NULL,NULL,'SuperAdminApproved',6,6);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_reference`
--

DROP TABLE IF EXISTS `volunteer_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer_reference` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `referalmails` varchar(255) DEFAULT NULL,
  `sponsor_email` varchar(255) DEFAULT NULL,
  `sponsor_name` varchar(255) DEFAULT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKebglxfmxntyawl869bk27o2vv` (`address_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_reference`
--

LOCK TABLES `volunteer_reference` WRITE;
/*!40000 ALTER TABLE `volunteer_reference` DISABLE KEYS */;
/*!40000 ALTER TABLE `volunteer_reference` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-01  0:16:09
