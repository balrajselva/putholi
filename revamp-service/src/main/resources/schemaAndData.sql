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
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `district` varchar(50) DEFAULT NULL,
  `locality` varchar(50) DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'puthuyir','2019-11-17 17:16:25','puthuyir','2019-11-17 17:16:25','31','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(2,'puthuyir','2019-11-17 17:20:18','puthuyir','2019-11-17 17:20:18','23','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(3,'puthuyir','2019-11-17 17:21:46','puthuyir','2019-11-17 17:21:46','123','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(4,'puthuyir','2019-11-19 16:11:09','puthuyir','2019-11-19 16:11:09','3/28','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(5,'puthuyir','2019-11-26 14:32:21','puthuyir','2019-11-26 14:32:21','123','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(6,'puthuyir','2019-11-26 16:17:47','puthuyir','2019-11-26 16:17:47','12','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(7,'puthuyir','2019-12-01 03:10:24','puthuyir','2019-12-01 03:10:24','3/28','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(8,'puthuyir','2019-12-01 03:18:11','puthuyir','2019-12-01 03:18:11','31','0000-00-00 00:00:00','Tambaram','India','Kanchipuram','0000-00-00 00:00:00','600100','Tamil Nadu',NULL),(9,'puthuyir','2019-12-01 03:28:18','puthuyir','2019-12-01 03:28:18',NULL,NULL,'Tambaram','India','Kanchipuram','0000-00-00 00:00:00','600100','Tamil Nadu',NULL),(10,'puthuyir','2019-12-18 17:13:14','puthuyir','2019-12-18 17:13:14','123','0000-00-00 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'puthuyir','2019-12-19 01:57:36','puthuyir','2019-12-19 01:57:36','234','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(12,'puthuyir','2019-12-20 13:15:48','puthuyir','2019-12-20 13:15:48','asd','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(13,'puthuyir','2019-12-21 00:39:17','puthuyir','2019-12-21 00:39:17','AB street',NULL,'Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(14,'puthuyir','2019-12-21 00:59:12','puthuyir','2019-12-21 00:59:12','AD',NULL,'Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(15,'puthuyir','2019-12-21 01:02:17','puthuyir','2019-12-21 01:02:17','AN',NULL,'Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(16,'puthuyir','2019-12-21 16:10:18','puthuyir','2019-12-21 16:10:18','adsf','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(17,'puthuyir','2019-12-21 16:21:23','puthuyir','2019-12-21 16:21:23','asdf','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641665','Tamil Nadu',NULL),(18,'puthuyir','2019-12-22 17:48:10','puthuyir','2019-12-22 17:48:10','3/3','0000-00-00 00:00:00','Tirupur','India','Coimbatore','0000-00-00 00:00:00','641666','Tamil Nadu',NULL),(31,'A','A','Tirupur','India','puthuyir','2020-01-12 05:24:42','Tirupur',NULL,'puthuyir','2020-01-12 05:24:42','64166','Tamilnadu',NULL),(32,'A','A','Tiruppur','india','puthuyir','2020-01-12 05:34:36','Coimbatore',NULL,'puthuyir','2020-01-12 05:34:36','64166','Tamilnadu',NULL),(33,'A','A','Tirupuur','Indai','puthuyir','2020-01-12 05:48:01','Coimbatore',NULL,'puthuyir','2020-01-12 05:48:01','64166','Tamilnadu',NULL),(34,'A','A','Tiruppur','India','puthuyir','2020-01-12 05:49:34','Coimbatore',NULL,'puthuyir','2020-01-12 05:49:34','64166','Tamilnadu',NULL),(35,'A','A','Tiruppur','India','puthuyir','2020-01-12 06:37:01','Coimbatore',NULL,'puthuyir','2020-01-12 06:37:01','64166','Tamilnadu',NULL),(43,'AB','A','Tirupur','India','puthuyir','2020-01-12 08:17:37','Coimbatore','Alagumalai','puthuyir','2020-01-12 08:17:37','641665','Tamil Nadu',NULL);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audittrail`
--

DROP TABLE IF EXISTS `audittrail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audittrail` (
  `comments` varchar(500) DEFAULT NULL,
  `lastlogindate` datetime(6) DEFAULT NULL,
  `lastupdateddate` datetime(6) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
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
  `contacts_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `pri_email` varchar(100) NOT NULL,
  `pri_name` varchar(50) NOT NULL,
  `pri_num` varchar(50) NOT NULL,
  `sec_email` varchar(100) DEFAULT NULL,
  `sec_name` varchar(50) DEFAULT NULL,
  `sec_num` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`contacts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'puthuyir','2019-11-19 16:11:09','puthuyir','2019-11-19 16:11:09','government@gmail.com','Primary','9876543210','sec@gmail.com','Sec','1234567890'),(2,'puthuyir','2019-11-19 16:11:09','puthuyir','2019-11-19 16:11:09','private@gmail.com','Primary','9876543210','sec@gmail.com','Sec','1234567890'),(3,'puthuyir','2019-12-18 17:13:15','puthuyir','2019-12-18 17:13:15','','','','arun@gmail.com','Arun','0987654321'),(4,'puthuyir','2019-12-19 01:57:39','puthuyir','2019-12-19 01:57:39','','','','jeg@puth.org','Jegan','9876543210'),(5,'puthuyir','2019-12-21 00:59:12','puthuyir','2019-12-21 00:59:12','','','','raj@raj.in','raj','9876543210'),(6,'puthuyir','2019-12-22 17:48:12','puthuyir','2019-12-22 17:48:12','','','','aruna@gmail.com','Arunkumar','0987654321'),(13,'puthuyir','2020-01-12 08:17:40','puthuyir','2020-01-12 08:17:40','arun@gmail.com','Arunkumar','9876543210','jegan@gmail.com','jegan','9876543210');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deo_file`
--

DROP TABLE IF EXISTS `deo_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deo_file` (
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `deo_file_id` int(11) NOT NULL AUTO_INCREMENT,
  `deo_info_id` int(11) NOT NULL,
  `image` longblob NOT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`deo_file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `deo_file_id` int(11) NOT NULL,
  `deo_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`deo_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deo_info`
--

LOCK TABLES `deo_info` WRITE;
/*!40000 ALTER TABLE `deo_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `deo_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `amount` int(11) NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `donation_id` int(11) NOT NULL AUTO_INCREMENT,
  `donor_id` int(11) NOT NULL,
  `payment_mode` varchar(50) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `project_id` int(11) NOT NULL,
  `tracking_id` varchar(100) NOT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`donation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_user`
--

DROP TABLE IF EXISTS `donation_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_user` (
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `donation_userid` int(11) NOT NULL AUTO_INCREMENT,
  `emailaddress` varchar(45) DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `passwordhint` varchar(500) DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`donation_userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_user`
--

LOCK TABLES `donation_user` WRITE;
/*!40000 ALTER TABLE `donation_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `donation_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `identity_proof`
--

DROP TABLE IF EXISTS `identity_proof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `identity_proof` (
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `identity_proof_id` int(11) NOT NULL AUTO_INCREMENT,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `image` longblob,
  `filepath` varchar(200) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`identity_proof_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schoolinfo`
--

DROP TABLE IF EXISTS `schoolinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schoolinfo` (
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `number_of_students` int(11) NOT NULL,
  `number_of_teachers` int(11) NOT NULL,
  `school_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_name` varchar(50) NOT NULL,
  `school_reg_number` varchar(50) NOT NULL,
  `school_type` varchar(50) NOT NULL,
  PRIMARY KEY (`school_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schoolinfo`
--

LOCK TABLES `schoolinfo` WRITE;
/*!40000 ALTER TABLE `schoolinfo` DISABLE KEYS */;
INSERT INTO `schoolinfo` VALUES ('puthuyir','2020-01-12 08:17:41','puthuyir','2020-01-12 08:17:41',3000,150,7,'VVMHSS','2310','Higher Secondary School');
/*!40000 ALTER TABLE `schoolinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `address_id` int(11) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `emailaddress` varchar(100) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `identity_proof_id` int(11) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `sponsormail` varchar(100) DEFAULT NULL,
  `sponsorname` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_user_emailaddress` (`emailaddress`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (31,NULL,'puthuyir','2020-01-12 05:24:42','admin@gmail.com','Admin','Male',9,'A','puthuyir','2020-01-12 05:24:42','adminadmin','9876543210','Admin',NULL,NULL,NULL,'SuperAdminApproved',1),(32,NULL,'puthuyir','2020-01-12 05:34:36','approver@gmail.com','Approver','Female',10,'A','puthuyir','2020-01-12 05:34:36','approverapprover','0987654321','Approver',NULL,NULL,NULL,'SuperAdminApproved',2),(33,NULL,'puthuyir','2020-01-12 05:48:01','superadmin@gmail.com','SuperAdmin','Male',11,'S','puthuyir','2020-01-12 05:48:01','superadmin','0987654321','Super Admin',NULL,NULL,NULL,'SuperAdminApproved',3),(34,NULL,'puthuyir','2020-01-12 05:49:34','superuser@gmail.com','Superuser','Female',12,'S','puthuyir','2020-01-12 05:49:34','superuser','9876543210','Super User',NULL,NULL,NULL,'SuperAdminApproved',4),(35,'arun','puthuyir','2020-01-12 06:37:01','arun@gmail.com','Arunkumar','male',13,'A','puthuyir','2020-01-12 06:37:01','arunarun','9876543210','beneficiary',NULL,NULL,NULL,'ApprovedUser',5);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_reference`
--

DROP TABLE IF EXISTS `volunteer_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer_reference` (
  `address_id` int(11) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `volunteer_reference_id` int(11) NOT NULL AUTO_INCREMENT,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `referal_emails` varchar(100) DEFAULT NULL,
  `sponsor_email` varchar(100) DEFAULT NULL,
  `sponsor_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`volunteer_reference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2020-01-12 14:06:45
