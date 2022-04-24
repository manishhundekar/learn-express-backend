DROP TABLE IF EXISTS `ADMIN`;
CREATE TABLE `ADMIN` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `isadmin` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
LOCK TABLES `ADMIN` WRITE;
INSERT INTO `ADMIN` VALUES (1,'ADMIN','ADMIN@123',1),(2,'user','user',0);
UNLOCK TABLES;


DROP TABLE IF EXISTS `DOCTORS`;
CREATE TABLE `DOCTORS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `phone_no` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT '1',
  `prepared_doc_sign` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
LOCK TABLES `DOCTORS` WRITE;
INSERT INTO `DOCTORS` VALUES (1,'Ramesh Prem','7841023690','REFERRED','1',NULL),(2,'Kumar Sanu','1498742697','PREPARED','1',NULL),(5,'Pranesh','9008874125','PREPARED','1','https://vintage100s3.s3.amazonaws.com/media/16205618751221.png'),(6,'Pavit','7894561230','REFERRED','0','N.A');
UNLOCK TABLES;


DROP TABLE IF EXISTS `HOSPITALS`;
CREATE TABLE `HOSPITALS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT '1',
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
LOCK TABLES `HOSPITALS` WRITE;
INSERT INTO `HOSPITALS` VALUES (1,'0','Arogya Hospital Bidar'),(2,'1','Apex Hospital Bidar'),(3,'1','Arogya Hospital'),(4,'0','REWQ');
UNLOCK TABLES;


DROP TABLE IF EXISTS `INVOICES`;
CREATE TABLE `INVOICES` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` varchar(150) NOT NULL,
  `status` varchar(45) DEFAULT '1',
  `voucher_no` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `amount_words` varchar(45) DEFAULT NULL,
  `payment_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
LOCK TABLES `INVOICES` WRITE;
INSERT INTO `INVOICES` VALUES (5,'Mon May 17 2021 00:05:35 GMT+0530 (India Standard Time)','1','MPA147852369','TYPE-1 COVID-19 QUALITATIVE BY RAPID ANTIGEN TEST','500','Five Hundred rupees Only','UNPAID'),(6,'Mon May 17 2021 00:19:35 GMT+0530 (India Standard Time)','1','Z54','EXAMPLE DESP','2000','Five Hundred rupees Only','CREDIT/DEBIT CARD'),(7,'Mon May 17 2021 00:26:49 GMT+0530 (India Standard Time)','1','SRF123456','TYPE-1 COVID-19 QUALITATIVE BY RAPID ANTIGEN TEST','0','0','CASH');
UNLOCK TABLES;


DROP TABLE IF EXISTS `PROFILE`;
CREATE TABLE `PROFILE` (
  `id` int NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phoneno1` varchar(45) DEFAULT NULL,
  `phoneno2` varchar(45) DEFAULT NULL,
  `profile_pic` varchar(5000) DEFAULT NULL,
  `positive_graph_url` varchar(5000) DEFAULT NULL,
  `negative_graph_url` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
LOCK TABLES `PROFILE` WRITE;
INSERT INTO `PROFILE` VALUES (1,'test@gmail.com','9874561230','9874561230','https://vintage100s3.s3.amazonaws.com/media/1621191224559logo2.png','https://vintage100s3.s3.amazonaws.com/media/1621191268553logo.png','https://vintage100s3.s3.amazonaws.com/media/1621191276693logo.png');
UNLOCK TABLES;


DROP TABLE IF EXISTS `REPORTS`;
CREATE TABLE `REPORTS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int DEFAULT '1',
  `timestamp` varchar(150) DEFAULT NULL,
  `prepared_doc` varchar(45) DEFAULT NULL,
  `referred_doc` varchar(45) DEFAULT NULL,
  `referred_hosp` varchar(45) DEFAULT NULL,
  `srf_id` varchar(45) DEFAULT NULL,
  `sample_collected_date` varchar(45) DEFAULT NULL,
  `sample_received_date` varchar(45) DEFAULT NULL,
  `sample_reported_on` varchar(45) DEFAULT NULL,
  `sample_collected_by` varchar(45) DEFAULT NULL,
  `pat_name` varchar(45) DEFAULT NULL,
  `pat_age` varchar(45) DEFAULT NULL,
  `pat_sex` varchar(45) DEFAULT NULL,
  `pat_phoneno` varchar(45) DEFAULT NULL,
  `specimen_type` varchar(100) DEFAULT NULL,
  `test_type` varchar(100) DEFAULT NULL,
  `data1` varchar(45) DEFAULT NULL,
  `data2` varchar(45) DEFAULT NULL,
  `data3` varchar(45) DEFAULT NULL,
  `ct_data1` varchar(45) DEFAULT NULL,
  `ct_data2` varchar(45) DEFAULT NULL,
  `ct_data3` varchar(45) DEFAULT NULL,
  `finaldata` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

LOCK TABLES `REPORTS` WRITE;
INSERT INTO `REPORTS` VALUES (7,0,'Sun May 09 2021','5','6','Arogya Hospital','MPA147852369','2021-01-01T01:00','2021-01-01T01:00','2021-01-01T01:00',NULL,'Praveen Kundgal','55','Male','7892222809','Spec-2 Example','TYPE-1 COVID-19 QUALITATIVE BY RAPID ANTIGEN TEST','POSITIVE','POSITIVE','POSITIVE',NULL,NULL,NULL,'POSITIVE'),(8,0,'Sun May 16 2021','5','6','Arogya Hospital','MPA147852369','2021-05-16T20:07','2021-05-16T20:07','2021-05-23T20:08',NULL,'Rohit Sharma','26','Male','7892222807','Spec-2 Example','TYPE-1 COVID-19 QUALITATIVE BY RAPID ANTIGEN TEST','POSITIVE','POSITIVE','POSITIVE','1','2','3','POSITIVE'),(9,1,'Sun May 16 2021','5','1','Arogya Hospital','MPA147852369','2021-05-16T20:34','2021-05-16T20:38','2021-05-16T14:28','Salman','Virat Sharma','25','Male','7894561230','Spec-2 Example','TYPE-3 COVID-19 QUALITATIVE BY REALTIME PCR','POSITIVE','NEGATIVE','POSITIVE','1','2','3','POSITIVE'),(10,1,'Sun May 16 2021','2','6','Arogya Hospital','MPA147852369','2021-05-16T21:54','2021-05-30T21:48','2021-05-16T21:54','Salman','Kamlesh','25','Male','7894152628','Spec-2 Example','TYPE-1 COVID-19 QUALITATIVE BY RAPID ANTIGEN TEST','POSITIVE','NEGATIVE','POSITIVE','1','2','3','POSITIVE'),(11,1,'Sun May 16 2021','5','1','Arogya Hospital','MPA147852369','2021-05-16T21:57','2021-05-16T21:57','2021-05-16T21:57','Salman','Kamlesh','25','Male','24','Spec-2 Example','TYPE-1 COVID-19 QUALITATIVE BY RAPID ANTIGEN TEST','NEGATIVE','POSITIVE','POSITIVE','11','22','33','POSITIVE'),(12,1,'Mon May 17 2021 00:05:35 GMT+0530 (India Standard Time)','2','1','Arogya Hospital','MPA147852369','2021-05-17T12:10','2021-05-17T00:10','2021-05-17T00:10','Salman','Shaam P','11','Female','7892222809','Spec-2 Example','TYPE-1 COVID-19 QUALITATIVE BY RAPID ANTIGEN TEST','POSITIVE','POSITIVE','INVALID SAMPLE','1','2','3','NEGATIVE'),(13,1,'Mon May 17 2021 00:26:49 GMT+0530 (India Standard Time)','2','1','Apex Hospital Bidar','SRF123456','2021-05-17T06:26','2021-05-17T06:26','2021-05-24T00:26','Salman','Virat Kohli','29','Male','7892222809','Spec-2 Example','TYPE-1 COVID-19 QUALITATIVE BY RAPID ANTIGEN TEST','NEGATIVE','NEGATIVE','POSITIVE','1','2','3','POSITIVE');
UNLOCK TABLES;


DROP TABLE IF EXISTS `SPECIMENS`;
CREATE TABLE `SPECIMENS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT '1',
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

LOCK TABLES `SPECIMENS` WRITE;
INSERT INTO `SPECIMENS` VALUES (1,'0','Spec-2 Example'),(2,'1','Spec-2 Example'),(3,'0','Ram');
UNLOCK TABLES;