let age = 27;
let userName = 'Kiyori';
let hobbies = ['Sports', 'Cooking', 'Reading'];
let job = {
  title: 'Gaondata',
  place: 'Seoul',
  salary: 300,
};

let totalAdultYears;

function calculateAdulyYears(userAge) {
  return userAge - 18;
}

totalAdultYears = calculateAdulyYears(age);
console.log(totalAdultYears);

age = 35;
totalAdultYears = calculateAdulyYears(age);

console.log(totalAdultYears);
