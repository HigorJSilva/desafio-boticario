-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: boticario
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Current Database: `boticario`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `boticario` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `boticario`;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `categoria_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome_categoria` varchar(20) DEFAULT NULL,
  `descricao_categoria` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`categoria_id`),
  UNIQUE KEY `categoria_id` (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (10,'Perfume','Proporciona uma agradável e duradoura fragrância de aroma a diferentes objetos.'),(11,'Maquiagem','Produtos de beleza para realçar a aparência facial.'),(12,'Cuidados com a Pele',NULL),(13,'Cabelos',NULL),(14,'Higiene Pessoal','Produtos para cuidados diários de higiene pessoal.');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `cliente_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  `senha` varchar(60) DEFAULT NULL,
  `nome` varchar(200) DEFAULT NULL,
  `cpf` varchar(11) NOT NULL,
  `telefone` varchar(11) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `endereco_id` int NOT NULL,
  PRIMARY KEY (`cliente_id`),
  UNIQUE KEY `cliente_id` (`cliente_id`),
  UNIQUE KEY `cliente_cpf_key` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (19,'joaosilva@email.com','Joaosilva','$2b$08$aIVGelzpICKbiOVYUUBKBOEY/guTLISVPEsZo3nTAk71vTirBoVtW','João Silva','64489732570','62984421211','1996-04-16',3),(20,NULL,NULL,NULL,'Maria Silva','12345678901',NULL,NULL,4),(21,'pedro@email.com','Pedro123','$2b$08$gD0M7KPnftfhgq2P8GabbOsUSTlUPCT3xIJDaSTraRX5OqH8zoyy2','Pedro Oliveira','98765432109',NULL,NULL,5),(22,'ana@email.com','AnaSmith','$2b$08$EurPQnr4mdmtd6mMKs4VYOynevpN5T5KAdOxokFdjAlgNKP3iBgbG','Ana Smith','11122233344','62998887777','2023-11-05',6),(23,'carlos@email.com','Carlos123','$2b$08$mOCLtRUIT4XzWkgHyjYY5O8027uM3Zi8QW7fvjHxco4gyor3.qGwm','Carlos Oliveira','55566677788','62991112233','2023-10-01',7);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `endereco_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cep` varchar(9) DEFAULT NULL,
  `rua` varchar(100) DEFAULT NULL,
  `bairro` varchar(30) DEFAULT NULL,
  `cidade` varchar(30) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`endereco_id`),
  UNIQUE KEY `endereco_id` (`endereco_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (3,'70863-070','Rua das Margaridas','Centro','Brasília','1','apt. 101','DF'),(4,'12345-678','Avenida dos Girassóis',NULL,'São Paulo',NULL,NULL,'SP'),(5,'12345-678','Avenida dos Girassóis',NULL,'São Paulo','22','Casa','SP'),(6,'98765-432','Travessa das Flores',NULL,'Porto Alegre',NULL,NULL,NULL),(7,'54321-678','Alameda das Palmeiras','Bairro Verde','Recife','7','Bloco B','PE');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `pedido_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `numero_pedido` int DEFAULT NULL,
  `valor_total_pedido` decimal(10,0) DEFAULT NULL,
  `data_pedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT NULL,
  `cliente_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`pedido_id`),
  UNIQUE KEY `pedido_id` (`pedido_id`),
  KEY `pedido_cliente_id_fkey` (`cliente_id`),
  CONSTRAINT `pedido_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`cliente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (5,123,101,'2022-02-08 00:00:00',1,19),(6,124,75,'2022-02-09 00:00:00',0,20),(7,125,NULL,'2024-02-21 16:29:03',NULL,21),(8,126,51,'2024-02-21 16:29:16',NULL,22),(9,127,200,'2022-02-12 00:00:00',1,23);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `produto_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome_produto` varchar(50) DEFAULT NULL,
  `descricao_produto` varchar(200) DEFAULT NULL,
  `preco_produto` decimal(10,0) DEFAULT NULL,
  `qtd_estoque` int DEFAULT NULL,
  `data_cadastro_produto` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `categoria_id` bigint unsigned NOT NULL,
  `imagem` text,
  PRIMARY KEY (`produto_id`),
  UNIQUE KEY `produto_id` (`produto_id`),
  KEY `produto_categoria_id_fkey` (`categoria_id`),
  CONSTRAINT `produto_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (5,'Creme hidratante','Pele seca e mista',20,100,'2022-02-08 00:00:00',10,NULL),(6,'Shampoo Revitalizante','Para cabelos secos e danificados',16,75,'2022-01-20 00:00:00',11,NULL),(7,'Perfume Floral',NULL,NULL,NULL,'2024-02-21 16:35:19',10,NULL),(8,'Protetor Solar FPS 50',NULL,23,90,'2022-04-15 00:00:00',12,NULL),(9,'Sabonete Esfoliante','Remove células mortas e impurezas',13,120,'2022-05-30 00:00:00',14,NULL);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_pedido`
--

DROP TABLE IF EXISTS `produto_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_pedido` (
  `produto_pedido_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `qtd_produto_pedido` int DEFAULT NULL,
  `preco_produto_pedido` decimal(10,0) DEFAULT NULL,
  `produto_id` bigint unsigned DEFAULT NULL,
  `pedido_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`produto_pedido_id`),
  UNIQUE KEY `produto_pedido_id` (`produto_pedido_id`),
  KEY `produto_pedido_pedido_id_fkey` (`pedido_id`),
  KEY `produto_pedido_produto_id_fkey` (`produto_id`),
  CONSTRAINT `produto_pedido_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`pedido_id`),
  CONSTRAINT `produto_pedido_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`produto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_pedido`
--

LOCK TABLES `produto_pedido` WRITE;
/*!40000 ALTER TABLE `produto_pedido` DISABLE KEYS */;
INSERT INTO `produto_pedido` VALUES (1,5,50,5,5),(2,3,30,6,5),(3,2,16,7,7),(4,1,23,8,8),(5,4,18,5,8);
/*!40000 ALTER TABLE `produto_pedido` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-21 17:04:10
