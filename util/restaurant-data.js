const filePath = path.join(__dirname, 'data', 'restaurants.json');

function getStoredRestaurant() {
  const fileData = fs.readFileSync(filePath);
  const storeRestaurants = JSON.parse(fileData);

  return storeRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(restaurants));
}
