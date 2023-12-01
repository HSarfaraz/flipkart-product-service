CREATE SCHEMA `flipkartproductdb`;

USE `flipkartproductdb`;

CREATE TABLE `product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `category` VARCHAR(45) NULL,
  `price` VARCHAR(45) NULL,
  `manufactured` VARCHAR(45) NULL,
  `discount` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
);

