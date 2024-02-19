let courseName = 'Web-Dev';
let coursePrice = 25000;
let courseGoal = ['Easy', 'Practice', 'Learn'];

let onlineCourse = {
  name: 'web-Dev',
  price: 25000,
  goal: ['Easy', 'Practice', 'Learn'],
};

console.log(courseName);
console.log(coursePrice);
console.log(courseGoal);

console.log(onlineCourse.name);
console.log(onlineCourse.price);
console.log(onlineCourse.goal[1]);

function getListItem(array, arrayIndex) {
  let arrayElement = array[arrayIndex];
  return arrayElement;
}

let firstGoal = getListItem(courseGoal, 0);

console.log(firstGoal);
