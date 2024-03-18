CREATE TABLE restaurant_finder.types (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    PRIMARY KEY(`id`));
    
INSERT INTO types (name) VALUES ('Italian');
INSERT INTO types (name) VALUES ('American');
INSERT INTO types (name) VALUES ('German');
INSERT INTO types (name) VALUES ('Austrian');

SELECT * FROM types;