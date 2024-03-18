CREATE TABLE restaurant_finder.restaurants (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `address_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO restaurant_finder.restaurants (name, address_id, type_id) VALUES ('Web Dev Mealery', 1, 3);
INSERT INTO restaurant_finder.restaurants (name, address_id, type_id) VALUES ('PIZZA TIME', 2, 1);
INSERT INTO restaurant_finder.restaurants (name, address_id, type_id) VALUES ('MOT ZIP', 3, 2);

SELECT * from restaurants;
SELECT COUNT(*) from restaurants WHERE type = 'German';

UPDATE restaurants SET name = 'Web Dev Meals' WHERE id = 1;
DELETE FROM restaurants WHERE id = 1;