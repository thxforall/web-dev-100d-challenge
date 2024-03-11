import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getStoredRestaurant() {
  const fileData = fs.readFileSync(filePath);
  const storeRestaurants = JSON.parse(fileData);

  return storeRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(restaurants));
}

// module.exports = {
//   getStoredRestaurant: getStoredRestaurant,
//   storeRestaurants: storeRestaurants,
// };

export { getStoredRestaurant, storeRestaurants };
