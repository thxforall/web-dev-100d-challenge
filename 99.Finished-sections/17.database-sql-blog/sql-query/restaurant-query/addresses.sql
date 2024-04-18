  CREATE TABLE restaurant_finder.addresses (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(255) NOT NULL,
  `street_number` VARCHAR(45) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `postal_code` INT NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO addresses (street, street_number, city, postal_code, country) VALUES ('Teststreet', '23a', 'Munich', 81541, 'Germany');
INSERT INTO addresses (street, street_number, city, postal_code, country) VALUES ('Greatstreet', '21a', 'Seoul', 56477, 'America');
INSERT INTO addresses (street, street_number, city, postal_code, country) VALUES ('Awesomestreet', '35a', 'Incheon', 24353, 'Austrailia');
INSERT INTO addresses (street, street_number, city, postal_code, country) VALUES ('Coolstreet', '15a', 'Busan', 15232, 'Italiy');



SELECT * from addresses;
