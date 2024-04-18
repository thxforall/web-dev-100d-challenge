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
SELECT restaurants.id, restaurants.name, addresses.*,types.name from restaurants 
INNER JOIN addresses ON (restaurants.address_id = addresses.id)
INNER JOIN types ON (restaurants.type_id = types.id)
WHERE addresses.city = 'Munich';


SELECT COUNT(*) from restaurants WHERE type = 'German';

UPDATE restaurants SET name = 'Web Dev Meals' WHERE id = 1;
DELETE FROM restaurants WHERE id = 1;