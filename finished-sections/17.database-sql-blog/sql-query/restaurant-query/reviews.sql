CREATE TABLE restaurant_finder.reviews (
	`id` INT NOT NULL AUTO_INCREMENT,
    `reviewer_name` VARCHAR(255) NOT NULL,
    `rating` INT NOT NULL,
    `text` TEXT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `restaurant_id` INT NOT NULL,
    PRIMARY KEY(`id`));
    
INSERT INTO reviews (reviewer_name, rating, text, restaurant_id) VALUES (
	'Kiyori',
    4,
    'This was awesome!',
    3
);

INSERT INTO reviews (reviewer_name, rating, text, restaurant_id) VALUES (
	'Kiyori',
    5,
    'This was awesome!',
    3
);

INSERT INTO reviews (reviewer_name, rating, text, restaurant_id) VALUES (
	'BB.ki',
    1,
    'No mat',
    1
);

INSERT INTO reviews (reviewer_name, rating, restaurant_id) VALUES (
	'Baek',
    4,
    3
);

SELECT * FROM reviews;
SELECT reviews.*, restaurants.name AS restaurant_name, addresses.*, types.name AS restaurant_type FROM reviews 
INNER JOIN restaurants ON reviews.restaurant_id = restaurants.id
INNER JOIN addresses ON restaurants.address_id = addresses.id
INNER JOIN types ON restaurants.type_id = types.id
WHERE rating > 3;