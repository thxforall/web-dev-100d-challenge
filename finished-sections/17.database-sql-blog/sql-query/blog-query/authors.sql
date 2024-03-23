CREATE TABLE authors (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

SELECT * FROM blog.authors;

INSERT INTO blog.authors (name, email) 
VALUES ('Kiyori', 'kiyori@test.com');
INSERT INTO blog.authors (name, email) 
VALUES ('Baek', 'baek@test.com');
