CREATE TABLE posts (
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `summary` VARCHAR(255) NOT NULL,
    `body` TEXT NOT NULL,
	`date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `author_id` INT NOT NULL,
PRIMARY KEY(`id`));